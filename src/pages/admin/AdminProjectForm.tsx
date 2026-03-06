import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ApiProject } from "../../types/api-project";

type ProjectDraft = {
  name: string;
  summary: string;
  details: string;
  featured: boolean;
  finished: boolean;
  techText: string;
};

const emptyDraft: ProjectDraft = {
  name: "",
  summary: "",
  details: "",
  featured: false,
  finished: false,
  techText: "",
};

function toDraft(project?: ApiProject | null): ProjectDraft {
  return {
    name: project?.name ?? "",
    summary: project?.summary ?? "",
    details: project?.details ?? "",
    featured: !!project?.featured,
    finished: !!project?.finished,
    techText: project?.tech?.join(", ") ?? "",
  };
}

function toApiProjectInput(
  draft: ProjectDraft
): Omit<ApiProject, "id" | "createdAt"> {
  return {
    name: draft.name.trim(),
    summary: draft.summary.trim() || null,
    details: draft.details.trim() || null,
    featured: draft.featured,
    finished: draft.finished,
    tech: draft.techText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

type AdminProjectFormProps = {
  initialValues?: ApiProject | null;
  onSave: (draft: Omit<ApiProject, "id" | "createdAt">) => Promise<void> | void;
  onCancel: () => void;
  onDelete: () => Promise<void> | void;
};

export default function AdminProjectForm({
  initialValues,
  onSave,
  onCancel,
  onDelete,
}: AdminProjectFormProps) {
  const [draft, setDraft] = useState<ProjectDraft>(emptyDraft);
  const [status, setStatus] = useState<
    "idle" | "saving" | "deleting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(toDraft(initialValues));
    setStatus("idle");
    setError(null);
  }, [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const nextValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setDraft((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  }

  const techItems = draft.techText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const nameError = draft.name.trim().length === 0 ? "Name is required" : null;
  const techError = techItems.length === 0 ? "Add at least one tech item" : null;
  const canSubmit = !nameError && !techError && status !== "saving";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("saving");
    setError(null);

    try {
      await onSave(toApiProjectInput(draft));
      setStatus("success");

      if (!initialValues) {
        setDraft(emptyDraft);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setStatus("error");
    }
  }

  async function handleDeleteClick() {
    if (!initialValues) return;

    setStatus("deleting");
    setError(null);

    try {
      await onDelete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={draft.name} onChange={handleChange} />
      </label>
      {nameError ? <p role="alert">{nameError}</p> : null}

      <label>
        Summary
        <textarea
          name="summary"
          value={draft.summary}
          onChange={handleChange}
        />
      </label>

      <label>
        Details
        <textarea
          name="details"
          value={draft.details}
          onChange={handleChange}
        />
      </label>

      <label>
        Tech (comma-separated)
        <input
          name="techText"
          value={draft.techText}
          onChange={handleChange}
          placeholder="react, typescript, css"
        />
      </label>
      {techError ? <p role="alert">{techError}</p> : null}

      {techItems.length > 0 ? (
        <div>
          <p>Tech preview:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {techItems.map((item) => (
              <span
                key={item}
                style={{
                  padding: "4px 8px",
                  border: "1px solid #ccc",
                  borderRadius: 999,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <label>
        <input
          type="checkbox"
          name="featured"
          checked={draft.featured}
          onChange={handleChange}
        />
        Featured
      </label>

      <label>
        <input
          type="checkbox"
          name="finished"
          checked={draft.finished}
          onChange={handleChange}
        />
        Finished
      </label>

      <button type="submit" disabled={!canSubmit || status === "deleting"}>
        {status === "saving"
          ? "Saving..."
          : initialValues
            ? "Save changes"
            : "Create project"}
      </button>

      {initialValues ? (
        <>
          <button
            type="button"
            onClick={onCancel}
            disabled={status === "saving" || status === "deleting"}
          >
            Cancel edit
          </button>

          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={status === "saving" || status === "deleting"}
          >
            {status === "deleting" ? "Deleting..." : "Delete project"}
          </button>
        </>
      ) : null}

      {status === "success" ? <p>Saved successfully.</p> : null}
      {status === "error" ? <p role="alert">{error}</p> : null}
    </form>
  );
}