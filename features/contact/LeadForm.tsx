"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, type SelectOption } from "@/components/ui/Select";
import { isEmail, isPhone } from "@/lib/validators";
import { FIELD_MAX } from "@/lib/leads/schema";
import { readPageContext } from "./pageContext";
import { LEAD_ERROR_MESSAGE, submitLead } from "./submitLead";

export type LeadFieldType = "text" | "email" | "tel" | "textarea" | "select";

export type LeadField = {
  name: string;
  label: string;
  type?: LeadFieldType;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
};

type LeadFormProps = {
  leadType: string;
  fields: readonly LeadField[];
  submitLabel?: string;
  /** Contexto oculto enviado junto (ex.: slug do empreendimento). */
  context?: Record<string, string>;
  /** Envia também a página e a UTM da URL atual (lidas no envio). */
  withPageContext?: boolean;
};

type LeadValues = Record<string, string>;

/** Limite do servidor (`FIELD_MAX`) para o campo, quando ele tem um. */
function maxLengthOf(field: LeadField): number | undefined {
  return (FIELD_MAX as Record<string, number>)[field.name];
}

/** Schema zod derivado dos campos: tamanho, obrigatório e email/telefone quando preenchidos. */
function buildSchema(fields: readonly LeadField[]) {
  const shape: Record<string, z.ZodType<string>> = {};
  for (const field of fields) {
    const checks: Array<{ test: (v: string) => boolean; message: string }> = [];
    const max = maxLengthOf(field);
    if (max) checks.push({ test: (v) => v.trim().length <= max, message: `Use até ${max} caracteres.` });
    if (field.required) {
      checks.push({ test: (v) => v.trim().length > 0, message: "Campo obrigatório." });
    }
    if (field.type === "email") {
      checks.push({ test: (v) => v.trim() === "" || isEmail(v), message: "Email inválido." });
    }
    if (field.type === "tel") {
      checks.push({
        test: (v) => v.trim() === "" || isPhone(v),
        message: "Telefone inválido.",
      });
    }
    shape[field.name] = checks.reduce<z.ZodType<string>>(
      (schema, check) => schema.refine(check.test, check.message),
      z.string(),
    );
  }
  return z.object(shape);
}

export function LeadForm({
  leadType,
  fields,
  submitLabel = "Enviar",
  context = {},
  withPageContext = false,
}: LeadFormProps) {
  const schema = useMemo(() => buildSchema(fields), [fields]);
  const defaultValues = useMemo<LeadValues>(
    () => Object.fromEntries(fields.map((f) => [f.name, ""])),
    [fields],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    // Schema é dinâmico (campos variam por página); o cast alinha o input
    // genérico do resolver ao nosso mapa string→string.
  } = useForm<LeadValues>({
    resolver: zodResolver(schema) as Resolver<LeadValues>,
    defaultValues,
  });

  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function onValid(values: LeadValues) {
    setStatus("sending");
    const page = withPageContext ? readPageContext(window.location) : {};
    const result = await submitLead({ type: leadType, ...page, ...context, ...values });
    setStatus(result.ok ? "success" : "error");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    // Anti-spam: honeypot preenchido → finge sucesso antes de validar/enviar.
    if (honeypot) {
      event.preventDefault();
      setStatus("success");
      return;
    }
    void handleSubmit(onValid)(event);
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
        const error = errors[field.name]?.message as string | undefined;
        const registration = register(field.name);
        if (field.type === "textarea") {
          return (
            <Textarea
              key={field.name}
              id={id}
              label={field.label}
              required={field.required}
              error={error}
              rows={4}
              maxLength={maxLengthOf(field)}
              placeholder={field.placeholder}
              {...registration}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Select
              key={field.name}
              id={id}
              label={field.label}
              required={field.required}
              error={error}
              options={field.options ?? []}
              placeholder={field.placeholder}
              {...registration}
            />
          );
        }
        return (
          <Input
            key={field.name}
            id={id}
            label={field.label}
            required={field.required}
            error={error}
            type={field.type ?? "text"}
            maxLength={maxLengthOf(field)}
            placeholder={field.placeholder}
            {...registration}
          />
        );
      })}

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          {LEAD_ERROR_MESSAGE}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : submitLabel}
      </Button>
      {/* Aviso, não pedido de aceite: a base legal é procedimento preliminar
          a contrato (LGPD art. 7º, V), não consentimento — "você concorda"
          diria o contrário. A política explica uso e direitos. */}
      <p className="text-xs text-muted-foreground">
        Os dados enviados são tratados conforme a nossa{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-medium text-brand-strong underline underline-offset-2"
        >
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
