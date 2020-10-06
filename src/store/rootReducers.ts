import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

// reducers
import { contactReducer } from "../reducers/contact/contact.reducer";

export default combineReducers({
  contact: contactReducer,
});

export type RootState = StateType<ReturnType<typeof combineReducers>>;
