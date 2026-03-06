type SortOrder = "name" | "newest";

export type SettingsState = {
  showFeaturedOnly: boolean;
  sortOrder: SortOrder;
  compactMode: boolean;
  isAdminMode: boolean;
};

export const initialSettings: SettingsState = {
  showFeaturedOnly: false,
  sortOrder: "name",
  compactMode: false,
  isAdminMode: true,
};

export type SettingsAction =
  | { type: "set_show_featured_only"; value: boolean }
  | { type: "set_sort_order"; sortOrder: SortOrder }
  | { type: "toggle_compact_mode" }
  | { type: "load_settings"; settings: Partial<SettingsState> }
  | { type: "reset_settings" }
  | { type: "set_admin_mode"; value: boolean };

function assertNever(value: never): never {
  throw new Error("Unhandled action: " + JSON.stringify(value));
}

export function settingsReducer(
  state: SettingsState,
  action: SettingsAction
): SettingsState {
  switch (action.type) {
    case "set_show_featured_only": {
      return {
        ...state,
        showFeaturedOnly: action.value,
      };
    }

    case "set_sort_order": {
      return {
        ...state,
        sortOrder: action.sortOrder,
      };
    }

    case "toggle_compact_mode": {
        return {
            ...state, compactMode: !state.compactMode
        };
    }

    case "load_settings": {
      return {
        ...state,
        ...action.settings,
      };
    }
 
    case "set_admin_mode": {
      return {
        ...state,
        isAdminMode: action.value,
      };
    }

    case "reset_settings": {
      return initialSettings;
    }

    default: {
      return assertNever(action);
    }
  }
}
