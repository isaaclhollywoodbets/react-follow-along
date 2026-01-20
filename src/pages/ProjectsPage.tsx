import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  return (
    <>
      <h2>Projects</h2>
       <ProjectCard id={1} name="The first Project" summary="The summary" featured={true} isfinished={false}/>
    </>
  );
}


