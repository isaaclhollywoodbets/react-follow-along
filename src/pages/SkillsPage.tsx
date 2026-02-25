import { useEffect, useState } from "react";
import { getSkills } from "../api/portfolioApi";
import type { Skill } from "../types/api-tech";

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillsStatus, setSkillsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [skillsError, setSkillsError] = useState("");

    async function loadSkills({ signal }: { signal?: AbortSignal } = {}) {
        setSkillsStatus("loading");
        setSkillsError("");

        try {
            const data = await getSkills({ signal });
            setSkills(Array.isArray(data) ? data : []);
            setSkillsStatus("success");
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === "AbortError") return;
            setSkillsStatus("error");
            setSkillsError(err instanceof Error ? err.message : "Failed to load skills");
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        loadSkills({ signal: controller.signal });
        return () => controller.abort();
    }, []);

    return (
        <section>
            <h2>Skills</h2>

            {skillsStatus === "loading" && <p>Loading skills...</p>}

            {skillsStatus === "error" && (
                <div>
                    <p>Could not load skills: {skillsError}</p>
                    <button onClick={() => loadSkills()}>Retry skills</button>
                </div>
            )}

            {skillsStatus === "success" && (
                skills.length === 0 ? <p>No skills yet.</p> : (
                    <ul>
                        {skills.map((s) => (
                            <li key={s.id ?? s.name}>{s.name ?? String(s)}</li>
                        ))}
                    </ul>
                )
            )}
        </section>
    );
}