type SortOrder = "name" | "newest";

export type SettingsState = {
  showFeaturedOnly: boolean;
  sortOrder: SortOrder;
};

export const initialSettings: SettingsState = {
  showFeaturedOnly: false,
  sortOrder: "name",
};

export type SettingsAction =
  | { type: "set_show_featured_only"; value: boolean }
  | { type: "set_sort_order"; sortOrder: SortOrder }
  | { type: "reset_settings" };

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

    case "reset_settings": {
      return initialSettings;
    }

    default: {
      return assertNever(action);
    }
  }
}