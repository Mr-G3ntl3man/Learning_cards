import React, {useCallback, useState} from 'react';
import {Input} from "../Input";
import {Button} from "../Button";
import {useDispatch, useSelector} from 'react-redux';
import {regNewUser, setErrorRegistration} from "../../redux/signUpReducer";
import {PATH} from "../../router/Routes";
import {Navigate} from "react-router-dom";
import {AppRootStateT} from "../../redux/store";
import styles from "../../styles/Registration.module.scss";

export const Registration = () => {

   const registrateEmail = useSelector((store: AppRootStateT) => store.signUp.email);
   const error = useSelector((store: AppRootStateT) => store.signUp.error)
   const isOldUser = useSelector((store: AppRootStateT) => store.signUp.isOldUser)

   const [email, setEmail] = useState<string>("")
   const [password, setPassword] = useState<string>("")
   const [password1, setPassword1] = useState<string>("")

   const dispatch = useDispatch()


   const signUpHandler = useCallback((email: string, password: string) => {
      if (password1 === password) {
         dispatch(regNewUser(email, password))
      } else {
         dispatch(setErrorRegistration("Пароли должны совпадать"))
      }
   }, [dispatch, email, password1, password])

   if (isOldUser) {
      return <Navigate to={PATH.LOGIN}/>
   }

   return (
      <div className={styles.content}>
         Registration page
         {error && <div style={{color: "red"}}>{error}</div>}
         <Input value={email} onChangeText={setEmail} label={"email"}/>
         <Input value={password} onChangeText={setPassword} label={"password"}/>
         <Input value={password1} onChangeText={setPassword1} label={"password2"}/>
         <Button onClick={() => signUpHandler(email, password)}>sign up</Button>
      </div>
   );
};

