// src/api/portfolioApi.ts
import { API_BASE_URL } from "../config";
import type { ApiProject } from "../types/api-project";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type FetchJsonOptions = {
  signal?: AbortSignal;
};

async function fetchJson<T>(path: string, { signal }: FetchJsonOptions = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { signal });

  if (!res.ok) {
    throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status);
  }

  return (await res.json()) as T;
}

export type Profile = { name?: string; bio?: string };
export type Skill = { id?: string | number; name: string };

export function getProjects(opts: FetchJsonOptions = {}) {
  return fetchJson<ApiProject[]>("/api/projects", opts);
}

export function getProfile(opts: FetchJsonOptions = {}) {
  return fetchJson<Profile>("/api/profile", opts);
}

export function getSkills(opts: FetchJsonOptions = {}) {
  return fetchJson<Skill[]>("/api/skills", opts);
}