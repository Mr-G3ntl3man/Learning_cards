import style from '../../styles/Spinner.module.scss'
import {ReactSVG} from "react-svg";
import spinner from '../../images/icons/spinner.svg'
import spinnerAtom from '../../images/icons/spinerAtom.svg'
import React from "react";


export const Spinner: React.FC = () => {
   return (
      <div className={`${style.wrap} ${style.center}`}>
         <div className={style.spinner}>
            <ReactSVG src={spinnerAtom}/>
         </div>
      </div>
   )
}