import type { Vacancy } from '../../features/vacanciesSlice';

type VacancyCardProps = {
  vacancy: Vacancy;
};

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <div>
      <h3>{vacancy.name}</h3>
      <p>{vacancy.company_name}</p>
      <p>{vacancy.city}</p>
      <p>{vacancy.salary} ₽</p>
      <p>{vacancy.short_description}</p>
    </div>
  );
};