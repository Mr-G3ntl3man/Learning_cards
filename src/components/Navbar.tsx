import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {PATH} from "../router/Routes";
import styles from '../styles/Navbar.module.scss'
import {ReactSVG} from "react-svg";
import packs from '../images/packs.svg'
import profile from '../images/profile.svg'

export const Navbar = () => {
   const activeLink = ({isActive}: { isActive: boolean }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)

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
         </ul>
      </nav>
   )
}

