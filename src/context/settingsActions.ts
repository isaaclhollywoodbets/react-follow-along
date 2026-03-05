export const setShowFeaturedOnly = (value: boolean) =>
  ({ type: "set_show_featured_only", value } as const);
export const setSortOrder = (sortOrder: "name" | "newest") =>
  ({ type: "set_sort_order", sortOrder } as const);
export const toggleCompactMode = () => ({ type: "toggle_compact_mode" } as const);
export const resetSettings = () => ({ type: "reset_settings" } as const);