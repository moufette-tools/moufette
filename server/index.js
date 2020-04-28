/* eslint consistent-return:0 */
require('dotenv').config()

const express = require('express');
const cors = require('cors')
// const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const secure = require('ssl-express-www');
const { buildContext } = require('graphql-passport')
const { ApolloServer } = require('apollo-server-express')

const logger = require('./logger');
const mongoose = require('./api/models/mongoose');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const passport = require('./api/graphql/passport');

const typeDefs = require('./api/graphql/typeDefs')
const resolvers = require('./api/graphql/resolvers')
const AuhtDirective = require('./api/graphql/AuthDirective')
const TokenDirective = require('./api/graphql/TokenDirective')
const TokenOrAuthDirective = require('./api/graphql/TokenOrAuthDirective')
const isDev = process.env.NODE_ENV !== 'production';

const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// mongooose
mongoose
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', error => console.log('Error connecting to Mongo:', error));

// force SSL
if (!isDev) {
  app.use(secure);
}

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     extended: true, // to support URL-encoded bodies
//   }),
// );

app.use(bodyParser({ limit: '5mb' }));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use(passport);
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuhtDirective,
    token: TokenDirective,
    tokenOrAuth: TokenOrAuthDirective
  },
  context: ({ req, res }) => buildContext({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
})

server.applyMiddleware({ app });

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
