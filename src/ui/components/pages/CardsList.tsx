import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {Spinner} from "../common/Spinner";
import {useAppSelector} from "../../../bll/store";
import styles from "../../styles/CardList.module.scss";
import {Input} from "../common/Input";
import {cardsApi} from "../../../dal/cardsApi";

export const CardsList = () => {
   const {pack} = useParams()
   const loading = useAppSelector<boolean>(state => state.app.loading)
   
   useEffect(() => {
      if (pack) cardsApi.getCardsForPack({cardsPack_id: pack})
         .then(res => {
            console.log(res)
         })
   }, [])

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.linkBack}>
               <span>svg</span>
               Pack Name
            </div>

            <Input variant={'outlined'} label={'Search...'}/>

            <div className={styles.column}>
               <ul className={styles.cardsHeader}>
                  <li>Question</li>
                  <li>Answer</li>
                  <li>Last Updated</li>
                  <li>Grade</li>
                  <li>Actions</li>
               </ul>

               <div className={styles.packsItem}>
                  {<div className={styles.noCards}>This pack is empty.</div>}
               </div>
            </div>
         </div>
      </>
   );
};


const Cards: React.FC<PacksItemT> = React.memo((
   {
      created, cards, update,
      isOwner, name, bgColor, packId
   }) => (
   <ul style={{backgroundColor: bgColor}}>
      <li>{name}</li>
      <li>{cards}</li>
      <li>{update}</li>
      <li>{created}</li>
      <li className={styles.packsActionBtn}>
         {
            isOwner
               ? <>
                  <button className={styles.ActionBtnD}>Delete</button>
                  <button>Edit</button>
                  <button>Learn</button>
               </>
               : <Link to={`/packs-list/${packId}`}>Learn</Link>
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
}

