import { useEffect, useState } from 'react';
import { Pagination, Stack, TextInput,  Select } from '@mantine/core';
import { SkillsFilter } from '../SkillsFilter/SkillsFilter';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { fetchVacancies, selectVacanciesState } from '../../features/vacanciesSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

const initialSkills = ['JavaScript', 'React', 'Redux', 'Python'];

export const JobList = () => {
  const dispatch = useAppDispatch();
  const { vacancies, pagination, isLoading, error } =
    useAppSelector(selectVacanciesState);

  const [page, setPage] = useState(1);
  const [skills, setSkills] = useState(initialSkills);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [city, setCity] = useState('Все города');

  useEffect(() => {
    const timer = setTimeout(() => {setDebouncedSearch(search);}, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(fetchVacancies({ page, skills, search, city }));
  }, [dispatch, page, skills, debouncedSearch, city]);

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
    setPage(1);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Stack>
      <SkillsFilter
        skills={skills}
        onChange={handleSkillsChange}
      />

      <Select
        label="Город"
        value={city}
        onChange={(value) => {
            setCity(value ?? 'Все города');
            setPage(1);
        }}
        data={[
            'Все города',
            'Москва',
            'Санкт-Петербург',
        ]}
      />

      <TextInput
        label="Поиск вакансий"
        placeholder="Должность или название компании"
        value={search}
        onChange={(event) => {
            setSearch(event.currentTarget.value);
            setPage(1);
        }}
      />

      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          vacancy={vacancy}
        />
      ))}

      {pagination && (
        <Pagination
          value={page}
          onChange={setPage}
          total={pagination.totalPages}
        />
      )}
    </Stack>
  );
};

export default JobList;

/*import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { fetchVacancies, selectVacanciesState } from '../../features/vacanciesSlice';
import { Pagination } from '@mantine/core';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { SkillsFilter } from '../SkillsFilter/SkillsFilter';

const JobList = () => {
  const dispatch = useAppDispatch();
  const { vacancies, pagination, isLoading, error } =
    useAppSelector(selectVacanciesState);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchVacancies(page));
  }, [dispatch, page]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Stack>
      <SkillsFilter
        skills={skills}
        onChange={handleSkillsChange}
      />

      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          vacancy={vacancy}
        />
      ))}

      {pagination && (
        <Pagination
          value={page}
          onChange={setPage}
          total={pagination.totalPages}
        />
      )}
    </Stack>
  );
};

export default JobList;
*/