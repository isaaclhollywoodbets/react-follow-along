import './App.css'
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path='/' element={<Layout />}>
        {/* Index route = renders at "/" inside <Outlet /> */}
        <Route index element={<HomePage />} />
        <Route path='projects' element={<ProjectsPage />} />
        <Route path='about' element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
