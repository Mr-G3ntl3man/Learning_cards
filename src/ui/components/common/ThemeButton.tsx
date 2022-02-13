import {useDispatch} from "react-redux";
import React from 'react';
import {useAppSelector} from "../../../bll/store";
import styles from '../../styles/ThemeButton.module.scss'
import {ReactSVG} from "react-svg";
import sun from '../../images/icons/sun.svg'
import moon from '../../images/icons/moon.svg'

import {setTheme, ThemeT} from "../../../bll/app-reducer";

export const ThemeButton = () => {
   const dispatch = useDispatch()

   const setDarkTheme = () => dispatch(setTheme("light"))
   const setLightTheme = () => dispatch(setTheme("dark"))

   const theme = useAppSelector<ThemeT>(state => state.app.theme)

   theme === 'dark' ? document.body.className = 'dark_theme' : document.body.className = 'light_theme'

   const darkBtnClassName = theme === 'light' ? `${styles.darkBtn} ${styles.active}` : styles.darkBtn
   const lightBtnClassName = theme === 'dark' ? `${styles.lightBtn} ${styles.active}` : styles.lightBtn

   return (
      <div className={styles.themeButton}>
         <button className={darkBtnClassName} onClick={setLightTheme}><ReactSVG src={moon}/></button>
         <button className={lightBtnClassName} onClick={setDarkTheme}><ReactSVG src={sun}/></button>
      </div>
   )
}

