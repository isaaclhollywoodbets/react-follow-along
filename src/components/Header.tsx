import NavBar from './NavBar'
import ThemeLabel from './ThemeSwitcher';
import { useSettings } from '../context/SettingsContext';

function Header() {
  const {showFeaturedOnly, setShowFeaturedOnly, sortOrder, setSortOrder} = useSettings();

  return (
    <header>
      <h1>The portfolio</h1>
      <NavBar/>
      <ThemeLabel/>
      <label style={{ marginLeft: 12 }}>
        <input
          type="checkbox"
          checked={showFeaturedOnly}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setShowFeaturedOnly(e.target.checked)
          }
        />
        {" "}Show featured only
      </label>

      <label style={{ marginLeft: 12 }}>
        Sort:{" "}
        <select
          value={sortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortOrder(e.target.value as "name" | "newest")
          }
        >
          <option value="name">Name</option>
          <option value="newest">Newest</option>
        </select>
      </label>
    </header>
  );
}

export default Header;