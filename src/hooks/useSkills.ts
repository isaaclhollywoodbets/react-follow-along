import { useCallback, useEffect, useRef, useState } from "react";
import { getSkills } from "../api/portfolioApi";
import type { Skill } from "../types/api-tech";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
      const data: Skill[] = await getSkills({ signal: controller.signal });
      setSkills(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to load skills");
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [load]);

  return { skills, status, error, reload: load };
}