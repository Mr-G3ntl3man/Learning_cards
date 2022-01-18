import style from '../../styles/Spinner.module.scss'
import {ReactSVG} from "react-svg";
import spinner from '../../images/spinner.svg'


export const Spinner = () => {
   return (
      <div className={style.wrap}>
         <div className={style.spinner}>
            <ReactSVG src={spinner}/>
         </div>
      </div>
   )
}