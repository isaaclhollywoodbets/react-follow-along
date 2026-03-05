import { createContext, useContext, useMemo, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import {
  initialSettings,
  settingsReducer,
  type SettingsAction,
  type SettingsState,
} from "./settingsReducer";

const SettingsStateContext = createContext<SettingsState | undefined>(undefined);
const SettingsDispatchContext = createContext<Dispatch<SettingsAction> | undefined>(
  undefined
);

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialSettings);

  const stateValue = useMemo(() => state, [state]);

  return (
    <SettingsStateContext.Provider value={stateValue}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
}

export function useSettings() {
  const state = useContext(SettingsStateContext);
  if (!state) throw new Error("useSettings must be used inside <SettingsProvider>");
  return state;
}

export function useSettingsDispatch() {
  const dispatch = useContext(SettingsDispatchContext);
  if (!dispatch) {
    throw new Error("useSettingsDispatch must be used inside <SettingsProvider>");
  }
  return dispatch;
}