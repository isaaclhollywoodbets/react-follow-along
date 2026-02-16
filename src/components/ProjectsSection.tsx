// src/components/ProjectsSection.tsx
import { useState } from 'react';
import { projects as initialProjects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectsList from './ProjectsList';
import AddProjectForm from './AddProjectForm';

function ProjectsSection() {
    const [projectList, setProjectList] = useState<Project[]>(initialProjects);
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    function handleAddProject(newProject: Project) {
        setProjectList(prevProjects => [...prevProjects, newProject]);
    }

    function handleToggleFeatured(id: number) {
        setProjectList(prevProjects =>
            prevProjects.map(project =>
                project.id === id
                    ? { ...project, featured: !project.featured }
                    : project
            )
        );
    }

    function handleRemoveProject(id: number) {
        setProjectList(prevProjects =>
            prevProjects.filter(project => project.id !== id)
        );
    }

    function handleRenameProject(id: number, newName: string) {
        setProjectList(prevProjects =>
            prevProjects.map(project =>
                project.id === id
                    ? { ...project, name: newName }
                    : project
            )
        )
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();

    // const visibleProjects = showFeaturedOnly
    //     ? projectList.filter(project => project.featured)
    //     : projectList;

    const visibleProjects = projectList.filter(project => {
        if (showFeaturedOnly && !project.featured) return false;
        if (!normalizedSearch) return true;

        const inName = project.name.toLowerCase().includes(normalizedSearch);
        const inSummary = project.summary.toLowerCase().includes(normalizedSearch);
        const inTech = project.tech.join(' ').toLowerCase().includes(normalizedSearch);

        return inName || inSummary || inTech;
    });

    return (
        <section>
            <h2>Projects</h2>

            <div>
                <label htmlFor="project-search">Search</label>
                <input
                    id="project-search"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="Search by name, summary, or tech"
                />
            </div>

            <label>
                <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={event => setShowFeaturedOnly(event.target.checked)}
                />
                Show only featured
            </label>
            <AddProjectForm onAddProject={handleAddProject} />
            <br />
            <ProjectsList
                projects={visibleProjects}
                onToggleFeatured={handleToggleFeatured}
                onRemoveProject={handleRemoveProject}
                onRenameProject={handleRenameProject} />
        </section>
    );
}

export default ProjectsSection;