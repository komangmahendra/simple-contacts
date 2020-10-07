import React from "react";
import styled from "styled-components/macro";

// types
import { ContactContainerProps } from "./type";

// components
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

const ContactContainer = (props: ContactContainerProps) => {
  const {
    contacts,
    contact,
    mode,
    filter,
    isLoading,
    isLoadingDetail,
    handleSave,
    handleSelectContact,
    setMode,
    handleDeleteContact,
    setFilter,
  } = props;

  return (
    <Container>
      <ContactList
        contacts={contacts}
        contact={contact}
        filter={filter}
        isLoading={isLoading}
        setMode={setMode}
        handleSelectContact={handleSelectContact}
        setFilter={setFilter}
      />
      <ContactDetail
        contact={contact}
        mode={mode}
        setMode={setMode}
        isLoadingDetail={isLoadingDetail}
        handleSelectContact={handleSelectContact}
        handleSave={handleSave}
        handleDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 750px;
  height: 500px;
  background-color: #111113;
  border-radius: 5px;
  overflow: hidden;

  display: grid;
  grid-template-columns: 45% 55%;

  /* shadow */
  -webkit-box-shadow: 2px 2px 10px 2px #ccc; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 2px 2px 10px 2px #ccc; /* Firefox 3.5 - 3.6 */
  box-shadow: 2px 2px 10px 2px #ccc;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ContactContainer;
