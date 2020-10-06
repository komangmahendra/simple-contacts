import { fork, all } from "redux-saga/effects";

// saga
import contactSaga from "../reducers/contact/contact.saga";

export function* rootSaga() {
  yield all([fork(contactSaga)]);
}
