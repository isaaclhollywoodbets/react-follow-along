import NavBar from './NavBar'
import ThemeLabel from './ThemeSwitcher';
import { useSettings, useSettingsDispatch } from '../context/SettingsContext';

function Header() {
  const {showFeaturedOnly, sortOrder} = useSettings();
  const dispatch = useSettingsDispatch();

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
            dispatch({ 
              type: "set_show_featured_only", 
              value: e.target.checked,
            })
          }
        />
        {" "}Show featured only
      </label>

      <label style={{ marginLeft: 12 }}>
        Sort:{" "}
        <select
          value={sortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch({
              type: "set_sort_order",
              sortOrder: e.target.value as "name" | "newest"
            })
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