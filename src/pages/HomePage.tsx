import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../hooks/useProjects";
import type { ApiProject } from "../types/api-project";
import { Link } from "react-router";

type HomePageProps = {
  projects?: ApiProject[]
}


export default function HomePage({ projects = [] }: HomePageProps) {
  const { showFeaturedOnly, sortOrder } = useSettings();
  const {
    projects: apiProjects,
    status,
    error,
    reload,
  } = useProjects();

  const sourceProjects = projects.length > 0 ? projects : apiProjects;

  const list = sourceProjects
    .slice()
    .filter((p) => !showFeaturedOnly || Boolean(p.featured))
    .sort((a, b) => {
      if (sortOrder === "newest") {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : Number.NaN;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : Number.NaN;

        if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
          return bTime - aTime;
        }
      }

      return (a.name ?? "").localeCompare(b.name ?? "");
    });

  return (
    <>
        <h1>Welcome to my portfolio</h1>
        <p>View <Link to="/skills">Skills</Link> </p>
         <section>
      <h2>{showFeaturedOnly ? "Featured Projects" : "All Projects"}</h2>

      {status === "loading" && sourceProjects.length === 0 && <p>Loading projects...</p>}

      {status === "error" && sourceProjects.length === 0 && (
        <p>
          Could not load projects: {error}{" "}
          <button onClick={() => reload()}>Retry</button>
        </p>
      )}

      {status === "success" && list.length === 0 && <p>No projects to show.</p>}

      {list.length > 0 && (
        <ul>
          {list.map((p) => (
            <li key={p.id ?? p.name}>
              <strong>{p.name}</strong>
              {p.summary ? <div>{p.summary}</div> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
    </>

  );
}
