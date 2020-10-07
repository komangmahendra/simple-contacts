import { takeLatest, put, call } from "redux-saga/effects";

import * as types from "./contact.actionTypes";
import * as actions from "./contact.action";

const BASE_URL = "https://simple-contact-crud.herokuapp.com/contact";

function* fetchContacts() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = () => fetch(BASE_URL, options);
    const response = yield call(request);
    const responseData = yield response.json();

    if (response && response.status === 200) {
      yield put(actions.fetchContacts.success({ data: responseData.data }));
    } else {
      yield put(actions.fetchContacts.failure({ error: responseData.message }));
    }
  } catch (error) {
    yield put(actions.fetchContacts.failure({ error: error.message }));
  }
}

function* fetchContactDetail(action: any) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { id } = action.payload;

    const request = () => fetch(`${BASE_URL}/${id}`, options);
    const response = yield call(request);
    const responseData = yield response.json();

    if (response && response.status === 200) {
      yield put(actions.fetchContacts.success({ data: responseData.data }));
    } else {
      yield put(actions.fetchContacts.failure({ error: responseData.message }));
    }
  } catch (error) {
    yield put(actions.fetchContacts.failure({ error: error.message }));
  }
}

function* createContact(action: any) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    };

    const request = () => fetch(`${BASE_URL}`, options);
    const response = yield call(request);
    const responseData = yield response.json();

    if (response && response.ok) {
      yield put(actions.createContact.success());
      yield call(fetchContacts);
    } else {
      yield put(actions.createContact.failure({ error: responseData.message }));
    }
  } catch (error) {
    yield put(actions.createContact.failure({ error: error.message }));
  }
}

function* updateContact(action: any) {
  try {
    const { id, data } = action.payload;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const request = () => fetch(`${BASE_URL}/${id}`, options);
    const response = yield call(request);
    const responseData = yield response.json();

    if (response && response.ok) {
      yield put(actions.updateContact.success(data));
      yield call(fetchContacts);
    } else {
      yield put(actions.updateContact.failure({ error: responseData.message }));
    }
  } catch (error) {
    yield put(actions.updateContact.failure({ error: error.message }));
  }
}

function* deleteContact(action: any) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { id } = action.payload;

    const request = () => fetch(`${BASE_URL}/${id}`, options);
    const response = yield call(request);
    const responseData = yield response.json();

    if (response && response.ok) {
      yield put(actions.deleteContact.success());
      yield put(actions.setContact(null));
      yield call(fetchContacts);
    } else {
      yield put(actions.deleteContact.failure({ error: responseData.message }));
    }
  } catch (error) {
    yield put(actions.deleteContact.failure({ error: error.message }));
  }
}

export default function* contactExportSaga() {
  yield takeLatest(types.FETCH_CONTACTS_REQUEST, fetchContacts);
  yield takeLatest(types.FETCH_CONTACT_REQUEST, fetchContactDetail);
  yield takeLatest(types.CREATE_CONTACT_REQUEST, createContact);
  yield takeLatest(types.UPDATE_CONTACT_REQUEST, updateContact);
  yield takeLatest(types.DELETE_CONTACT_REQUEST, deleteContact);
}
