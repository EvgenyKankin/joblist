import classes from './NotFoundPage.module.css'
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={classes.notfoundContainer}>
      <div className={classes.notfoundWrapper}>
        <div className={classes.title}>
          <h1 className={classes.notfoundTitle}>Упс! Такой страницы не существует</h1>
          <p className={classes.notfoundText}>Давайте перейдем к началу.</p>
        </div>
        <button
          className={classes.homeButton}
          onClick={() => navigate('/vacancies/moscow')}
        ></button>
      </div>
      <div className={classes.imgContainer}>
        <img className={classes.catImg} alt='cat' src='src\assets\cat.png' />
      </div>
    </div>
  );
}

export default NotFoundPage;