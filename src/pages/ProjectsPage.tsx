import { useProjects } from '../hooks/useProjects';
import ProjectsList from '../components/ProjectsList';
import { useState } from 'react';
import { ProjectsToolbar } from '../components/ProjectsToolbar';
import { ProjectsSummary } from '../components/ProjectsSummary';
import { useSettings } from '../context/SettingsContext';


export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const {showFeaturedOnly, setShowFeaturedOnly, sortOrder} = useSettings()

  const { projects, status, error, reload } = useProjects();


  const visibleProjects = projects
    .slice()
    .filter((p) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        normalizedQuery === "" ||
        (p.name ?? "").toLowerCase().includes(normalizedQuery) ||
        (p.summary ?? "").toLowerCase().includes(normalizedQuery);
      const matchesFeatured = !showFeaturedOnly || Boolean(p.featured);
      return matchesQuery && matchesFeatured;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
        );
      }
      return (a.name ?? "").localeCompare(b.name ?? "");
    });



  return (
    <>
      <h1>Projects</h1>
      {status === "idle" && <p>Ready.</p>}

      {status === "loading" && <p>Loading projects…</p>}

      {status === "error" && (
        <div>
          <p>Could not load projects: {error}</p>
          <button onClick={() => reload()}>Retry</button>
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      {status === "success" && projects.length > 0 && (
        <>
          <ProjectsToolbar
            query={query}
            onQueryChange={setQuery}
            showFeaturedOnly={showFeaturedOnly}
            onShowFeaturedOnlyChange={setShowFeaturedOnly} />

            <ProjectsSummary
            visibleCount={visibleProjects.length}
            totalCount={projects.length}/>
          <ProjectsList projects={visibleProjects} />
        </>

      )}


    </>
  );
}
