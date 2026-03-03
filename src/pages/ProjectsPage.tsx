import { useProjects } from '../hooks/useProjects';
import ProjectsList from '../components/ProjectsList';


export default function ProjectsPage() {
const { projects, status, error, reload } = useProjects();



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
        <ProjectsList projects={projects} />
      )}


    </>
  );
}
