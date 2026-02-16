import ProjectCard from './ProjectCard';
import type { Project } from '../data/projects';

type ProjectListProps = {
    
    projects: Project[];
    onToggleFeatured: (id: number) => void
    onRemoveProject: (id: number) => void
    onRenameProject: (id: number, newName: string) => void
}

function ProjectsList({
  projects, 
  onToggleFeatured,
  onRemoveProject,
  onRenameProject }: ProjectListProps) {

  return (
    <section>
       <ul className="projects-list">
        {projects.map(project => (
          <li key={project.id}>
            <ProjectCard 
            project={project} 
            onToggleFeatured={onToggleFeatured}
            onRemoveProject={onRemoveProject}
            onRenameProject={onRenameProject}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsList;
