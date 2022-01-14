import React, {ChangeEvent, useState} from 'react';
import {authApi} from '../../api/api';
import styles from "../../styles/Form.module.scss";
import {Input} from "../Input";
import {Button} from "../Button";

export const ForgotPass = () => {

   const [email, setEmail] = useState<string>('')

   const [successfulSending, setSuccessfulSending] = useState<boolean>(false)

   const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)


   const submit = () => {
      authApi.forgotPassword(email)
         .then(res => {
            console.log(res)

            setSuccessfulSending(true)

            // setTimeout(() => navigate(PATH.SET_NEW_PASS), 2000)
         })
         .catch(e => {
            const error = e.response
               ? e.response.data.error
               : (e.message + ', more details in the console');

            console.log(error)
         })

   }

   return (
      successfulSending
         ? <div className={styles.content}>
            Check Email
            <div>We’ve sent an Email with instructions to {email}</div>
         </div>
         : <div className={styles.content}>
            <form>
               <Input label={'Email'} type="text" onChange={onChangeText}/>
               <Button onClick={submit}>send</Button>
            </form>
         </div>
   );
};

