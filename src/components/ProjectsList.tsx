import ProjectCard from './ProjectCard';
import type { ApiProject } from '../types/api-project';


// type Filter = 'all' | 'featured';

export type ProjectListProps = {
    projects: ApiProject[];
    compact: boolean;
}

function ProjectsList({ projects, compact }: ProjectListProps) {

  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} compact={compact} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
