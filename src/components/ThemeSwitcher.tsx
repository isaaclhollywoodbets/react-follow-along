import { useState } from 'react';

function ThemeLabel() {
const [isDarkMode, setIsDarkMode] = useState(false);

function handleToggle() {
  setIsDarkMode(prev => !prev);
}

return (
  <div>
    <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
    <button type="button" onClick={handleToggle}>
      Switch to {isDarkMode ? 'Light' : 'Dark'}
    </button>
  </div>
);
}

export default ThemeLabel
