import React, {useCallback} from 'react';
import {useParams} from "react-router-dom";
import styles from "../../styles/Profile.module.scss";
import {ReactSVG} from "react-svg";
import avatarDefault from "../../images/avatarDef.svg";
import {InputRange} from "../common/InputRange";
import {TablePack} from "../common/TablePack";
import {useAppSelector} from "../../../bll/store";
import {debounce} from "../../../utils/debounce";
import {setSelectedMinMaxRange} from "../../../bll/packs-reducer";
import {useDispatch} from "react-redux";
import {Spinner} from "../common/Spinner";

export const UserProfile = () => {
   const {user_name, user_id} = useParams()
   const dispatch = useDispatch()

   const loading = useAppSelector<boolean>(state => state.app.loading)
   const minRangeRes = useAppSelector<number>(state => state.packs.uiOptions.minRangeRes)
   const maxRangeRes = useAppSelector<number>(state => state.packs.uiOptions.maxRangeRes)
   const onChangeInputRange = useCallback(debounce((value: number[]) => dispatch(setSelectedMinMaxRange(value[0], value[1]))), [dispatch])

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.leftColumn}>
               <div className={styles.profileDesc}>
                  <div className={styles.profileImage}>
                     <ReactSVG src={avatarDefault} alt="avatar"/>
                  </div>
                  <span className={styles.profileName}>{user_name}</span>
                  <span className={styles.profileSpeciality}>Front-end developer</span>
               </div>

               <div className={styles.inputRange}>
                  <span>Number of cards</span>

                  <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>
               </div>
            </div>

            <div className={styles.rightColumn}>
               <h3>Packs list: {user_name}</h3>

               <TablePack id={user_id}/>
            </div>
         </div>
      </>
   );
};

