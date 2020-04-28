
const {
   SchemaDirectiveVisitor,
   AuthenticationError
} = require("apollo-server");
const jwt = require('jsonwebtoken')
const { get } = require('lodash')


class AuthDirective extends SchemaDirectiveVisitor {
   visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      // const { role } = this.args;
      field.resolve = async function (...args) {
         const [, , ctx] = args;
         if (ctx.req && ctx.req.user) {
            // if (role && (!ctx.req.user.role || !ctx.req.user.role.includes(role))) {
            //    throw new AuthenticationError(
            //       "You are not authorized to view this resource."
            //    );
            // } else {
            const result = await resolve.apply(this, args);
            return result;
            // }
         } else {
            const token = get(ctx, 'req.headers.token')
            let payload = null

            try {
               payload = jwt.verify(token, process.env.JWT_SECRET)
            } catch (e) {
               console.log({ e })
            }

            if (token && payload) {
               const result = await resolve.apply(this, args);
               return result;
            } else {
               throw new AuthenticationError(
                  "Access Denied"
               );
            }
         }
      };
   }
}

module.exports = AuthDirective;