import ProjectsList from '../components/ProjectsList'

export default function ProjectsPage() {
  const handleSelectProject = (id: number) => {
    alert(`Selected project', ${id}`)
  }
  return (
    <>
      <h2>Projects</h2>
      {/* {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={handleSelectProject} />
      ))} */}
      <ProjectsList onSelect={handleSelectProject} />

    </>
  );
}
