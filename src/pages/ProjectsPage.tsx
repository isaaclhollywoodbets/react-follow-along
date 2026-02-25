import { useEffect, useState } from 'react';
import type { ApiProject } from '../types/api-project';
import ProjectsList from '../components/ProjectsList';
import { ApiError, getProjects } from '../api/portfolioApi';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");


  async function loadProjects({ signal }: { signal?: AbortSignal } = {}) {
    setStatus("loading");
    setError("");

    try {

      const data = await getProjects({
        signal,
        query: { search: "react", sort: "name" },
      });
      setProjects(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");

      if (err instanceof ApiError) {
        setError(`${err.message} (HTTP ${err.status})`);
        console.error("API error:", err.url, err.details);
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
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
        <ProjectsList projects={projects} />
      )}


    </>
  );
}
