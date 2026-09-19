import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("não renderiza nada quando fechado", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Título">
        conteúdo
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza diálogo modal com título e conteúdo quando aberto", () => {
    render(
      <Modal open onClose={() => {}} title="Título">
        conteúdo
      </Modal>,
    );
    // Modalidade agora é responsabilidade do Radix (focus-scope + inert);
    // validamos o papel, o nome acessível (via DialogTitle) e o conteúdo.
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName("Título");
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("chama onClose no botão fechar, no Escape e no clique do overlay", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal open onClose={onClose} title="T">
        c
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: /fechar/i }));
    await user.keyboard("{Escape}");
    await user.click(screen.getByTestId("modal-overlay"));
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
