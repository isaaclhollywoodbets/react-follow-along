import ProjectCard from "./ProjectCard";

function MainContent() {

  return (
    <main>
      <h2>Welcome</h2>
      <ProjectCard id={1} name="The first Project" summary="The summary" featured={true} isfinished={false}/>

    </main>
  );
}

export default MainContent;