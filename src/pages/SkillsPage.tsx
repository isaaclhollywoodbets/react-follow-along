import { useSkills } from "../hooks/useSkills";


export default function SkillsPage() {
   const { skills, status: skillsStatus, error: skillsError, reload } = useSkills();

    return (
        <section>
            <h2>Skills</h2>

            {skillsStatus === "loading" && <p>Loading skills...</p>}

            {skillsStatus === "error" && (
                <div>
                    <p>Could not load skills: {skillsError}</p>
                    <button onClick={() => reload()}>Retry skills</button>
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