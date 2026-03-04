// src/context/SettingsContext.tsx
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type SortOrder = "name" | "newest";

type SettingsContextValue = {
  showFeaturedOnly: boolean;
  setShowFeaturedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("name");

  // Important: Provider value changes trigger re-renders of all consumers.
  // Memoize to avoid creating a new object every render unnecessarily.
  const value = useMemo<SettingsContextValue>(
    () => ({
      showFeaturedOnly,
      setShowFeaturedOnly,
      sortOrder,
      setSortOrder,
    }),
    [showFeaturedOnly, sortOrder]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside <SettingsProvider>");
  }
  return ctx;
}