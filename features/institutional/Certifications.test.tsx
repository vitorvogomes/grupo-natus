import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Certifications } from "./Certifications";

describe("Certifications", () => {
  it("lista as duas certificações com selo e texto", () => {
    render(<Certifications />);
    expect(screen.getByRole("heading", { name: "Certificações" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "NBR ISO 9001:2015" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PBQP-H · SiAC Nível A" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /ISO 9001/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /PBQP-H/ })).toBeInTheDocument();
  });
});
