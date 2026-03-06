import { useCallback, useEffect, useRef, useState } from "react";
import { getProjects, getProfile, getSkills } from "../api/portfolioApi";
import type { ApiProject } from "../types/api-project";

type LoadStatus = "idle" | "loading" | "success" | "error";

type AdminDashboardData = {
  projects: ApiProject[];
  profile: unknown | null;
  skills: unknown[];
};

export function useAdminDashboardData() {
  const [status, setStatus] = useState<LoadStatus>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminDashboardData>({
    projects: [],
    profile: null,
    skills: [],
  });

  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError("");

    try {
      const [projects, profile, skills] = await Promise.all([
        getProjects({ signal: controller.signal }),
        getProfile({ signal: controller.signal }),
        getSkills({ signal: controller.signal }),
      ]);

      setData({
        projects: Array.isArray(projects) ? projects : [],
        profile: profile ?? null,
        skills: Array.isArray(skills) ? skills : [],
      });
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [load]);

  return {
    ...data,
    status,
    error,
    reload: load,
  };
}