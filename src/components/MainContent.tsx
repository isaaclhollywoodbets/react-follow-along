import ProjectCard from "./ProjectCard";

function MainContent() {
  const developerName = 'My Name';
  const role = 'Full-stack developer';
  const stack = ['C#', 'SQL', 'React'];
  const isLookingForWork = false;

  const stackList = stack.join(", ")

  // ternary operator true or false (if X true) ? (do A) :(else) (do B)
  function FeaturedBage({ isFeatured }: { isFeatured: boolean}){
    return (
      <p>
        {isFeatured ? "☀️ Featured Project" : "Regular Project"}
      </p>
    )
  }

  return (
    <main>
      <h2>Welcome</h2>
      <ProjectCard/>
      <p>
        Hi, I'm {developerName}, a {role}.
      </p>
      <p>My current stack: {stackList}</p>
      {/* render only if true */}
      {isLookingForWork && <p>Available for new opportunities</p>}
     
      <FeaturedBage isFeatured/>
      <FeaturedBage isFeatured={false}/>
    </main>
  );
}

export default MainContent;