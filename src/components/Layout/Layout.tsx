import { NavLink, Outlet } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
import classes from './Layout.module.css'

const setVacanciesLinkActive: NavLinkProps["className"] = ({ isActive }) =>
  isActive ? classes.vacanciesButtonActive : classes.vacanciesButton;

const setAboutLinkActive: NavLinkProps["className"] = ({ isActive }) =>
  isActive ? classes.aboutButtonActive : classes.aboutButton;

function Layout () {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}></div>

                <NavLink to='/vacancies' className={setVacanciesLinkActive}/>

                <NavLink to='/about'  className={setAboutLinkActive}/>
            </header>

            <Outlet />
        </>
    )
}

export default Layout;