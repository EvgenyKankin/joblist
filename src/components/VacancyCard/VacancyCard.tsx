import type { Vacancy } from '../../features/vacanciesSlice';
import classes from './VacancyCard.module.css'

type VacancyCardProps = {
  vacancy: Vacancy;
};

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <div className = {classes.cardContainer}>
      <p className={classes.name}>{vacancy.name}</p>
      
      <div className={classes.salary}>
        <p className={classes.cost}>{Number(vacancy.salary).toLocaleString('ru-RU')} ₽</p>
        <p className={classes.expirience}>{vacancy.experience}</p>
      </div>
      
      <p className={classes.companyName}>{vacancy.company_name}</p>
      
      <div className={classes.badge}>
        {(vacancy.space==="remote") && (<div className={classes.remoteBadge}></div>)}
        {(vacancy.space==="hybrid") && (<div className={classes.hybridBadge}></div>)}
        {(vacancy.space==="office") && (<div className={classes.officeBadge}></div>)}
      </div>

      <p className={classes.city}>{vacancy.city}</p>
      
      <div className={classes.buttonContainer}>
        <button className={classes.moreButton}></button>
        <button className={classes.feedbackButton}></button>
      </div>
    </div>
  );
};