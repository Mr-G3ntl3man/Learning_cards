import React, {useEffect, useState} from 'react';
import styles from '../../styles/MenuBurger.module.scss'
import {NavLink} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {ReactSVG} from "react-svg";
import packs from "../../images/icons/packs.svg";
import profile from "../../images/icons/profile.svg";
import learn from "../../images/icons/learn.svg";

export const MenuBurger = () => {
   const [open, setOpen] = useState(true)

   const onClickHandler = () => setOpen(state => !state)

   const listActiveClassName = open ? `${styles.list} ${styles.open}` : styles.list
   const btnActiveClassName = open ? `${styles.header__burger} ${styles.open}` : styles.header__burger
   const activeLink = ({isActive}: { isActive: boolean }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)

   const listener = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement

      if (target) {
         if (!target.closest(`.${styles.container}`)) setOpen(false)

         if (target.closest(`.${styles.link}`)) setOpen(false)
      }
   }

   useEffect(() => {
      window.addEventListener('click', listener)
      return () => {
         window.removeEventListener('click', listener)
      }
   }, [])

   return (
      <div className={styles.container}>
         <button onClick={onClickHandler} className={btnActiveClassName}>
            <span className={styles.header__line}> </span>
         </button>

         <ul className={listActiveClassName}>
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
      </div>
   )
}