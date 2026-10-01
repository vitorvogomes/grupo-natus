"use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/ui/SelectField";
import { DevelopmentGrid } from "./DevelopmentGrid";
import {
  filterDevelopments,
  uniqueLocations,
  uniquePropertyTypes,
  type DevelopmentFilters,
} from "./filterDevelopments";
import {
  DEVELOPMENT_STATUSES,
  PROPERTY_TYPE_LABELS,
  STATUS_META,
  type Development,
  type DevelopmentStatus,
  type PropertyType,
} from "@/types/development";

type DevelopmentCatalogProps = {
  developments: readonly Development[];
  /**
   * Filtros vindos da URL (busca feita na home). Usados só como estado
   * inicial: a partir daí quem manda são os controles, sem efeito de
   * sincronização que pudesse desfazer a escolha do usuário.
   */
  initialFilters?: DevelopmentFilters;
};

const ALL = "all";

export function DevelopmentCatalog({
  developments,
  initialFilters = {},
}: DevelopmentCatalogProps) {
  const [status, setStatus] = useState<DevelopmentStatus | typeof ALL>(
    initialFilters.status ?? ALL,
  );
  const [location, setLocation] = useState<string>(
    initialFilters.location ?? ALL,
  );
  const [propertyType, setPropertyType] = useState<PropertyType | typeof ALL>(
    initialFilters.propertyType ?? ALL,
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

  // Um filtro que chega pela URL pode não ter controle na tela para desfazê-lo
  // (o select de tipologia só aparece se houver tipos). Sem este botão, o
  // usuário ficaria preso em zero resultado.
  const algumFiltroAtivo =
    status !== ALL || location !== ALL || propertyType !== ALL;

  function limparFiltros() {
    setStatus(ALL);
    setLocation(ALL);
    setPropertyType(ALL);
  }

  const filtered = useMemo(
    () =>
      filterDevelopments(developments, {
        status: status === ALL ? null : status,
        location: location === ALL ? null : location,
        propertyType: propertyType === ALL ? null : propertyType,
      }),
    [developments, status, location, propertyType],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <SelectField
          id="filter-status"
          label="Status"
          value={status}
          onValueChange={(v) => setStatus(v as DevelopmentStatus | typeof ALL)}
          options={statusOptions}
        />
        <SelectField
          id="filter-cidade"
          label="Cidade"
          value={location}
          onValueChange={setLocation}
          options={locationOptions}
        />
        {types.length > 0 ? (
          <SelectField
            id="filter-tipo"
            label="Tipo de imóvel"
            value={propertyType}
            onValueChange={(v) =>
              setPropertyType(v as PropertyType | typeof ALL)
            }
            options={typeOptions}
          />
        ) : null}

        <div className="ml-auto flex items-center gap-4">
          {algumFiltroAtivo ? (
            <button
              type="button"
              onClick={limparFiltros}
              className="text-sm font-medium text-brand-strong underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Limpar filtros
            </button>
          ) : null}
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1 ? "empreendimento" : "empreendimentos"}
          </p>
        </div>
      </div>

      <DevelopmentGrid developments={filtered} />
    </div>
  );
}
