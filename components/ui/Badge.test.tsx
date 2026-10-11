import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import { DEVELOPMENT_STATUSES, STATUS_META } from "@/types/development";

describe("Badge", () => {
  it("renderiza children numa badge neutra", () => {
    render(<Badge>Novo</Badge>);
    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("mescla className extra", () => {
    render(<Badge className="extra">X</Badge>);
    expect(screen.getByText("X")).toHaveClass("extra");
  });

  it("todos os status usam o mesmo selo branco do MCMV (sem cor por status)", () => {
    const { container } = render(
      <>
        {DEVELOPMENT_STATUSES.map((status) => (
          <Badge key={status} status={status} />
        ))}
        <Badge>Minha Casa Minha Vida</Badge>
      </>,
    );
    const classes = [...container.querySelectorAll("span")].map((el) => el.className);
    expect(new Set(classes).size).toBe(1);
    expect(classes[0]).toContain("bg-surface");
    for (const status of DEVELOPMENT_STATUSES) {
      expect(screen.getByText(STATUS_META[status].label)).toBeInTheDocument();
    }
  });
});
