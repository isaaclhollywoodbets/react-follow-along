// src/components/ProjectsList.tsx
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function ProjectsList() {
    const handleSelectProject = (id: number) => {
        console.log('Selected Project:', id)
    };

  return (
    <section className='projects-section'>
      <h2>Projects</h2>
      <ul className='projects-list'>
        {projects.map(project => (
          <li key={project.id}>
           <ProjectCard project={project} onSelect={handleSelectProject}/>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsList;