/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import apolloClient from './apollo';

import rootSaga from './sagas'

// TODO do I need this?
const sagaMiddleware = createSagaMiddleware({
  context: {
    apolloClient, // our singleton API value
  },
});

export default function configureStore(initialState = {}) {
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    createReducer([]),
    initialState,
    compose(...enhancers),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer([]));
    });
  }

  // Extensions
  // store.runSaga = sagaMiddleware.run;
  // store.injectedReducers = {}; // Reducer registry
  // store.injectedSagas = {}; // Saga registry

  sagaMiddleware.run(rootSaga)
  return store;
}
