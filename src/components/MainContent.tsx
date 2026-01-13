type MainContentProps = {
  developerName: string;
  role: string;
  stack: string[];
};

function MainContent({ developerName, role, stack }: MainContentProps) {
  const stackList = stack.join(', ');

  return (
    <main>
      <h2>Welcome</h2>
      <p>
        Hi, I&apos;m {developerName}, a {role}.
      </p>
      <p>My current stack: {stackList}</p>
    </main>
  );
}

export default MainContent;