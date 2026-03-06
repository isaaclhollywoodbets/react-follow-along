import './App.css'
import { Routes, Route } from 'react-router';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact';
import SkillsPage from './pages/SkillsPage';
import NotFoundPage from './pages/NotFoundPage';

import RequireAdmin from './pages/admin/RequireAdmin';
import AdminLayoutPage from './pages/admin/AdminLayout';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';


function App() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path='/' element={<AppLayout />}>
        {/* Index route = renders at "/" inside <Outlet /> */}
        <Route index element={<HomePage />} />
        <Route path='projects' element={<ProjectsPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='skills' element={<SkillsPage />} />
        <Route path='contact' element={<ContactPage />} />

        <Route element={<RequireAdmin />}>
          <Route path='admin' element={<AdminLayoutPage />}>
            <Route index element={<AdminHomePage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>
        </Route>


        {/* catch all route (matches anything) */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
