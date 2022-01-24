import React, {ChangeEvent, useCallback, useEffect} from 'react';
import styles from '../../styles/PacksList.module.scss'
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {Select} from "../common/Select";
import {AddCardPackT, CardPacksT, RequestPacksT} from "../../../dal/pakcApi";
import {useDispatch} from "react-redux";
import {
   addNewCardsPack, deleteCardPack,
   fetchPacks,
   setPackPage,
   setPackPageCount,
   setPacksName,
   setSelectedMinMaxRange,
   setUserID,
   updatePack,
} from "../../../bll/packs-reducer";
import {useAppSelector} from "../../../bll/store";
import {Pagination} from "../common/Pagination";
import {Spinner} from "../common/Spinner";
import {debounce} from "../../../utils/debounce";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {authStatuses, logOutUser} from "../../../bll/auth-reducer";
import 'rc-slider/assets/index.css';
import {InputRange} from "../common/InputRange";
import {ResponseUserDataT} from "../../../dal/authApi";

export const PacksList = () => {
   const dispatch = useDispatch()

   const {
      page,
      min,
      max,
      user_id,
      pageCount,
      packName
   } = useAppSelector<RequestPacksT>(state => state.packs.requestPacks)


   const userData = useAppSelector<ResponseUserDataT | null>(state => state.auth.userData)
   const maxPage = useAppSelector<number>(state => state.packs.uiOptions.maxPage)
   const maxRangeRes = useAppSelector<number>(state => state.packs.uiOptions.maxRangeRes)
   const minRangeRes = useAppSelector<number>(state => state.packs.uiOptions.minRangeRes)
   const packs = useAppSelector<CardPacksT[]>(state => state.packs.packs)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)
   const myId = useAppSelector<string | undefined>(state => state.auth.userData?._id)

   const onChangeInputSearch = debounce((e: ChangeEvent<HTMLInputElement>) => dispatch(setPacksName(e.target.value)))
   const onChangeInputRange = useCallback(debounce((value: number[]) => dispatch(setSelectedMinMaxRange(value[0], value[1]))), [dispatch])
   const onPageChange = useCallback((page: number) => dispatch(setPackPage(page)), [dispatch])
   const onSelectChange = useCallback((pageCount: number) => dispatch(setPackPageCount(pageCount)), [dispatch])


   //const addPackHandler = useCallback((newCardPack:AddCardPackT) => {dispatch(addNewCardsPack(newCardPack))}, [dispatch])
   const addPackHandler = () => dispatch(addNewCardsPack())
   const deletePackHandler = (id:string) => dispatch(deleteCardPack(id))
   const updatePackHandler = (id:string, name:string) => dispatch(updatePack(id,name))


   const onClickMyPacks = () => dispatch(setUserID(myId as string))
   const onClickAllPacks = () => dispatch(setUserID(''))

   useEffect(() => {
      if (!loading) dispatch(fetchPacks())
   }, [packName, page, pageCount, min, max, user_id, userData])


   useEffect(() => {
      return () => {
         dispatch(setSelectedMinMaxRange(0, 0))
      }
   }, [])

   const packsList = packs.map((el, index) => (
      <PacksItem
         key={el._id}
         packId={el._id}
         bgColor={index % 2 === 0 ? '#fff' : '#F8F7FD'}
         name={el.name}
         cards={el.cardsCount}
         update={el.updated.split(':')[0].slice(0, -3)}
         created={el.user_name}
         isOwner={el.user_id === myId}
         deletePack={deletePackHandler}
         updatePack={updatePackHandler}/>))

   if (authStatus === authStatuses.LOGIN) return <Navigate to={PATH.LOGIN}/>

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

               {!user_id && <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>}
               {user_id && <InputRange onChange={onChangeInputRange} max={maxRangeRes} min={minRangeRes}/>}
            </div>

            <div className={styles.rightColumn}>
               <h3>Packs list</h3>

               <div className={styles.interaction}>
                  <Input
                     onChange={onChangeInputSearch}
                     className={styles.inputSearch}
                     variant={'outlined'}
                     label={'Search...'}/>

                  <Button width={'180px'}
                          onClick={addPackHandler}>
                     Add new pack
                  </Button>
               </div>

               <div className={styles.packs}>
                  <ul className={styles.packsHeader}>
                     <li>Name</li>
                     <li>Cards</li>
                     <li>Last Updated</li>
                     <li>Created by</li>
                     <li>Actions</li>
                  </ul>

                  <div className={styles.packsItem}>
                     {packsList}
                     {!packs.length && <div className={styles.noPacks}>There are no packages here yet.</div>}
                  </div>
               </div>

               <div className={styles.packsFooter}>
                  <Pagination initialPage={page} onPageChange={onPageChange} pageCount={maxPage}/>
                  
                  <div className={styles.showCard}>
                     Show
                     <Select onChange={onSelectChange} defaultValue={pageCount} items={[10, 20, 30]}/>
                     Cards per Page
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}


const PacksItem: React.FC<PacksItemT> = React.memo((
   {
      created, cards, update,
      isOwner, name, bgColor, packId, deletePack, updatePack
   }) => (
   <ul style={{backgroundColor: bgColor}}>
      <li><Link className={styles.packsName} to={`/packs-list/${name}/${packId}`}>{name}</Link></li>
      <li>{cards}</li>
      <li>{update}</li>
      <li>{created}</li>
      <li className={styles.packsActionBtn}>
         {
            isOwner
               ? <>
                  <button className={styles.ActionBtnD} onClick={()=>deletePack(packId)}>Delete</button>
                  <button onClick={()=>updatePack(packId,name)}>Edit</button>
                  <button>Learn</button>
               </>
               : <button>Learn</button>
         }
      </li>
   </ul>
))

type PacksItemT = {
   name: string
   cards: number
   update: string
   created: string
   bgColor: string
   isOwner: boolean
   packId: string
   deletePack:(id:string)=>void
   updatePack:(id:string, name:string)=>void
}

