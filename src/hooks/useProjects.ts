import { useCallback, useEffect, useRef, useState } from "react";
import { getProjects } from "../api/portfolioApi";
import type { ApiProject } from "../types/api-project";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function useProjects() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [status, setStatus] = useState<LoadStatus>("idle");
  const [error, setError] = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError("");

    try {
      const data: ApiProject[] = await getProjects({ signal: controller.signal });
      setProjects(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to load projects");
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [load]);

  return { projects, status, error, reload: load };
}