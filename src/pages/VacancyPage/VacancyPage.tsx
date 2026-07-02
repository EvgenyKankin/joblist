import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import classes from './VacancyPage.module.css';

type VacancyDetails = Vacancy & {
  description: string;
  about_company: string;
};

export const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<VacancyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchVacancy = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(
          `https://kata-jobs.onrender.com/api/jobs/${id}`
        );

        if (!response.ok) {
          throw new Error('Ошибка загрузки вакансии');
        }

        const data = await response.json();
        console.log(data);
        setVacancy(data.job);
      } catch {
        setError('Не удалось загрузить вакансию');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  if (error) return <p>{error}</p>;

  return (
    <div className={classes.wrapper}>
      {isLoading && (
        <div className={classes.loaderOverlay}>
          <Loader size="lg" />
        </div>
      )}

      {vacancy && (
        <>
          <VacancyCard
            vacancy={vacancy}
            compact
            showButtons={false}
          />

          <div className={classes.aboutContainer}>
            <div className={classes.companyContainer}>
              <h2 className={classes.companyTitle}>Компания</h2>
              <p className={classes.companyText}>{vacancy.about_company}</p>
            </div>

            <div className={classes.vacancyContainer}>
              <h3 className={classes.vacancyTitle}>О Вакансии</h3>
              <p className={classes.vacancyText}>{vacancy.description}</p>
            </div>
          </div> 
        </>
      )}

      {!isLoading && !vacancy && <p>Вакансия не найдена</p>}
    </div>
  );
};