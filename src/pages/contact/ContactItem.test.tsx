import React from "react";
import { render } from "@testing-library/react";

// component
import ContactItem from "./ContactItem";

const mockHandleSelectContact = jest.fn();
const mockComtact = {
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
        contact={mockComtact}
      />
    );

    expect(getByTestId("contact-item")).toBeTruthy();
  });

  test("render right name", () => {
    const { getByText } = render(
      <ContactItem
        isActive={false}
        handleSelectContact={mockHandleSelectContact}
        contact={mockComtact}
      />
    );

    expect(getByText("Test Last")).toBeTruthy();
  });
});
