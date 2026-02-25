import { useState } from 'react';
import ProjectCard from './ProjectCard';
import type { ApiProject } from '../types/api-project';


// type Filter = 'all' | 'featured';

export type ProjectListProps = {
    projects: ApiProject[];
    filter?: 'all' | 'featured';
}

function ProjectsList({ projects, filter = 'all' }: ProjectListProps) {
  const [activefilter, setActiveFilter] = useState(filter);

  const visibleProjects =
    activefilter === 'featured'
      ? projects.filter(p => p.featured)
      : projects;

  return (
    <section>
      <h2>Projects</h2>

      <div className="filter-row">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>

        <button
          type="button"
          className={filter === 'featured' ? 'active' : ''}
          onClick={() => setActiveFilter('featured')}
        >
          Featured
        </button>
      </div>

      <p className="muted">
        Showing {visibleProjects.length} of {projects.length}
      </p>

      <div className="projects-grid">
        {visibleProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
