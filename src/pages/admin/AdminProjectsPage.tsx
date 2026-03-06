import { useMemo, useState } from "react";
import ControlledWarmup from "../../components/ControlledWarmup";
import type { ApiProject } from "../../types/api-project";
import AdminProjectForm from "./AdminProjectForm";

const sampleProjects: ApiProject[] = [
    {
        id: 1,
        createdAt: Date.now(),
        name: "Portfolio API",
        summary: "C# backend for portfolio content",
        featured: true,
        finished: true,
        details: "Admin-editable project used as a starter example.",
        tech: ["c#", ".net", "sql"],
    },
];

export default function AdminProjectsPage() {
    const [projects] = useState(sampleProjects);
    const [editingId, setEditingId] = useState<number | null>(null);


    const selectedProject = useMemo(
        () => projects.find((project) => project.id === editingId) ?? null,
        [projects, editingId]
    );


    async function handleSave(draft: Omit<ApiProject, "id" | "createdAt">) {
        console.log("Save this draft later:", draft)
    }
    return (
        <section>
            <p>Admin projects (create/edit form goes here).</p>
            <ControlledWarmup />
            <button type="button" onClick={() => setEditingId(1)}>
                Edit sample project
            </button>
            <AdminProjectForm initialValues={selectedProject} onSave={handleSave} />

        </section>

    )
}