import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";
import {Spinner} from "../common/Spinner";
import {debounce} from "../../../utils/debounce";
import {InputRange} from "../common/InputRange";
import {TablePack} from "../common/TablePack";
import {
   setSelectedMinMaxRange,
   setUserID,
} from "../../../bll/packs-reducer";
import 'rc-slider/assets/index.css';
import styles from '../../styles/PacksList.module.scss'

export const PacksList = () => {
   const dispatch = useDispatch()

   const user_id = useAppSelector<string | undefined>(state => state.packs.requestPacks.user_id)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)
   const minRangeRes = useAppSelector<number>(state => state.packs.uiOptions.minRangeRes)
   const maxRangeRes = useAppSelector<number>(state => state.packs.uiOptions.maxRangeRes)

   const onClickMyPacks = () => dispatch(setUserID(myId))
   const onClickAllPacks = () => dispatch(setUserID(''))
   const onChangeInputRange = useCallback(debounce((value: number[]) => dispatch(setSelectedMinMaxRange(value[0], value[1]))), [dispatch])

   useEffect(() => {
      return () => {
         dispatch(setSelectedMinMaxRange(0, 0))
      }
   }, [])

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.leftColumn}>
               <span>Show packs cards</span>

               <div className={styles.btnWrap}>
                  <button onClick={onClickMyPacks} className={user_id && styles.activeBtn}>My</button>
                  <button onClick={onClickAllPacks} className={!user_id ? styles.activeBtn : undefined}>All</button>
               </div>

               <span>Number of cards</span>

               <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>
            </div>

            <div className={styles.rightColumn}>
               <h3>Packs list</h3>

               <TablePack isOwner/>
            </div>
         </div>
      </>
   )
}
