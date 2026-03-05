import { Link, useLocation } from "react-router"

export default function NotFoundPage() {
    const location = useLocation();

    return (
        <section>
            <h1>404 — Page not found</h1>
            <p>
                No page exists at <code>{location.pathname}</code>.
            </p>

            <p>
                Go back to <Link to="/">Home</Link> or view <Link to="/projects">Projects</Link>.
            </p>
        </section>
    )
}