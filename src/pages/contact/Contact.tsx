import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import * as actions from "../../reducers/contact/contact.action";

// components
import ContactContainer from "./ContactContainer";

// types
import { Contact, Contacts, Mode } from "./type";
import { RootState } from "../../store/rootReducers";

const ContactComponent = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<Mode>(null);
  const [filter, setFilter] = useState("");

  const contacts = useSelector<RootState, Contact[]>(
    (state) => state.contact.contacts
  );

  const contact = useSelector<RootState, Contact>(
    (state) => state.contact.contactDetail
  );

  const fetchContactsAsync = () => {
    dispatch(actions.fetchContacts.request());
  };

  const handleSelectContact = (contact: Contact | null) => {
    setMode(null);
    dispatch(actions.setContact(contact));
  };

  const handleSave = (data: Contact, mode: Mode, id?: string) => {
    if (mode === "add") {
      dispatch(actions.createContact.request(data));
    } else {
      dispatch(actions.updateContact.request({ data, id: id! }));
    }

    setMode(null);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(actions.deleteContact.request({ id }));
  };

  const filtered = useMemo(() => {
    const arrFiltered: Contacts = [];
    if (!filter) {
      return contacts;
    } else {
      contacts.forEach((c) => {
        var regex = new RegExp(filter, "g");
        if (`${c.firstName} ${c.lastName}`.match(regex)) {
          arrFiltered.push(c);
        }
      });
    }

    return arrFiltered;
  }, [filter, contacts]);

  useEffect(() => {
    fetchContactsAsync();
  }, []);

  return (
    <ContactContainer
      contacts={filtered}
      contact={contact}
      mode={mode}
      filter={filter}
      setMode={setMode}
      handleSave={handleSave}
      handleSelectContact={handleSelectContact}
      handleDeleteContact={handleDeleteContact}
      setFilter={setFilter}
    />
  );
};

export default ContactComponent;
