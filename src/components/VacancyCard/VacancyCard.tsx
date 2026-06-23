import classes from './VacancyCard.module.css';

export type Vacancy = {
  id: number;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  space: "office" | "remote" | "hybrid"
};

type VacancyCardProps = {
  vacancy: Vacancy;
};

function VacancyCard({ vacancy }: VacancyCardProps) {

  return (
    <>
    <p>Карточка вакансии</p>
    {console.log(vacancy)}
    </>
  );
}

export default VacancyCard;