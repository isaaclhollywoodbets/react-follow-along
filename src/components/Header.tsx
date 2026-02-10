import NavBar from './NavBar'
import ThemeLabel from './ThemeSwitcher';

function Header() {

  return (
    <header>
      <h1>The portfolio</h1>
      <NavBar/>
      <ThemeLabel/>
    </header>
  );
}

export default Header;