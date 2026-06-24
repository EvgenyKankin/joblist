import classes from './Header.module.css'

function Header () {

    return (
        <div className={classes.header}>
            <div className={classes.logo}></div>
            <button className={classes.vacanciesButton}></button>
            <button className={classes.aboutButton}></button>
        </div>
    );
}

export default Header;