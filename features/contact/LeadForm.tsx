"use client";

import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, type SelectOption } from "@/components/ui/Select";
import { isEmail, isPhone, isRequired } from "@/lib/validators";
import { submitLead } from "./submitLead";

export type LeadFieldType = "text" | "email" | "tel" | "textarea" | "select";

export type LeadField = {
  name: string;
  label: string;
  type?: LeadFieldType;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
};

type LeadFormProps = {
  leadType: string;
  fields: readonly LeadField[];
  submitLabel?: string;
  /** Contexto oculto enviado junto (ex.: slug do empreendimento). */
  context?: Record<string, string>;
};

function validateField(field: LeadField, value: string): string | undefined {
  if (field.required && !isRequired(value)) return "Campo obrigatório.";
  if (!value) return undefined;
  if (field.type === "email" && !isEmail(value)) return "Email inválido.";
  if (field.type === "tel" && !isPhone(value)) return "Telefone inválido.";
  return undefined;
}

export function LeadForm({
  leadType,
  fields,
  submitLabel = "Enviar",
  context = {},
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])),
  );
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string>("");

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // Anti-spam: honeypot preenchido → finge sucesso, não envia.
    if (honeypot) {
      setStatus("success");
      return;
    }
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      const err = validateField(field, values[field.name] ?? "");
      if (err) nextErrors[field.name] = err;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setFormError("");
    const result = await submitLead({ type: leadType, ...context, ...values });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setFormError(result.error ?? "Falha ao enviar.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-md bg-surface-muted p-4 text-ink">
        Mensagem enviada! Em breve entraremos em contato.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot anti-spam (oculto para humanos). */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${leadType}-website`}>Não preencha</label>
        <input
          id={`${leadType}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {fields.map((field) => {
        const id = `${leadType}-${field.name}`;
        const common = {
          id,
          name: field.name,
          label: field.label,
          required: field.required,
          error: errors[field.name],
          value: values[field.name] ?? "",
        };
        if (field.type === "textarea") {
          return (
            <Textarea
              key={field.name}
              {...common}
              rows={4}
              placeholder={field.placeholder}
              onChange={(e) => setValue(field.name, e.target.value)}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Select
              key={field.name}
              {...common}
              options={field.options ?? []}
              placeholder={field.placeholder}
              onChange={(e) => setValue(field.name, e.target.value)}
            />
          );
        }
        return (
          <Input
            key={field.name}
            {...common}
            type={field.type ?? "text"}
            readOnly={field.readOnly}
            placeholder={field.placeholder}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );
      })}

      {status === "error" ? (
        <p role="alert" className="text-sm text-status-em-construcao">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : submitLabel}
      </Button>
    </form>
  );
}
