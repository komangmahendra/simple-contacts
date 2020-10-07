import React from "react";
import { render, fireEvent } from "@testing-library/react";

// component
import ContactHeaderFilter from "./ContactHeaderFilter";

const mockSetFilter = jest.fn();

describe("Header Filter Test", () => {
  test("render properly", () => {
    const { getByPlaceholderText } = render(
      <ContactHeaderFilter filter={""} setFilter={mockSetFilter} />
    );

    expect(getByPlaceholderText("search contact")).toBeTruthy();
  });

  test("enter value to search filter", () => {
    const { getByPlaceholderText } = render(
      <ContactHeaderFilter filter={""} setFilter={mockSetFilter} />
    );

    const searchInput = getByPlaceholderText("search contact");
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: "Test Test" } });
    expect(mockSetFilter).toBeCalledWith("Test Test");
  });
});
