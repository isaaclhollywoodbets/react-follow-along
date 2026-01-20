import FeaturedBadge from "./FeaturedBadge";
import StatusBadge from "./StatusBadge";


type ProjectCardProps = {                                                                                                                    
  id: number;                                                                                                                                
  name: string;                                                                                                                              
  summary: string;                                                                                                                          
  featured: boolean;
  isfinished: boolean;                                                                                                                         
};                                                                                                                                           
                                                                                                                                           
                                                                                                                                             
function ProjectCard({id, name, summary, featured, isfinished}: ProjectCardProps) {                                                                                                                     
                                                                                                                                                                                                                        
  return (
    <>
     <article className="project-card">                                                                                                       
      <h3>{id}</h3> 
      <p>{name}</p>                                                                                                                      
      <p>{summary}</p>                                                                                                               
                                                                                             
    </article>
    <FeaturedBadge isFeatured={featured} />
    <StatusBadge isFinished={isfinished}/>
    </>                                                                                                                                   
   
                                                                                                                               
  );                                                                                                                                         
}                                                                                                                                            
                                                                                                                                             
export default ProjectCard 