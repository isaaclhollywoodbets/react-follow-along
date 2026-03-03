import ProjectCard from './ProjectCard';
import type { ApiProject } from '../types/api-project';


// type Filter = 'all' | 'featured';

export type ProjectListProps = {
    projects: ApiProject[];
}

function ProjectsList({ projects }: ProjectListProps) {

  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
