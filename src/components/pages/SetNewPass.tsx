import React, {ChangeEvent, useState} from 'react';
import styles from '../../styles/Form.module.scss'
import {Input} from "../Input";
import {Button} from "../Button";
import {authApi} from "../../api/api";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../router/Routes";

export const SetNewPass = () => {
   const [password, setPassword] = useState<string>('')

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)

   const {token} = useParams()

   const navigate = useNavigate()


   const submit = () => {
      authApi.setNewPassword({password, resetPasswordToken: token as string})
         .then(res => {
            console.log(res)

            navigate(PATH.LOGIN)
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
         Create new password
         <Input label={'Password'} type="password" onChange={onChangeHandler}/>
         <Button onClick={submit}>Create new password</Button>
      </div>
   );
};

