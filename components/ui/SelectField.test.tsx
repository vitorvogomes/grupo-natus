import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectField } from "./SelectField";

const options = [
  { value: "all", label: "Todos" },
  { value: "a", label: "Opção A" },
  { value: "b", label: "Opção B" },
];

describe("SelectField (Radix, acessível)", () => {
  it("expõe um combobox rotulado pelo label", () => {
    render(
      <SelectField
        id="x"
        label="Categoria"
        value="all"
        onValueChange={() => {}}
        options={options}
      />,
    );
    expect(
      screen.getByRole("combobox", { name: /categoria/i }),
    ).toBeInTheDocument();
  });

  it("abre o painel e seleciona uma opção via onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <SelectField
        id="x"
        label="Categoria"
        value="all"
        onValueChange={onValueChange}
        options={options}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: /categoria/i }));
    await user.click(screen.getByRole("option", { name: "Opção B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});
