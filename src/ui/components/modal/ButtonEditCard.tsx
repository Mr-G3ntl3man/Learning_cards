import React, {ChangeEvent, useRef, useState} from 'react';
import {ModalTemplate} from "../common/ModalTemplate";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import styles from "../../styles/Modal.module.scss";
import close from "../../images/icons/x.svg";
import {ReactSVG} from "react-svg";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import {editCard} from '../../../bll/cards-reducer';
import plus from "../../images/icons/plus.svg";
import {setBase64Img} from "../../../utils/setBase64Img";
import {useAppSelector} from "../../../bll/store";
import {CardsT} from "../../../dal/cardsApi";


type ButtonEditCardT = {
   cardsPack_id: string
   _id: string
   question: string
   answer: string
}

export const ButtonEditCard: React.FC<ButtonEditCardT> = (props) => {
   const {_id, question, answer, cardsPack_id} = props

   const dispatch = useDispatch()

   const cards = useAppSelector<CardsT[]>(state => state.cards.cards)

   const currentCardAnswerImg = cards.find(el => el._id === _id)?.answerImg
   const currentCardQuestionImg = cards.find(el => el._id === _id)?.questionImg

   const [open, setOpen] = useState<boolean>(false)
   const [answerImg, setAnswerImg] = useState<string | ArrayBuffer | null | undefined>(currentCardAnswerImg)
   const [questionImg, setQuestionImg] = useState<string | ArrayBuffer | null | undefined>(currentCardQuestionImg)

   const inputRefQ = useRef<HTMLInputElement>(null)
   const inputRefA = useRef<HTMLInputElement>(null)

   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)
   const redirectClickAnswer = () => inputRefA.current?.click()
   const redirectClickQuestion = () => inputRefQ.current?.click()
   const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => setBase64Img(e, setAnswerImg, dispatch)
   const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => setBase64Img(e, setQuestionImg, dispatch)


   const schema = yup.object().shape({
      question: yup
         .string(),
      answer: yup
         .string(),
   })

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         question,
         answer,
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = (data) => {
      dispatch(editCard(cardsPack_id, {...data, _id, answerImg, questionImg}, closeModal))
   }

   return (
      <>
         <button className={styles.btnEdit} onClick={openModal}>Edit</button>

         <ModalTemplate animatePreset={'scaleCenter'} isOpen={open} onClose={setOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalAddPack}>
               <div className={styles.addPackHeader}>
                  <span>Change card</span>
                  <span onClick={closeModal} className={styles.close}><ReactSVG src={close}/></span>
               </div>


               <div className={styles.inputWrap}>
                  {!!errors.question && <div className={styles.errorMes}>{errors.question.message}</div>}

                  <Input
                     label={'New question'}
                     {...register("question",)}/>

                  <div onClick={redirectClickQuestion} className={styles.attachFile}>
                     <input
                        ref={inputRefQ}
                        type="file" accept=".jpg, .jpeg, .png"
                        onChange={onChangeQuestion}/>
                     <ReactSVG src={plus}/> Attach file
                  </div>

                  {questionImg &&
                  <div className={styles.questionImg}>
                     <img src={questionImg as string} alt="answerImg"/>
                  </div>}
               </div>

               <div className={styles.inputWrap}>
                  {!!errors.answer && <div className={styles.errorMes}>{errors.answer.message}</div>}

                  <Input
                     label={'New answer'}
                     {...register("answer")}/>

                  <div onClick={redirectClickAnswer} className={styles.attachFile}>
                     <input
                        ref={inputRefA}
                        type="file" accept=".jpg, .jpeg, .png"
                        onChange={onChangeAnswer}/>
                     <ReactSVG src={plus}/> Attach file
                  </div>

                  {answerImg &&
                  <div className={styles.answerImg}>
                     <img src={answerImg as string} alt="answerImg"/>
                  </div>}
               </div>

               <div className={styles.addPackBtn}>
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button type={'submit'} onClick={openModal}>Save</Button>
               </div>
            </form>
         </ModalTemplate>
      </>
   );
};

type FormDataT = {
   question: string,
   answer: string,
}