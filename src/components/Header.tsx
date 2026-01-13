function Header() {
  const title = 'My React Portfolio';
  const subtitle = 'Full-stack dev learning React';

  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;