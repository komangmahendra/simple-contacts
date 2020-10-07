import React from "react";
import { render, fireEvent } from "@testing-library/react";

// component
import ContactList from "./ContactList";

const mockHandleSelectContact = jest.fn();
const mockSetMode = jest.fn();
const mockSetFilter = jest.fn();
const mockContact = {
  id: "12345",
  firstName: "Test",
  lastName: "Last",
  age: 10,
  photo: "N/A",
};

describe("Contact List test", () => {
  test("render properly", () => {
    const { getByTestId, getByText } = render(
      <ContactList
        filter={""}
        contact={mockContact}
        contacts={[mockContact]}
        handleSelectContact={mockHandleSelectContact}
        setMode={mockSetMode}
        setFilter={mockSetFilter}
      />
    );

    expect(getByTestId("contact-list")).toBeTruthy();
    expect(getByText("CONTACTS")).toBeTruthy();
    expect(getByText("Test Last")).toBeTruthy();
  });

  test("click set mode", () => {
    const { getByTestId } = render(
      <ContactList
        filter={""}
        contact={mockContact}
        contacts={[mockContact]}
        handleSelectContact={mockHandleSelectContact}
        setMode={mockSetMode}
        setFilter={mockSetFilter}
      />
    );

    const addButton = getByTestId("add-button");
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);
    expect(mockSetMode).toBeCalledWith("add");
  });
});
