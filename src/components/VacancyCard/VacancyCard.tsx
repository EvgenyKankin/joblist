import { useNavigate } from 'react-router-dom';
import classes from './VacancyCard.module.css';

type VacancyCardProps = {
  vacancy: Vacancy;
  compact?: boolean;
  showButtons?: boolean;
};

export const VacancyCard = ({ vacancy, compact=false, showButtons=true }: VacancyCardProps) => {
  //console.log(vacancy);
  const navigate = useNavigate();

  return (
    <div className={`${classes.cardContainer} ${compact ? classes.compact : ''}`}>
      <p className={classes.name}>{vacancy.name}</p>

      <div className={classes.salary}>
        <p className={classes.cost}>
          {Number(vacancy.salary).toLocaleString('ru-RU')} ₽
        </p>
        <p className={classes.expirience}>{vacancy.experience}</p>
      </div>

      <p className={classes.companyName}>{vacancy.company_name}</p>

      <div className={classes.badge}>
        {vacancy.space === 'remote' && (
          <div className={classes.remoteBadge}></div>
        )}

        {vacancy.space === 'hybrid' && (
          <div className={classes.hybridBadge}></div>
        )}

        {vacancy.space === 'office' && (
          <div className={classes.officeBadge}></div>
        )}
      </div>

      <p className={classes.city}>{vacancy.city}</p>

      {showButtons && (
        <div className={classes.buttonContainer}>
          <button
            className={classes.moreButton}
            onClick={() => navigate(`/vacancies/${vacancy.id}`)}
          >
          </button>

          <button className={classes.feedbackButton}>
          </button>
        </div>
      )}
    </div>
  );
};