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
import {Button} from "./Button";
import {useAppSelector} from "../../../bll/store";


export const Navbar = () => {
   const activeLink = ({isActive}: { isActive: boolean }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)

   const dispatch = useDispatch()

   const LogOut = () => dispatch(logOutUser())

   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

   return (
      <nav className={styles.wrapper}>
         <ul className={styles.list}>
            <li className={styles.logo}><Link to={PATH.PROFILE}>It-incubator</Link></li>

            <li><NavLink className={activeLink} to={PATH.PACKS_LIST}>
               <ReactSVG src={packs}/>
               Packs list
            </NavLink></li>
            <li><NavLink className={activeLink} to={PATH.PROFILE}>
               <ReactSVG src={profile}/>
               Profile
            </NavLink></li>
            <li><NavLink className={activeLink} to={PATH.LEARN}>
               <ReactSVG src={learn}/>
               Learn
            </NavLink></li>
            <li className={styles.logout}>
               <Button onClick={LogOut}>LogOut</Button>
            </li>
         </ul>
      </nav>
   )
}

