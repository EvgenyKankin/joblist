import './App.css'
import Header from './components/Header/Header'
import './reset.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import JobList from './components/JobList/JobList';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/vacancies" />} />
        <Route path="/vacancies" element={<JobList />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Routes>
    </>
  )
}

export default App
