import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardsT} from "../../../dal/cardsApi";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {changeCardRating, fetchCardsForPacks, setCurrentCard, setCurrentPackInfo} from "../../../bll/cards-reducer";
import {useDispatch} from "react-redux";
import styles from '../../styles/Learn.module.scss'
import {Button} from "../common/Button";
import {Spinner} from "../common/Spinner";
import {PATH} from "../../router/Routes";

export const LearnCards = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {cardsPack_id, cardsCount, packName} = useParams()

   const [showAnswer, setShowAnswer] = useState<boolean>(false)
   const [currentCardRating, setCurrentCardRating] = useState<number | null>(null)

   const cards = useAppSelector<CardsT[]>(state => state.cards.cards)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const currentCardQ = useAppSelector<string | undefined>(state => state.cards.currentCard?.question)
   const currentCardA = useAppSelector<string | undefined>(state => state.cards.currentCard?.answer)
   const currentCardId = useAppSelector<string | undefined>(state => state.cards.currentCard?._id)
   const currentCardAnswerImg = useAppSelector<string | undefined>(state => state.cards.currentCard?.answerImg)
   const currentCardQuestionImg = useAppSelector<string | undefined>(state => state.cards.currentCard?.questionImg)

   const getCard = (cards: CardsT[]): CardsT => {
      let length = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);

      const rand = Math.random() * length;

      let id = 0
      let sum = 0

      while (sum < rand) {
         sum += (6 - cards[id].grade) ** 2
         id++
      }

      return cards[id - 1]
   }

   const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentCardRating(Number(e.currentTarget.value))
   const onShowAnswerClick = () => setShowAnswer(true)
   const onCancelClick = () => navigate(PATH.PACKS_LIST)
   const switchToNextCard = () => {
      dispatch(setCurrentCard(getCard(cards)))
      setShowAnswer(false)
      setCurrentCardRating(null)
   }

   const onNextCardClick = () => dispatch(changeCardRating({
      card_id: currentCardId,
      grade: currentCardRating as number
   }, switchToNextCard))

   useEffect(() => {
      !loading && dispatch(fetchCardsForPacks(cardsPack_id, Number(cardsCount)))

      dispatch(setCurrentPackInfo({cardsPack_id, cardsCount, packName}))
   }, [])

   useEffect(() => {
      cards.length && dispatch(setCurrentCard(getCard(cards)))
   }, [cards])

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.learnCardContent}>
               <span className={styles.title}><span>Learn</span> "{packName}"</span>

               <div className={styles.question}>
                  <b>Question:</b>
                  <span>{currentCardQ}</span>
                  <div className={styles.questionImg}>  {currentCardQuestionImg &&
                  <img src={currentCardQuestionImg} alt="question image"/>} </div>
               </div>

               {showAnswer &&
               <>
                  <div className={styles.answer}>
                     <b>Answer:</b>
                     <span>{currentCardA}</span>
                     <div className={styles.answerImg}>  {currentCardAnswerImg &&
                     <img src={currentCardAnswerImg} alt="answer image"/>} </div>
                  </div>

                  <div className={styles.rate}>
                     <span>Rate yourself:</span>
                     <ul>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={1} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Did not know
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={2} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Forgot
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={3} onChange={onRadioChange} name={'rate'} type="radio"/>
                              A lot of thought
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={4} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Confused
                           </label>
                        </li>
                        <li>
                           <label className={styles.checkbox}>
                              <input value={5} onChange={onRadioChange} name={'rate'} type="radio"/>
                              Knew the answer
                           </label>
                        </li>
                     </ul>
                  </div>
               </>}

               <div className={styles.btnWrap}>
                  <Button onClick={onCancelClick}>Cancel</Button>
                  {
                     showAnswer
                        ? <Button className={currentCardRating === null ? styles.disabled : ''}
                                  onClick={onNextCardClick}>Next</Button>
                        : <Button onClick={onShowAnswerClick}>Show answer</Button>
                  }
               </div>
            </div>
         </div>
      </>
   )
}

