import './App.css';
import Header from './components/Header/Header';
import './reset.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobList from './components/JobList/JobList';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
        <Route path="/vacancies/moscow" element={<JobList />} />
        <Route path="/vacancies/petersburg" element={<JobList />} />
        <Route path="/vacancy/:id" element={<VacancyPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;