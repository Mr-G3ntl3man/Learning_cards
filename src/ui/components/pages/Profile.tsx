import React, {useCallback} from 'react';
import styles from '../../styles/Profile.module.scss'
import {useDispatch} from "react-redux";
import {setSelectedMinMaxRange} from "../../../bll/packs-reducer";
import {useAppSelector} from "../../../bll/store";
import {Spinner} from "../common/Spinner";
import {debounce} from "../../../utils/debounce";
import 'rc-slider/assets/index.css';
import {InputRange} from "../common/InputRange";
import {TablePack} from "../common/TablePack";
import avatarDefault from '../../images/avatarDef.svg'
import {ReactSVG} from "react-svg";
import {Link} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {ThemeT} from "../../../bll/app-reducer";

export const Profile = () => {
   const dispatch = useDispatch()

   const theme = useAppSelector<ThemeT>(state => state.app.theme)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)
   const myName = useAppSelector<string | undefined>(state => state.auth.userData?.name)
   const minRangeRes = useAppSelector<number>(state => state.packs.uiOptions.minRangeRes)
   const maxRangeRes = useAppSelector<number>(state => state.packs.uiOptions.maxRangeRes)
   const avatar = useAppSelector<string | undefined>(state => state.auth.userData?.avatar)
   const onChangeInputRange = useCallback(debounce((value: number[]) => dispatch(setSelectedMinMaxRange(value[0], value[1]))), [dispatch])

   const className = loading ? `${styles.wrapper} ${styles[theme + '_theme']} ${styles.loading}` : ` ${styles.wrapper} ${styles[theme + '_theme']}`

   return (
      <>
         {loading && <Spinner/>}

         <div className={className}>
            <div className={styles.leftColumn}>
               <div className={styles.profileDesc}>
                  <div className={styles.profileImage}>
                     {avatar ? <img src={avatar} alt="avatar"/> : <ReactSVG src={avatarDefault} alt="avatar"/>}
                  </div>
                  <span className={styles.profileName}>{myName}</span>
                  <span className={styles.profileSpeciality}>Front-end developer</span>
                  <button className={styles.editProfile}>
                     <Link to={PATH.EDIT_PROFILE}>
                        Edit profile
                     </Link>
                  </button>
               </div>

               <div className={styles.inputRange}>
                  <span>Number of cards</span>

                  <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>
               </div>
            </div>

            <div className={styles.rightColumn}>
               <h3>My packs list</h3>

               <TablePack id={myId} isOwner/>
            </div>
         </div>
      </>
   )
}
