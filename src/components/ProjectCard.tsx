//4. you can pass any JS value as a prop
type ProjectCardProps = {
    id: number;
    name: string;
    summary?: string;
    featured: boolean;
    tech: string[];
    details: {
        clients: number;
        status: string
    }
}

function ProjectCard({ id, name, summary, featured, tech, details }: ProjectCardProps) {
    return (
        <article>
            <p>ID: {id}</p>
            <h3>
                {name} {featured && '🌟'}
            </h3>
            {/* 6.2 optional chaining and fallback inside JSX */}
            <p>{summary ?? 'No summary yet'}</p>
            <p>Tech: {tech.join(', ')}</p>
            <p>
                Clients: {details.clients} - Status: {details.status}
            </p>
        </article>
    )
}

export default ProjectCard