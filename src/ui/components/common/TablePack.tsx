import React, {MouseEvent, useCallback, useEffect} from 'react';
import styles from "../../styles/PacksList.module.scss";
import {ReactSVG} from "react-svg";
import arrow from "../../images/icons/sort.svg";
import {useAppSelector} from "../../../bll/store";
import {CardPacksT, RequestGetPacksT} from "../../../dal/pakcApi";
import {debounce} from "../../../utils/debounce";
import {
   fetchPacks,
   setPackPage,
   setPackPageCount,
   setPacksName,
   setSortPacks,
} from "../../../bll/packs-reducer";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {ButtonDeletePack} from "../modal/ButtonDeletePack";
import {ButtonEditPack} from "../modal/ButtonEditPack";
import {Pagination} from "./Pagination";
import {Select} from "./Select";
import {Input} from "./Input";
import {ButtonAddPack} from "../modal/ButtonAddPack";
import {PATH} from "../../router/Routes";
import {ThemeT} from "../../../bll/app-reducer";

export const TablePack: React.FC<{ isOwner?: boolean, id?: string }> = ({isOwner, id}) => {
   const dispatch = useDispatch()

   const {
      page,
      pageCount,
      packName,
      sortPacks,
      min,
      max,
      user_id
   } = useAppSelector<RequestGetPacksT>(state => state.packs.requestPacks)

   const theme = useAppSelector<ThemeT>(state => state.app.theme)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const packs = useAppSelector<CardPacksT[]>(state => state.packs.packs)
   const maxPage = useAppSelector<number>(state => state.packs.uiOptions.maxPage)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)

   const onChangeInputSearch = debounce((value: string) => dispatch(setPacksName(value)))
   const onPageChange = useCallback((page: number) => dispatch(setPackPage(page)), [dispatch])
   const onSelectChange = useCallback((pageCount: number) => dispatch(setPackPageCount(pageCount)), [dispatch])
   const onSortPackCLick = (e: MouseEvent<HTMLSpanElement>) => e.target instanceof HTMLSpanElement && dispatch(setSortPacks(e.target.dataset.sort as string))

   useEffect(() => {
      if (!loading) dispatch(fetchPacks(id))
   }, [packName, page, pageCount, sortPacks, min, max, user_id])

   const packsList = packs.map((el, index) => (
      <PacksItem
         user_id={el.user_id}
         key={el._id}
         packId={el._id}
         bgColor={index % 2 === 0 ? '#fff' : '#F8F7FD'}
         name={el.name}
         cards={el.cardsCount}
         update={el.updated.split(':')[0].slice(0, -3)}
         created={el.user_name}
         isOwner={el.user_id === myId}/>))


   const interactionPanel = isOwner
      ? <>
         <Input
            value={packName}
            onChangeText={onChangeInputSearch}
            className={styles.inputSearch}
            variant={'outlined'}
            label={'Search...'}/>

         <ButtonAddPack user_id={id}/>
      </>
      : <Input
         value={packName}
         onChangeText={onChangeInputSearch}
         className={styles.inputSearch}
         variant={'outlined'}
         label={'Search...'}/>

   return (
      <>
         <div className={styles.interaction}>
            {interactionPanel}
         </div>

         <div className={styles.packs}>
            <ul className={styles.packsHeader}>
               <li className={styles.sort}>
                  Name <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                  <div className={styles.sortList}>
                           <span onClick={onSortPackCLick} data-sort={'0name'}
                                 className={sortPacks === '0name' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                     <span onClick={onSortPackCLick}
                           data-sort={'1name'}
                           className={sortPacks === '1name' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                  </div>
               </li>
               <li className={styles.sort}>
                  Cards <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                  <div className={styles.sortList}>
                           <span onClick={onSortPackCLick} data-sort={'0cardsCount'}
                                 className={sortPacks === '0cardsCount' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                     <span onClick={onSortPackCLick}
                           data-sort={'1cardsCount'}
                           className={sortPacks === '1cardsCount' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                  </div>
               </li>
               <li className={styles.sort}>
                  Last Updated <span className={styles.arrowSort}> <ReactSVG src={arrow}/></span>

                  <div className={styles.sortList}>
                           <span onClick={onSortPackCLick} data-sort={'0updated'}
                                 className={sortPacks === '0updated' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In descending order</span>
                     <span onClick={onSortPackCLick}
                           data-sort={'1updated'}
                           className={sortPacks === '1updated' ? `${styles.sortItem} ${styles.active}` : styles.sortItem}>In ascending order</span>
                  </div>
               </li>
               <li>Created by</li>
               <li>Actions</li>
            </ul>

            <div className={styles.packsItem}>
               {packsList}
               {!packs.length && <div className={styles.noPacks}>There are no packages here yet.</div>}
            </div>
         </div>

         <div className={`${styles.packsFooter} ${styles[theme + '_theme']}`}>
            <Pagination initialPage={page} onPageChange={onPageChange} pageCount={maxPage}/>

            <div className={styles.showCard}>
               Show
               <Select onChange={onSelectChange} defaultValue={pageCount} items={[10, 20, 30]}/>
               Cards per Page
            </div>
         </div>
      </>
   )
}

const PacksItem: React.FC<PacksItemT> = React.memo((props) => {
   const {isOwner, bgColor, created, packId, update, cards, name, user_id} = props

   const linkCards = <Link
      className={styles.packsName}
      to={`/packs-list/${name}/${packId}/${user_id}`}>
      {name}
   </Link>

   const profileLink = isOwner
      ? <Link
         to={PATH.PROFILE}
         className={styles.packsCreated}>
         {created}
      </Link>
      : <Link
         to={`/profile/${created}/${user_id}`}
         className={styles.packsCreated}>
         {created}
      </Link>

   const actionButtons = isOwner
      ? <div className={styles.packsActionBtn}>
         <ButtonDeletePack
            user_id={user_id || ''}
            id={packId}
            packName={name}/>
         <ButtonEditPack
            user_id={user_id || ''}
            id={packId}
            name={name}/>
         {cards ?
            <Link
               to={`/learn-cards/${name}/${cards}/${packId}`}
               className={styles.btn}>
               Learn
            </Link>
            : <span className={styles.noCard}>No cards</span>}
      </div>
      : <div className={styles.packsActionBtn}>
         {cards ?
            <Link
               to={`/learn-cards/${name}/${cards}/${packId}`}
               className={styles.btn}>
               Learn
            </Link>
            : <span className={styles.noCard}>No cards</span>}
      </div>

   return (
      <ul style={{backgroundColor: bgColor}}>
         <li>
            <span className={styles.mobileVersionTitle}>Name:</span>
            {linkCards}
         </li>
         <li>
            <span className={styles.mobileVersionTitle}>Cards:</span>
            {cards}
         </li>
         <li>
            <span className={styles.mobileVersionTitle}>Last Updated:</span>
            {update}
         </li>
         <li>
            <span className={styles.mobileVersionTitle}>Created by:</span>
            {profileLink}
         </li>
         <li>
            <span className={styles.mobileVersionTitle}>Actions:</span>
            {actionButtons}
         </li>
      </ul>
   )
})

type PacksItemT = {
   user_id?: string
   name: string
   cards: number
   update: string
   created: string
   bgColor: string
   isOwner: boolean
   packId: string
}


