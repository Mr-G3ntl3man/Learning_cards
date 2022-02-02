import React, {ChangeEvent, useRef, useState} from 'react';
import {ModalTemplate} from "../common/ModalTemplate";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import styles from "../../styles/Modal.module.scss";
import {ReactSVG} from "react-svg";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import {addCardForPack} from "../../../bll/cards-reducer";
import {useParams} from "react-router-dom";
import {setBase64Img} from "../../../utils/setBase64Img";
import plus from '../../images/icons/plus.svg'

export const ButtonAddCard = () => {
   const dispatch = useDispatch()
   const {cardsPack_id} = useParams()

   const [open, setOpen] = useState<boolean>(false)
   const [answerImg, setAnswerImg] = useState<string | ArrayBuffer | null>()
   const [questionImg, setQuestionImg] = useState<string | ArrayBuffer | null>()

   const inputRefQ = useRef<HTMLInputElement>(null)
   const inputRefA = useRef<HTMLInputElement>(null)

   const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => setBase64Img(e, setAnswerImg, dispatch)
   const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => setBase64Img(e, setQuestionImg, dispatch)

   const redirectClickAnswer = () => inputRefA.current?.click()
   const redirectClickQuestion = () => inputRefQ.current?.click()

   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)

   const schema = yup.object().shape({
      question: yup
         .string()
         .required('Card name is a required field!'),
      answer: yup
         .string(),
   })

   const {register, reset, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         question: '',
         answer: '',
      }
   })

   const cleanModal = () => {
      setAnswerImg(null)
      setQuestionImg(null)
      reset()
      closeModal()
   }

   const onSubmit: SubmitHandler<FormDataT> = (data) => dispatch(addCardForPack({
      ...data,
      questionImg,
      answerImg,
      cardsPack_id
   }, cleanModal))

   return (
      <>
         <Button width={'180px'} onClick={openModal}>
            Add new card
         </Button>

         <ModalTemplate animatePreset={'scaleCenter'} isOpen={open} onClose={setOpen}>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalAddCard}>
               <div className={styles.addCardHeader}>
                  <span>Card Info</span>
               </div>


               <div className={styles.inputWrap}>
                  {!!errors.question && <div className={styles.errorMes}>{errors.question.message}</div>}

                  <Input
                     label={'Question'}
                     {...register("question", {required: true})}/>

                  <div onClick={redirectClickQuestion} className={styles.attachFile}>
                     <input
                        ref={inputRefQ}
                        type="file" accept=".jpg, .jpeg, .png"
                        onChange={onChangeQuestion}/>
                     <ReactSVG src={plus}/> Attach file
                  </div>

                  <div className={styles.questionImg}> {questionImg &&
                  <img src={questionImg as string} alt="answerImg"/>}</div>
               </div>

               <div className={styles.inputWrap}>
                  {!!errors.answer && <div className={styles.errorMes}>{errors.answer.message}</div>}

                  <Input
                     label={'Answer'}
                     {...register("answer",)}/>

                  <div onClick={redirectClickAnswer} className={styles.attachFile}>
                     <input
                        ref={inputRefA}
                        type="file" accept=".jpg, .jpeg, .png"
                        onChange={onChangeAnswer}/>
                     <ReactSVG src={plus}/> Attach file
                  </div>

                  <div className={styles.answerImg}> {answerImg &&
                  <img src={answerImg as string} alt="answerImg"/>}</div>
               </div>

               <div style={{marginTop: '80px'}} className={styles.addCardBtn}>
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
   answer: string
}