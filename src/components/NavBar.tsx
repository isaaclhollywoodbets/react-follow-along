import { NavLink } from "react-router";

function NavBar() {

    const linkStyle = ({ isActive }: { isActive: boolean}) => ({
        fontWeight: isActive ? "700" : "400",
        textDecoration: "none",
    });

    return (
        <nav style={{ display: "flex", gap: 12 }}>
            <NavLink to="/" end style={linkStyle}>
                Home
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
            </NavLink>
            <NavLink to ="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
            </NavLink>
        </nav>
    )
}

export default NavBar;