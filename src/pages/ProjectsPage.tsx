import { useEffect, useState } from 'react';
import type { ApiProject } from '../types/api-project';
import ProjectsList from '../components/ProjectsList';
import { getProjects } from '../api/portfolioApi';


export default function ProjectsPage() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");


  async function loadProjects({ signal }: { signal?: AbortSignal} = {}) {
    setStatus("loading");
    setError("");

    try {
      
      const data = await getProjects({signal});
      setProjects(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not load projects");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadProjects({ signal: controller.signal })

    return () => controller.abort();
  }, [])

  return (
    <>
      <h1>Projects</h1>
      {status === "idle" && <p>Ready.</p>}

      {status === "loading" && <p>Loading projects…</p>}

      {status === "error" && (
        <div>
          <p>Could not load projects: {error}</p>
          <button onClick={() => loadProjects()}>Retry</button>
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      {status === "success" && projects.length > 0 && (
        // <ul>
        //   {projects.map((p) => (
        //     <li key={p.id ?? p.name}>
        //       <strong>{p.name}</strong>
        //       {p.summary ? <div>{p.summary}</div> : null}
        //     </li>
        //   ))}
        // </ul>
        <ProjectsList projects={projects} />
      )}

    </>
  );
}
