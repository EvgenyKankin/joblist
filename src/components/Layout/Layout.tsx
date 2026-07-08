import { Outlet } from "react-router-dom";
import classes from './Layout.module.css'
import CustomLink from "../CustomLink/CustomLink";

function Layout () {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}></div>

                <CustomLink
                    to='/vacancies'
                    className={classes.vacanciesButton}
                    activeClassName={classes.vacanciesButtonActive}
                />

                <CustomLink
                    to='/about' 
                    className={classes.aboutButton}
                    activeClassName={classes.aboutButtonActive}
                />
            </header>

            <Outlet />
        </>
    )
}

export default Layout;