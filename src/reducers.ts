/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import globalReducer from './containers/App/reducer';
import { createAction, createReducer as CR } from 'redux-act';
import produce from "immer"

const INITAL_STATE = {
    property: null
}



// Create an action creator (description is optional)
const setProperty = createAction<number>('setProperty')

const globalReducer = CR<typeof INITAL_STATE>({
    [setProperty as any]: (state, paylaod) => produce(state, draftState => {
        draftState.property = paylaod
    }),
}, INITAL_STATE);

export const actions = {
    setProperty,
}
/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: any) {
    return combineReducers({
        global: globalReducer,
        ...injectedReducers,
    });
}
