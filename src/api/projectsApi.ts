import { apiFetch } from "./http";
import type { ApiProject } from "../types/api-project";

export function getProjects() {
  return apiFetch("/api/projects") as Promise<ApiProject[]>;
}

export function createProject(project: Omit<ApiProject, "id" | "createdAt">) {
  return apiFetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export function updateProject(
  id: number,
  project: Omit<ApiProject, "id" | "createdAt">
) {
  return apiFetch(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
}

export function deleteProject(id: number) {
  return apiFetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
}