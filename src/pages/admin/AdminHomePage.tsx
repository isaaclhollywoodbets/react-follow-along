// import { useAdminDashboardData } from "../../hooks/useAdminDashboardData"

// export default function AdminHomePage() {
//     const { projects, profile, skills, status, error, reload } = useAdminDashboardData();

//     if (status === "loading") return <p>Loading dashboard...</p>;

//     if (status === "error") {
//         return (
//             <section>
//                 <p>Could not load dashboard: {error}</p>
//                 <button onClick={reload}>Retry</button>
//             </section>
//         );
//     }

//     return (
//         <main>
//             <h1>Admin dashboard</h1>
//             <p>Projects: {projects.length}</p>
//             <p>Skills: {skills.length}</p>
//             <p>Profile loaded: {profile ? "Yes" : "No"}</p>
//         </main>
//     )
// }

import { useAdminDashboardDataAllSettled } from "../../hooks/useAdminDashboardDataAllSettled";

export default function AdminDashboardPage() {
  const { projects, profile, skills, reload } = useAdminDashboardDataAllSettled();

  return (
    <main>
      <h1>Admin dashboard</h1>
      <button onClick={reload}>Reload all panels</button>

      <section>
        <h2>Projects</h2>
        {projects.status === "loading" ? <p>Loading projects...</p> : null}
        {projects.status === "error" ? (
          <p>Could not load projects: {projects.error}</p>
        ) : null}
        {projects.status === "success" ? <p>Projects: {projects.data.length}</p> : null}
      </section>

      <section>
        <h2>Profile</h2>
        {profile.status === "loading" ? <p>Loading profile...</p> : null}
        {profile.status === "error" ? (
          <p>Could not load profile: {profile.error}</p>
        ) : null}
        {profile.status === "success" ? (
          <p>Profile loaded: {profile.data ? "Yes" : "No"}</p>
        ) : null}
      </section>

      <section>
        <h2>Skills</h2>
        {skills.status === "loading" ? <p>Loading skills...</p> : null}
        {skills.status === "error" ? (
          <p>Could not load skills: {skills.error}</p>
        ) : null}
        {skills.status === "success" ? <p>Skills: {skills.data.length}</p> : null}
      </section>
    </main>
  );
}