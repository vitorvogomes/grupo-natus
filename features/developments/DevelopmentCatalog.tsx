"use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/ui/SelectField";
import { DevelopmentGrid } from "./DevelopmentGrid";
import { filterDevelopments, uniqueLocations } from "./filterDevelopments";
import {
  DEVELOPMENT_STATUSES,
  STATUS_META,
  type Development,
  type DevelopmentStatus,
} from "@/types/development";

type DevelopmentCatalogProps = {
  developments: readonly Development[];
};

const ALL = "all";

export function DevelopmentCatalog({ developments }: DevelopmentCatalogProps) {
  const [status, setStatus] = useState<DevelopmentStatus | typeof ALL>(ALL);
  const [location, setLocation] = useState<string>(ALL);

  const locations = useMemo(
    () => uniqueLocations(developments),
    [developments],
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
      { value: ALL, label: "Todas as localizações" },
      ...locations.map((loc) => ({ value: loc, label: loc })),
    ],
    [locations],
  );

  const filtered = useMemo(
    () =>
      filterDevelopments(developments, {
        status: status === ALL ? null : status,
        location: location === ALL ? null : location,
      }),
    [developments, status, location],
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
          id="filter-location"
          label="Localização"
          value={location}
          onValueChange={setLocation}
          options={locationOptions}
        />

        <p className="ml-auto text-sm text-muted-foreground" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "empreendimento" : "empreendimentos"}
        </p>
      </div>

      <DevelopmentGrid developments={filtered} />
    </div>
  );
}
