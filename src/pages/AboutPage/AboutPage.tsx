import classes from './AboutPage.module.css'

function AboutPage() {

  return (
    <div className={classes.aboutContainer}>
      <div className={classes.aboutWrapper}>
        <div className={classes.aboutTitle}>
          <h2 className={classes.name}>Евгений Канкин</h2>
          <p className={classes.aboutText}>Привет! Я хочу стать Frontend-разработчиком. Буду писать приложения на React + TypeScript + Redux Toolkit.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;