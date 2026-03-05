import NavBar from './NavBar'
import ThemeLabel from './ThemeSwitcher';
import { useSettings, useSettingsDispatch } from '../context/SettingsContext';
import {
  resetSettings,
  setShowFeaturedOnly,
  setSortOrder,
  toggleCompactMode
} from "../context/settingsActions"


function Header() {
  const { showFeaturedOnly, sortOrder, compactMode } = useSettings();
  const dispatch = useSettingsDispatch();

  return (
    <header>
      <h1>The portfolio</h1>
      <NavBar />
      <ThemeLabel />
      <label style={{ marginLeft: 12 }}>
        <input
          type="checkbox"
          checked={showFeaturedOnly}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setShowFeaturedOnly(e.target.checked))}
        />
        {" "}Show featured only
      </label>

      <label style={{ marginLeft: 12 }}>
        Sort:{" "}
        <select
          value={sortOrder}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(setSortOrder(e.target.value as "name" | "newest"))}
        >
          <option value="name">Name</option>
          <option value="newest">Newest</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={compactMode}
          onChange={() => dispatch(toggleCompactMode())}
        />
        {" "}Compact mode
      </label>

      <button style={{ marginLeft: 12}} onClick={() => dispatch(resetSettings())}>
        Reset
      </button>
    </header>
  );
}

export default Header;