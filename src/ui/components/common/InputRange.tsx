import React, {useState} from 'react';
import {Range} from "rc-slider";
import styles from "../../styles/Range.module.scss";
import {useAppSelector} from "../../../bll/store";
import {ThemeT} from '../../../bll/app-reducer';

export const InputRange: React.FC<InputRangeT> = React.memo(({min, max, onChange}) => {
   const [minVal, setMinVal] = useState(min);
   const [maxVal, setMaxVal] = useState(max);

   const oChangeHandler = (value: number[]) => {

      setMinVal(value[0])
      setMaxVal(value[1])
      onChange(value)
   }

   const theme = useAppSelector<ThemeT>(state => state.app.theme)
   const trackStyle = theme === 'light' ? '#9A91C8' : '#FBD38D'

   return (
      <div className={styles.wrap}>
         <Range
            railStyle={{backgroundColor: '#9A91C8', height: '6px'}}
            trackStyle={[{backgroundColor: trackStyle, height: '6px'}]}
            defaultValue={[min, max]}
            onChange={oChangeHandler}
            max={max}
            min={min}/>

         <div className={`${styles.wrapValue} ${styles[theme + '_theme']}`}>
            <div className={styles.minRange}>{minVal}</div>
            <div className={styles.maxRange}>{maxVal}</div>
         </div>
      </div>
   )
})

type InputRangeT = {
   max: number
   min: number
   onChange: (value: number[]) => void
}