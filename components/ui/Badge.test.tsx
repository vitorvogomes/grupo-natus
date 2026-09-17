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

  it.each(DEVELOPMENT_STATUSES)(
    "variante de status '%s' mostra o rótulo e a cor do token",
    (status) => {
      render(<Badge status={status} />);
      const el = screen.getByText(STATUS_META[status].label);
      expect(el.className).toContain(
        STATUS_META[status].badgeClassName.split(" ")[0],
      );
    },
  );
});
