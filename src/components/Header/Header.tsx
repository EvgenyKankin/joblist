import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css'

function Header() {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div className={classes.logo}></div>

      <button
        className={classes.vacanciesButton}
        onClick={() => navigate('/vacancies')}
      />

      <button className={classes.aboutButton}></button>
    </div>
  );
}

export default Header;