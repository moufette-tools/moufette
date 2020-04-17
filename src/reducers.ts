/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import globalReducer from './containers/App/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: any) {
    return combineReducers({
        // global: globalReducer,
        ...injectedReducers,
    });
}
