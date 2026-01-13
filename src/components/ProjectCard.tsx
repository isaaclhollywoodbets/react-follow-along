type Project = {                                                                                                                    
  id: number;                                                                                                                                
  name: string;                                                                                                                              
  summary: string;                                                                                                                           
  featured: boolean;                                                                                                                         
};                                                                                                                                           
                                                                                                                                             
const project: Project = {                                                                                                                   
  id: 1,                                                                                                                                     
  name: "Portfolio",                                                                                                                         
  summary: "Personal portfolio built with React.",                                                                                           
  featured: true,                                                                                                                            
};                                                                                                                                           
                                                                                                                                             
function ProjectCard() {                                                                                                                     
  const techList = ["React", "TypeScript", "Vite"];                                                                                          
  const title = `${project.name} (${techList.join(", ")})`;                                                                              
                                                                                                                                             
  return (                                                                                                                                   
    <article className="project-card">                                                                                                       
      <h3>{title}</h3>                                                                                                                       
      <p>{project.summary}</p>                                                                                                               
      {project.featured && <p>Featured project</p>}                                                                                          
    </article>                                                                                                                               
  );                                                                                                                                         
}                                                                                                                                            
                                                                                                                                             
export default ProjectCard 