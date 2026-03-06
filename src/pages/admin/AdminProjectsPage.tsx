import { useEffect, useMemo, useState } from "react";
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../../api/projectsApi";
import type { ApiProject } from "../../types/api-project";
import AdminProjectForm from "./AdminProjectForm";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === editingId) ?? null,
    [projects, editingId]
  );

  async function refreshProjects() {
    const data = await getProjects();
    setProjects(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  async function handleSave(draft: Omit<ApiProject, "id" | "createdAt">) {
    if (editingId == null) {
      await createProject(draft);
    } else {
      await updateProject(editingId, draft);
    }

    await refreshProjects();
    setEditingId(null);
  }

    async function handleDelete() {
    if (editingId == null) return;

    await deleteProject(editingId);
    await refreshProjects();
    setEditingId(null);
  }

  function startEdit(project: ApiProject) {
    setEditingId(project.id);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <section>
      <h2>Projects</h2>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong>{" "}
            <button type="button" onClick={() => startEdit(project)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h3>{editingId == null ? "Create Project" : "Edit Project"}</h3>

      <AdminProjectForm
        initialValues={selectedProject}
        onSave={handleSave}
        onCancel={cancelEdit}
        onDelete={handleDelete}
      />
    </section>
  );
}