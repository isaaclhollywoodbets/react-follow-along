type ProjectsToolbarProps = {
   query: string;
   onQueryChange: (value: string) => void;
   showFeaturedOnly: boolean;
   onShowFeaturedOnlyChange: (checked: boolean) => void;
}


export function ProjectsToolbar({
  query,
  onQueryChange,
  showFeaturedOnly,
  onShowFeaturedOnlyChange,
}: ProjectsToolbarProps) {
  return (
    <section>
      <label>
        Search:{" "}
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Type to filter projects..."
        />
      </label>

      <label style={{ marginLeft: 12 }}>
        <input
          type="checkbox"
          checked={showFeaturedOnly}
          onChange={(e) => onShowFeaturedOnlyChange(e.target.checked)}
        />
        {" "}Show featured only
      </label>
    </section>
  );
}