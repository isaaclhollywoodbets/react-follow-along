import { useState } from "react";
import FeaturedBadge from "./FeaturedBadge";
import StatusBadge from "./StatusBadge";
import LikeButton from "./LikeButton";
import type { ApiProject } from "../types/api-project";


type ProjectCardProps = {
  project: ApiProject;
};


function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = Boolean(project.details?.trim());
  const techList = project.tech?.length ? project.tech.join(', ') : 'N/A';


  function handleToggleDetails() {
    setIsExpanded(prev => !prev)
  }

  return (
    <>
      <article className="project-card">
        <h3>{project.name}</h3>
        <FeaturedBadge isFeatured={project.featured} />
        <p>{project.summary ?? 'No summary yet.'}</p>


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

        {hasDetails && (
          <button type="button" onClick={handleToggleDetails}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </article>
    </>


  );
}

export default ProjectCard 
