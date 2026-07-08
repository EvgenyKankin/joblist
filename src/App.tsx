import './App.css';
import './reset.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobList from './components/JobList/JobList';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="vacancies/moscow" element={<JobList />} />
          <Route path="vacancies/petersburg" element={<JobList />} />
          <Route path="vacancy/:id" element={<VacancyPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;