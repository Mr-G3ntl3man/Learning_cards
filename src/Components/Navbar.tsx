import React from 'react';
import {Link} from 'react-router-dom';
import {PATH} from "../Router/Routes";
import styles from '../Styles/Navbar.module.scss'

export const Navbar = () => {
   return (
      <nav className={styles.wrapper}>
         <ul className={styles.list}>
            <li><Link to={PATH.LOGIN}>Login</Link></li>
            <li><Link to={PATH.REGISTRATION}>Registration</Link></li>
            <li><Link to={PATH.PROFILE}>Profile</Link></li>
            <li><Link to={PATH.RECOVER_PASS}>Recover password</Link></li>
            <li><Link to={PATH.NEW_PASS}>Enter new password</Link></li>
            <li><Link to={PATH.TEST}>Test page</Link></li>
         </ul>
      </nav>
   )
}

