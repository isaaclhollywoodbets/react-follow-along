import { NavLink, Outlet } from "react-router";

const linkStyle = ({ isActive }: any) => ({
  fontWeight: isActive ? "700" : "400",
  textDecoration: "none",
});

 function Layout() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h1 style={{ margin: 0, marginRight: 16, fontSize: 20 }}>
          The Portfolio
        </h1>

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
      </header>

      <main style={{ marginTop: 16 }}>
        {/* Route content renders here */}
        <Outlet />
      </main>

      <footer style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;