import { createAsyncAction, action } from "typesafe-actions";

// actions types
import * as types from "./contact.actionTypes";

// types
import { Contact } from "../../pages/contact/type";

export const setContact = (data: Contact | null) =>
  action(types.SET_CONTACT, { data });

export const fetchContacts = createAsyncAction(
  types.FETCH_CONTACTS_REQUEST,
  types.FETCH_CONTACTS_SUCCESS,
  types.FETCH_CONTACTS_FAILURE
)<undefined, { data: Contact[] }, { error: string }>();

export const fetchContactDetails = createAsyncAction(
  types.FETCH_CONTACT_REQUEST,
  types.FETCH_CONTACT_SUCCESS,
  types.FETCH_CONTACT_FAILURE
)<undefined, { data: Contact }, { error: string }>();

export const createContact = createAsyncAction(
  types.CREATE_CONTACT_REQUEST,
  types.CREATE_CONTACT_SUCCESS,
  types.CREATE_CONTACT_FAILURE
)<Contact, undefined, { error: string }>();

export const updateContact = createAsyncAction(
  types.UPDATE_CONTACT_REQUEST,
  types.UPDATE_CONTACT_SUCCESS,
  types.UPDATE_CONTACT_FAILURE
)<{ data: Contact; id: string }, Contact, { error: string }>();

export const deleteContact = createAsyncAction(
  types.DELETE_CONTACT_REQUEST,
  types.DELETE_CONTACT_SUCCESS,
  types.DELETE_CONTACT_FAILURE
)<{ id: string }, undefined, { error: string }>();
