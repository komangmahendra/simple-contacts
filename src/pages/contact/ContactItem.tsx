import React, { useMemo } from "react";
import styled from "styled-components/macro";

// utils
import createInitial from "./utils/createInitial";

// types
import { ContactItemProps } from "./type";

const ContactItem = (props: ContactItemProps) => {
  const { contact, isActive, handleSelectContact } = props;

  const renderImage = useMemo(() => {
    if (!contact.photo || contact.photo === "N/A") {
      const initial = createInitial(contact.firstName, contact.lastName);
      return <DummyImage>{initial}</DummyImage>;
    } else {
      return <img src={contact.photo} className="contact-photo" />;
    }
  }, [contact]);

  return (
    <Container
      onClick={() => handleSelectContact(contact)}
      isActive={isActive}
      data-testid="contact-item"
    >
      {renderImage}
      <Name> {`${contact.firstName} ${contact.lastName}`}</Name>
    </Container>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: ${({ isActive }) => (isActive ? "#2c2f33" : "transparent")};
  border-radius: 5px;

  > .contact-photo {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
    border: 1px solid #fff;
  }

  :hover {
    background: #18191c;
  }

  cursor: pointer;
`;

const DummyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 1px solid #fff;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #1f2124;
`;

const Name = styled.div`
  color: #fff;
  margin-left: 15px;
  font-size: 11px;
  letter-spacing: 1px;
`;

export default ContactItem;
