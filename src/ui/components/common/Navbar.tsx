import React from 'react';
import {Link, Navigate, NavLink} from 'react-router-dom';
import {PATH} from "../../router/Routes";
import styles from '../../styles/Navbar.module.scss'
import {ReactSVG} from "react-svg";
import packs from '../../images/icons/packs.svg'
import profile from '../../images/icons/profile.svg'
import learn from '../../images/icons/learn.svg'
import {useDispatch} from "react-redux";
import {authStatuses, logOutUser} from '../../../bll/auth-reducer';
import {useAppSelector} from "../../../bll/store";
import {MenuBurger} from "./MenuBurger";
import logoLight from "../../images/logo-light.svg"
import logoDark from "../../images/logo-dark.svg"
import logout from "../../images/icons/logout.svg"
import {ThemeButton} from "./ThemeButton";
import {ThemeT} from "../../../bll/app-reducer";


export const Navbar = () => {
   const dispatch = useDispatch()
   const LogOut = () => dispatch(logOutUser())

   const theme = useAppSelector<ThemeT>(state => state.app.theme)
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   const logo = theme === 'light' ? logoLight : logoDark
   const activeLink = ({isActive}: { isActive: boolean }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

   return (
      <nav className={`${styles.wrapper} ${styles[theme + '_theme']}`}>
         <div className={styles.container}>
            <Link className={styles.logo} to={PATH.PROFILE}>
               <ReactSVG src={logo}/>
            </Link>

            <ul className={styles.list}>
               <li>
                  <NavLink className={activeLink} to={PATH.PACKS_LIST}>
                     <ReactSVG src={packs}/>
                     Packs list
                  </NavLink>
               </li>
               <li>
                  <NavLink className={activeLink} to={PATH.PROFILE}>
                     <ReactSVG src={profile}/>
                     Profile
                  </NavLink>
               </li>
               <li>
                  <NavLink className={activeLink} to={PATH.LEARN}>
                     <ReactSVG src={learn}/>
                     Learn
                  </NavLink>
               </li>
            </ul>

            <div className={styles.buttons}>


               <ThemeButton/>

               <button className={styles.logout} onClick={LogOut}>
                  <ReactSVG src={logout}/>
               </button>

               <MenuBurger/>
            </div>


         </div>
      </nav>
   )
}

