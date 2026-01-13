function MainContent() {
    const developerName = 'My Name';
  const role = 'Full-stack developer';
  const stack = ['C#', 'SQL', 'React'];

  const stackList = stack.join(", ")

  return (
    <main>
      <h2>Welcome</h2>
      <p>
        Hi, I'm {developerName}, a {role}.
      </p>
      <p>My current stack: {stackList}</p>
    </main>
  );
}

export default MainContent;