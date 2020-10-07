import React from "react";
import { render, fireEvent } from "@testing-library/react";

// component
import ContactItem from "./ContactItem";

const mockHandleSelectContact = jest.fn();
const mockContact = {
  id: "12345",
  firstName: "Test",
  lastName: "Last",
  age: 10,
  photo: "N/A",
};

describe("Contact Item test", () => {
  test("render properly", () => {
    const { getByTestId } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockContact}
      />
    );

    expect(getByTestId("contact-item")).toBeTruthy();
  });

  test("render right name", () => {
    const { getByText } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockContact}
      />
    );

    expect(getByText("Test Last")).toBeTruthy();
  });

  test("click the card will trigger the function", () => {
    const { getByTestId } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockContact}
      />
    );

    const card = getByTestId("contact-item");
    expect(card).toBeTruthy();

    fireEvent.click(card);
    expect(mockHandleSelectContact).toBeCalledWith(mockContact);
  });

  test("render initial if not has link photo", () => {
    const { getByText } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockContact}
      />
    );

    const profilePhoto = getByText("TL");
    expect(profilePhoto).toBeTruthy();
  });

  test("render the photo if has image link", () => {
    mockContact.photo = "http://photo.com";

    const { getByTestId } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockContact}
      />
    );

    const profilePhoto = getByTestId("profile-item");
    expect(profilePhoto).toBeTruthy();
  });
});
