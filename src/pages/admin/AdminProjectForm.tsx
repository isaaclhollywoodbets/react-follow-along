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

function toApiProjectInput(draft: ProjectDraft) {
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
    onSave: (
        project: Omit<ApiProject, "id" | "createdAt">
    ) => Promise<void> | void;
};

export default function AdminProjectForm({
    initialValues,
    onSave,
}: AdminProjectFormProps) {
    const [draft, setDraft] = useState<ProjectDraft>(emptyDraft);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDraft(toDraft(initialValues));
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

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setStatus("saving");
        setError(null);

        try {
            await onSave(toApiProjectInput(draft));
            setStatus("success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Save failed");
            setStatus("error");
        }
    }

    const techItems = draft.techText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const nameError = draft.name.trim().length === 0 ? "Name is required" : null;
    const techError = techItems.length === 0 ? "Add at least one tech item" : null;
    const canSubmit = !nameError && !techError && status !== "saving";

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input name="name" value={draft.name} onChange={handleChange} />
            </label>

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
                />
                {techError ? <p role="alert">{techError}</p> : null}
            </label>
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

            <button type="submit" disabled={!canSubmit}>
                {status === "saving" ? "Saving..." : "Save Project"}
            </button>

            {status === "success" ? <p>Saved successfully.</p> : null}
            {status === "error" ? <p role="alert">{error}</p> : null}
        </form>
    );
}