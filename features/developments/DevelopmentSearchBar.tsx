"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";
import { buttonVariants } from "@/components/ui/Button";
import { buildDevelopmentsHref } from "./searchParams";
import { uniqueLocations, uniquePropertyTypes } from "./filterDevelopments";
import {
  DEVELOPMENT_STATUSES,
  PROPERTY_TYPE_LABELS,
  STATUS_META,
  type Development,
  type DevelopmentStatus,
  type PropertyType,
} from "@/types/development";
import { cn } from "@/lib/utils";

type DevelopmentSearchBarProps = {
  developments: readonly Development[];
  className?: string;
};

const ALL = "all";

/**
 * Busca de empreendimentos da Home.
 *
 * "Buscar" é um `<Link>`, não um botão com `router.push`: a ação é navegação,
 * então ganha prefetch, Ctrl+clique e uma URL compartilhável — e o destino fica
 * verificável no DOM, sem mock de router.
 */
export function DevelopmentSearchBar({
  developments,
  className,
}: DevelopmentSearchBarProps) {
  const [status, setStatus] = useState<DevelopmentStatus | typeof ALL>(ALL);
  const [location, setLocation] = useState<string>(ALL);
  const [propertyType, setPropertyType] = useState<PropertyType | typeof ALL>(
    ALL,
  );

  const statusOptions = useMemo(
    () => [
      { value: ALL, label: "Todos os status" },
      ...DEVELOPMENT_STATUSES.map((s) => ({
        value: s,
        label: STATUS_META[s].label,
      })),
    ],
    [],
  );

  const locationOptions = useMemo(
    () => [
      { value: ALL, label: "Todas as cidades" },
      ...uniqueLocations(developments).map((loc) => ({
        value: loc,
        label: loc,
      })),
    ],
    [developments],
  );

  // A faceta só aparece se o conteúdo a sustenta: com tudo pendente de
  // confirmação, um select vazio seria pior do que select nenhum.
  const types = useMemo(
    () => uniquePropertyTypes(developments),
    [developments],
  );
  const typeOptions = useMemo(
    () => [
      { value: ALL, label: "Todos os tipos" },
      ...types.map((t) => ({ value: t, label: PROPERTY_TYPE_LABELS[t] })),
    ],
    [types],
  );

  const href = buildDevelopmentsHref({
    status: status === ALL ? null : status,
    location: location === ALL ? null : location,
    propertyType: propertyType === ALL ? null : propertyType,
  });

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 shadow-lg sm:p-6",
        className,
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-strong">
        Encontre seu imóvel
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <SelectField
          id="busca-status"
          label="Status"
          value={status}
          onValueChange={(v) => setStatus(v as DevelopmentStatus | typeof ALL)}
          options={statusOptions}
          className="flex-1"
          triggerClassName="w-full"
        />
        <SelectField
          id="busca-cidade"
          label="Cidade"
          value={location}
          onValueChange={setLocation}
          options={locationOptions}
          className="flex-1"
          triggerClassName="w-full"
        />
        {types.length > 0 ? (
          <SelectField
            id="busca-tipo"
            label="Tipo de imóvel"
            value={propertyType}
            onValueChange={(v) =>
              setPropertyType(v as PropertyType | typeof ALL)
            }
            options={typeOptions}
            className="flex-1"
            triggerClassName="w-full"
          />
        ) : null}

        <Link
          href={href}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          Buscar
          <Search aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
