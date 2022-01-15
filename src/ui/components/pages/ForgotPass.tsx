import React, {ChangeEvent, FormEvent, useState} from 'react';
import {authApi} from '../../../dal/authApi';
import styles from "../../styles/Form.module.scss";
import {Input} from "../common/Input";
import {Button} from "../common/Button";

export const ForgotPass = () => {

   const [email, setEmail] = useState<string>('')

   const [successfulSending, setSuccessfulSending] = useState<boolean>(false)

   const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)

   const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

   const onClick = () => {
      console.log('ds')
      authApi.forgotPassword(email)
         .then(res => {
            console.log(res)

            setSuccessfulSending(true)

         })
         .catch(e => {
            const error = e.response
               ? e.response.data.error
               : (e.message + ', more details in the console');

            console.log(error)
         })
   }

   return (
      <div className={styles.content}>
         {successfulSending
            ? <div>
               Check Email
               <div>We’ve sent an Email with instructions to {email}</div>
            </div>
            : <form onSubmit={onSubmit}>
               <Input label={'Email'} type="text" onChange={onChangeText}/>
               <Button onClick={onClick}>send</Button>
            </form>}
      </div>
   );
};

