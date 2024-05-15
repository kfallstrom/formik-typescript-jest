import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { handleSubmit } from "./App";

describe("app", () => {
  it("has content", () => {
    const ret = render(<App />);
    expect(ret.getByText("Hello CodeSandbox"));
  });
  it("input name works", async () => {
    const submit = jest.spyOn(App.prototype, "handleSubmit");
    const ret = render(<App />);
    const nameInput = ret.getByTestId("name");
    await userEvent.type(nameInput, "Karl");
    const submitButton = ret.getByRole("button");
    await userEvent.click(submitButton);
    expect(submit).toHaveBeenCalled();
  });
  it("on initial load input name should be disabled", async () => {
    const ret = render(<App />);
    const nameInput = ret.getByTestId("name") as HTMLInputElement;

    expect(nameInput.disabled).toBe(true);
  });
  it("input name should be disabled for under age people", async () => {
    const ret = render(<App />);
    const ageInput = ret.getByTestId("age");
    const nameInput = ret.getByTestId("name") as HTMLInputElement;

    await userEvent.type(ageInput, "17");

    expect(nameInput.disabled).toBe(true);
  });
  it("input name should not be disabled for above 18 age people", async () => {
    const ret = render(<App />);
    const ageInput = ret.getByTestId("age");
    const nameInput = ret.getByTestId("name") as HTMLInputElement;

    await userEvent.type(ageInput, "21");

    expect(nameInput.disabled).toBe(false);
  });
});
