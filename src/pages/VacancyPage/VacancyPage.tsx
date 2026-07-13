import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { fetchVacancy } from '../../features/vacancySlice';
import classes from './VacancyPage.module.css';

export const VacancyPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { vacancy, isLoading, error, isNotFound } = useAppSelector(
    (state) => state.vacancy
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchVacancy(id));
    }
  }, [id, dispatch]);

  if (isNotFound) {
    return <Navigate to="/404" replace />;
  }

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
              <p className={classes.companyText}>
                {vacancy.about_company}
              </p>
            </div>

            <div className={classes.vacancyContainer}>
              <h3 className={classes.vacancyTitle}>О Вакансии</h3>
              <p className={classes.vacancyText}>
                {vacancy.description}
              </p>
            </div>
          </div>
        </>
      )}

      {!isLoading && !vacancy && <p>Вакансия не найдена</p>}
    </div>
  );
};