import { all } from 'redux-saga/effects'

/* ------------- Sagas ------------- */
// import globalSagas from './containers/App/saga'
// import mapSagas from './containers/MapPage/saga'

/* ------------- API ------------- */
// const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        // ...globalSagas,
        // ...mapSagas
    ])
}
