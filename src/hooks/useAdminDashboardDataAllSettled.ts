import { useCallback, useEffect, useRef, useState } from "react";
import {
  getProjects,
  getProfile,
  getSkills,
} from "../api/portfolioApi";
import type { ApiProject } from "../types/api-project";

type LoadStatus = "idle" | "loading" | "success" | "error";

type AdminDashboardPanels = {
  projects: {
    status: LoadStatus;
    data: ApiProject[];
    error: string;
  };
  profile: {
    status: LoadStatus;
    data: unknown | null;
    error: string;
  };
  skills: {
    status: LoadStatus;
    data: unknown[];
    error: string;
  };
};

const initialPanels: AdminDashboardPanels = {
  projects: {
    status: "idle",
    data: [],
    error: "",
  },
  profile: {
    status: "idle",
    data: null,
    error: "",
  },
  skills: {
    status: "idle",
    data: [],
    error: "",
  },
};

export function useAdminDashboardDataAllSettled() {
  const [panels, setPanels] = useState<AdminDashboardPanels>(initialPanels);
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setPanels({
      projects: { status: "loading", data: [], error: "" },
      profile: { status: "loading", data: null, error: "" },
      skills: { status: "loading", data: [], error: "" },
    });

    const results = await Promise.allSettled([
      getProjects({ signal: controller.signal }),
      getProfile({ signal: controller.signal }),
      getSkills({ signal: controller.signal }),
    ]);

    if (controller.signal.aborted) return;

    const [projectsResult, profileResult, skillsResult] = results;

    setPanels({
      projects:
        projectsResult.status === "fulfilled"
          ? {
              status: "success",
              data: Array.isArray(projectsResult.value)
                ? projectsResult.value
                : [],
              error: "",
            }
          : {
              status: "error",
              data: [],
              error:
                projectsResult.reason instanceof Error
                  ? projectsResult.reason.message
                  : "Failed to load projects",
            },
      profile:
        profileResult.status === "fulfilled"
          ? {
              status: "success",
              data: profileResult.value ?? null,
              error: "",
            }
          : {
              status: "error",
              data: null,
              error:
                profileResult.reason instanceof Error
                  ? profileResult.reason.message
                  : "Failed to load profile",
            },
      skills:
        skillsResult.status === "fulfilled"
          ? {
              status: "success",
              data: Array.isArray(skillsResult.value) ? skillsResult.value : [],
              error: "",
            }
          : {
              status: "error",
              data: [],
              error:
                skillsResult.reason instanceof Error
                  ? skillsResult.reason.message
                  : "Failed to load skills",
            },
    });
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [load]);

  return {
    ...panels,
    reload: load,
  };
}