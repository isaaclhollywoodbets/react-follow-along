import './App.css'
import { Routes, Route } from 'react-router';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact';
import SkillsPage from './pages/SkillsPage';
import AdminPage from './pages/admin/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path='/' element={<AppLayout />}>
        {/* Index route = renders at "/" inside <Outlet /> */}
        <Route index element={<HomePage />} />
        <Route path='projects' element={<ProjectsPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='skills' element={<SkillsPage/>}/>
        <Route path='contact' element={<ContactPage/>}/>
        <Route path='admin' element={<AdminPage/>}/>

        {/* catch all route (matches anything) */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
