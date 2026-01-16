// src/components/ProjectCard.tsx
import type { Project } from '../data/projects';

type ProjectCardProps = {
  project: Project;
  onSelect?: (id: number) => void;
};

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { id, name, summary, tech, featured } = project;
  const techList = tech.join(', ');

  const handleClick = () => {
    if (onSelect) onSelect(id);
  }

  return (
    <article className="project-card">
      <h3>
        {name} {featured && '🌟'}
      </h3>
      <p>{summary}</p>
      <p>
        <strong>Tech:</strong> {techList}
      </p>
      <button type='button' onClick={handleClick}>
        View Details
      </button>
    </article>
  );
}

export default ProjectCard;