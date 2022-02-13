import style from '../../styles/Spinner.module.scss'
import {ReactSVG} from "react-svg";
import spinner from '../../images/icons/spinner.svg'
import React from "react";
import {useAppSelector} from "../../../bll/store";
import {ThemeT} from "../../../bll/app-reducer";


export const Spinner: React.FC = () => {
   const theme = useAppSelector<ThemeT>(state => state.app.theme)

   return (
      <div className={`${style.wrap} ${style[theme + '_theme']} ${style.center}`}>
         <div className={style.spinner}>
            <ReactSVG src={spinner}/>
         </div>
      </div>
   )
}