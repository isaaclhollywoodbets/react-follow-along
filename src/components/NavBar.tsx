import { NavLink } from "react-router";

function NavBar() {

    return (
        <nav style={{ display: "flex", gap: 12 }}>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Home
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
            </NavLink>
            <NavLink to="/skills" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Skills
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Admin
            </NavLink>
        </nav>
    )
}

export default NavBar;