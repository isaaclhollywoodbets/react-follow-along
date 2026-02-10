import { useState } from "react";
import FeaturedBadge from "./FeaturedBadge";
import StatusBadge from "./StatusBadge";
import LikeButton from "./LikeButton";
import type { Project } from '../data/projects';


type ProjectCardProps = {
  project: Project;
  onSelect?: (id: number) => void;
};


function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = Boolean(project.details?.trim());
  const techList = project.tech.join(', ');

  function handleToggleDetails() {
    setIsExpanded(prev => !prev)
  }

  const handleClick = () => {
    onSelect?.(project.id);
    handleToggleDetails();
  }

  return (
    <>
      <article className="project-card">
        <h3>{project.name}</h3>
        <FeaturedBadge isFeatured={project.featured} />
        <p>{project.summary}</p>

        {
          hasDetails && isExpanded && (
            <p>
              More Details: {project.details}
            </p>
          )}

        <p><strong>Tech:</strong> {techList} </p>

        <StatusBadge isFinished={project.finished} />

        <div className="project-card__actions">
          <LikeButton />
        </div>





        <button type="button" onClick={() => onSelect?.(project.id)}>
          View Project ID
        </button>
        {hasDetails && (
          <button type="button" onClick={handleToggleDetails}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
        <button type="button" onClick={handleClick}>
          View & Toggle
        </button>
      </article>
    </>


  );
}

export default ProjectCard 
