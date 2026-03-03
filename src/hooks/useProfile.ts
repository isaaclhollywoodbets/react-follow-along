import { useCallback, useEffect, useRef, useState } from "react";
import { getProfile } from "../api/portfolioApi";
import type { Profile } from "../types/api-profile";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
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
      const data: Profile = await getProfile({ signal: controller.signal });
      setProfile(data ?? null);
      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to load profile");
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [load]);

  return { profile, status, error, reload: load };
}