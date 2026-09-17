"use client";

import { useMemo, useState } from "react";
import { DevelopmentGrid } from "./DevelopmentGrid";
import {
  filterDevelopments,
  uniqueLocations,
} from "./filterDevelopments";
import {
  DEVELOPMENT_STATUSES,
  STATUS_META,
  type Development,
  type DevelopmentStatus,
} from "@/types/development";

type DevelopmentCatalogProps = {
  developments: readonly Development[];
};

const selectClass =
  "rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink";

export function DevelopmentCatalog({ developments }: DevelopmentCatalogProps) {
  const [status, setStatus] = useState<DevelopmentStatus | "">("");
  const [location, setLocation] = useState<string>("");

  const locations = useMemo(
    () => uniqueLocations(developments),
    [developments],
  );

  const filtered = useMemo(
    () =>
      filterDevelopments(developments, {
        status: status || null,
        location: location || null,
      }),
    [developments, status, location],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-status" className="text-xs font-medium text-ink">
            Status
          </label>
          <select
            id="filter-status"
            className={selectClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as DevelopmentStatus | "")}
          >
            <option value="">Todos os status</option>
            {DEVELOPMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-location"
            className="text-xs font-medium text-ink"
          >
            Localização
          </label>
          <select
            id="filter-location"
            className={selectClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Todas as localizações</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <p className="ml-auto text-sm text-muted" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "empreendimento" : "empreendimentos"}
        </p>
      </div>

      <DevelopmentGrid developments={filtered} />
    </div>
  );
}
