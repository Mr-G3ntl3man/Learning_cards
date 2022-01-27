import React from 'react';
import styles from '../../styles/Learn.module.scss'
import {Button} from "../common/Button";
import {Link, Navigate} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {PATH} from "../../router/Routes";
import {CurrentPackT} from "../../../bll/cards-reducer";

export const Learn = () => {
   const currentPack = useAppSelector<CurrentPackT | null>(state => state.cards.currentPack)

   if (currentPack !== null) return <Navigate
      to={`/learn-cards/${currentPack.cardsCount}/${currentPack.cardsCount}/${currentPack.cardsPack_id}`}/>

   return (
      <div className={styles.learnContainer}>
         <div className={styles.learnPreview}>
            <p>
               You can learn from packs, for this choose a pack!
            </p>

            <Link to={PATH.PACKS_LIST}>
               <Button width={'200px'}>Choose packs</Button>
            </Link>
         </div>
      </div>
   )
}

