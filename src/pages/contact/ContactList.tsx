import React, { useMemo } from "react";
import styled from "styled-components/macro";

// assets
import AddIcon from "../.././assets/icons/add.svg";

// types
import { ContactListProps } from "./type";

// components
import ContactHeaderFilter from "./ContactHeaderFilter";
import ContactItem from "./ContactItem";

const ContactList = (props: ContactListProps) => {
  const {
    contacts,
    contact,
    filter,
    handleSelectContact,
    setMode,
    setFilter,
  } = props;

  const renderListContacts = useMemo(() => {
    return contacts.map((c, index) => (
      <ContactItem
        key={`contact-item-${index}`}
        isActive={contact?.id === c.id}
        contact={c}
        handleSelectContact={handleSelectContact}
      />
    ));
  }, [contacts, contact]);

  return (
    <Container>
      <ContactHeaderFilter filter={filter} setFilter={setFilter} />

      <TitleHeader>
        <span>CONTACTS</span>
        <img src={AddIcon} onClick={() => setMode("add")} />
      </TitleHeader>

      <div className="container-contact-list">{renderListContacts}</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;

  .container-contact-list {
    margin-top: 10px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #1f2124;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px 10px 5px;
  margin-top: 5px;
  border-bottom: 1px #4b525c solid;

  span {
    letter-spacing: 2px;
    font-size: 12px;
    color: #e0e0e0;
  }

  img {
    cursor: pointer;
  }
`;

export default ContactList;
