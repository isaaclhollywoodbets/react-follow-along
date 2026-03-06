import { Link, Outlet, NavLink } from "react-router";
import { useSettings } from "../../context/SettingsContext";

export default function AdminLayoutPage() {
    const { isAdminMode } = useSettings();

    if (!isAdminMode) {
        return (
            <section>
                <h1>Admin</h1>
                <p>Admin mode is off, so admin tools are hidden right now.</p>
                <Link to="/">Back to home</Link>
            </section>
        );
    }

    return (
        <section>
            <h1>Admin</h1>

            <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <NavLink to="/admin" end>Dashboard</NavLink>
                <NavLink to="/admin/projects">Projects</NavLink>
                <NavLink to="/admin/profile">Profile</NavLink>
            </nav>

            <Outlet />
        </section>
    );
}