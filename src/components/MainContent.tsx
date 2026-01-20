import Greeting from './Greeting'
import ProjectCard from './ProjectCard'
import Avatar from './Avatar';

type MainContentProps = {
  developerName: string;
  role: string;
  stack: string[];
};

function MainContent({ developerName, role, stack }: MainContentProps) {
  developerName = "Isaac";
  role = "dev";
  stack = ["C#", "React"]
  const stackList = stack.join(', ');

  return (
    <main>
      <h2>Welcome</h2>
      <Avatar name='user'/>
      <p>
        Hi, I&apos;m {developerName}, a {role}.
      </p>
      <p>My current stack: {stackList}</p>
      <br/>
      <Greeting name="Isaac"/>
      <ProjectCard
        id={1}
        name="Payments API"
        summary='hello this is the summary'
        featured={true}
        tech={['C#', 'SQL']}
        details={{clients: 4, status: 'active'}}/>
    </main>
  );
}

export default MainContent;