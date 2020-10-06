import createInitial from "./createInitial";

describe("Create Initial Test", () => {
  test("right initial", () => {
    const Initial = createInitial("Test", "Last");
    expect(Initial).toEqual("TL");
  });
});
