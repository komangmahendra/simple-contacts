import { createReducer, ActionType } from "typesafe-actions";

import * as actions from "./contact.action";
import * as types from "./contact.actionTypes";

// types
import { Contact } from "../../pages/contact/type";

export type ContactActions = ActionType<typeof actions>;
export type ContactState = {
  isLoading: boolean;
  isLoadingDetail: boolean;
  filter: string;
  contacts: Contact[];
  contactDetail: Contact | null;
  error: null | string;
};

const initialState: ContactState = {
  isLoading: false,
  isLoadingDetail: false,
  filter: "",
  contacts: [],
  contactDetail: null,
  error: null,
};

export const contactReducer = createReducer<ContactState, ContactActions>(
  initialState
)
  .handleAction(actions.fetchContacts.request, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  }))
  .handleAction(actions.fetchContacts.success, (state, action) => ({
    ...state,
    isLoading: false,
    contacts: action.payload.data,
    error: null,
  }))
  .handleAction(actions.fetchContacts.failure, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  }))
  .handleAction(actions.fetchContactDetails.request, (state) => ({
    ...state,
    isLoadingDetail: true,
    error: null,
  }))
  .handleAction(actions.fetchContactDetails.success, (state, action) => ({
    ...state,
    isLoadingDetail: false,
    contactDetail: action.payload.data,
    error: null,
  }))
  .handleAction(actions.fetchContactDetails.failure, (state) => ({
    ...state,
    isLoadingDetail: false,
    error: null,
  }))
  .handleAction(actions.updateContact.request, (state) => ({
    ...state,
    isLoadingDetail: true,
    error: null,
  }))
  .handleAction(actions.updateContact.success, (state, action) => ({
    ...state,
    isLoadingDetail: false,
    contactDetail: action.payload,
    error: null,
  }))
  .handleAction(actions.updateContact.failure, (state) => ({
    ...state,
    isLoadingDetail: false,
    error: null,
  }))
  .handleAction(actions.deleteContact.request, (state) => ({
    ...state,
    isLoadingDetail: true,
    error: null,
  }))
  .handleAction(actions.deleteContact.success, (state, action) => ({
    ...state,
    isLoadingDetail: false,
    error: null,
  }))
  .handleAction(actions.deleteContact.failure, (state) => ({
    ...state,
    isLoadingDetail: false,
    error: null,
  }))
  .handleAction(types.SET_CONTACT as any, (state, action) => ({
    ...state,
    contactDetail: action.payload.data,
  }));
