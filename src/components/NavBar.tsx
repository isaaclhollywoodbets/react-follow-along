import { NavLink } from "react-router";

function NavBar() {

    const linkStyle = ({ isActive }: any) => ({
        fontWeight: isActive ? "700" : "400",
        textDecoration: "none",
    });

    return (
        <nav style={{ display: "flex", gap: 12 }}>
            <NavLink to="/" end style={linkStyle}>
                Home
            </NavLink>
            <NavLink to="/projects" style={linkStyle}>
                Projects
            </NavLink>
            <NavLink to="/about" style={linkStyle}>
                About
            </NavLink>
        </nav>
    )
}

export default NavBar;