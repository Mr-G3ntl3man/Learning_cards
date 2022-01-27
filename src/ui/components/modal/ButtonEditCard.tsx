 import React, {useState} from 'react';
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
import { editCard } from '../../../bll/cards-reducer';




export const ButtonEditCard: React.FC<{cardsPack_id:string,id:string,question:string,answer:string }> = ({cardsPack_id,id, question,answer}) => {
   const [open, setOpen] = useState<boolean>(false)

   const openModal = () => setOpen(true)
   const closeModal = () => setOpen(false)

   const dispatch = useDispatch()

   const schema = yup.object().shape({
      question: yup
          .string(),
      answer: yup
          .string(),
   })

   const {register, reset, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         question:'',
         answer:'',
      }
   })

  const onSubmit: SubmitHandler<FormDataT> = (updateCardData) => {
      dispatch(editCard(cardsPack_id, {id,question,answer}))
      reset()
      closeModal()
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
                     {...register("question", )}/>
               </div>

               <div className={styles.inputWrap}>
                  {!!errors.answer && <div className={styles.errorMes}>{errors.answer.message}</div>}

                  <Input
                      label={'New answer'}
                      {...register("answer")}/>
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
   id: string,
   question: string,
   answer:string,
}