// src/api/portfolioApi.ts
import { API_BASE_URL } from "../config";
import type { ApiProject } from "../types/api-project";
import type { Profile } from "../types/api-profile";
import type { Skill } from "../types/api-tech";

export class ApiError extends Error {
  status?: number;
  url?: string;
  details?: unknown;

  constructor(message: string, opts: { status?: number; url?: string; details?: unknown} = {}) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status;
    this.url = opts.url;
    this.details = opts.details;
  }
}

type FetchJsonOptions = {
  signal?: AbortSignal;
  query?: Record<string, unknown>;
};


function buildUrl(path: string, query?: Record<string, unknown>) {
  const url = new URL(path, API_BASE_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

async function readResponseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  try {
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchJson<T>(path: string, opts: FetchJsonOptions = {}): Promise<T> {
  const url = buildUrl(path, opts.query);
  const res = await fetch(url, {signal: opts.signal});

  if (!res.ok) {
    const details = await readResponseBody(res)
    throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, {
      status: res.status,
      url,
      details
    });
  }

  if (res.status === 204) return null as T
  return (await res.json()) as T;
}


export function getProjects(opts: FetchJsonOptions = {}) {
  return fetchJson<ApiProject[]>("/api/projects", opts);
}

export function getProfile(opts: FetchJsonOptions = {}) {
  return fetchJson<Profile>("/api/profile", opts);
}

export function getSkills(opts: FetchJsonOptions = {}) {
  return fetchJson<Skill[]>("/api/tech", opts);
}
