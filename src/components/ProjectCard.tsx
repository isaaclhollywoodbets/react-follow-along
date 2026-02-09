import FeaturedBadge from "./FeaturedBadge";
import StatusBadge from "./StatusBadge";


type ProjectCardProps = {                                                                                                                    
  id: number;                                                                                                                                
  name: string;                                                                                                                              
  summary: string;                                                                                                                          
  featured: boolean;
  isfinished: boolean;
  onSelect: (id: number) => void;                                                                                                                         
};                                                                                                                                           
                                                                                                                                           
                                                                                                                                             
function ProjectCard({id, name, summary, featured, isfinished, onSelect}: ProjectCardProps) {                                                                                                                     
                                                                                                                                                                                                                        
  return (
    <>
     <article className="project-card">                                                                                                       
      <h3>{id}</h3> 
      <p>{name}</p>                                                                                                                      
      <p>{summary}</p>                                                                                                               
                                                                                             
    </article>
    <FeaturedBadge isFeatured={featured} />
    <StatusBadge isFinished={isfinished}/>
    <button type="button" onClick={() => onSelect(id)}>
      View Details
    </button>
    </>                                                                                                                                   
   
                                                                                                                               
  );                                                                                                                                         
}                                                                                                                                            
                                                                                                                                             
export default ProjectCard 