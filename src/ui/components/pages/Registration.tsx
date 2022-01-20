import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {PATH} from '../../router/Routes';
import styles from '../../styles/Form.module.scss'
import {authApi} from "../../../dal/authApi";
import {Input} from "../common/Input";
import {Button} from "../common/Button";


type FormValues = {
   email: string;
   password: string;
   repeatPassword: string;

};

export function Registration() {
   const [feedbackMessage, setFeedbackMessage] = useState<string>('')

   const navigate = useNavigate()

   const schema = yup.object().shape({
      email: yup
         .string()
         .email('Email should have correct format!')
         .required('Email is a required field!'),
      password: yup
         .string()
         .required('Password is a required field!'),
      repeatPassword: yup
         .string()
         .required('Password is a required field!')
         .oneOf([yup.ref("password"), null], 'Passwords must match')
   })
   const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<FormValues>({
         mode: "onChange",
         resolver: yupResolver(schema),
         defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
         }
      }
   );
   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
         await authApi.signUp(data.email, data.password)
         setTimeout(() => {
            reset()
            navigate(PATH.LOGIN)
         }, 500)

      } catch (err: any) {
         const error = err.response
            ? err.response.data.error
            : (err.message + ', more details in the console');
         console.log('Error: ', {...err})
         setFeedbackMessage(error)
         setTimeout(() => {
            setFeedbackMessage("")
         }, 3000)
      }
   }

   return (
      <div className={styles.content}>
         {feedbackMessage &&
         <div style={{backgroundColor: "red"}} className={styles.errorFeedback}>
            <span>{feedbackMessage}</span>
         </div>}
         <Link className={styles.linkForgot} to={PATH.FORGOT_PASS}>
            Forgot Password
         </Link>

         <h1>It-incubator</h1>

         <span>Registration page</span>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrap}>
               {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}
               <Input type="email"
                      label={"email"}
                      {...register("email")}/>
            </div>
            <div className={styles.inputWrap}>
               {!!errors.password && <div className={styles.errorMes}>{errors.password.message}</div>}
               <Input type={"password"}
                      label={"password"}
                      {...register("password", {required: true})}/>
            </div>
            <div className={styles.inputWrap}>
               {!!errors.repeatPassword && <div className={styles.errorMes}>{errors.repeatPassword.message}</div>}
               <Input type="password"
                      label={"repeatPassword"}
                      {...register("repeatPassword", {required: true})}/>
            </div>

            <div className={styles.btn}>
               <Button disabled={!isValid} type={'submit'}>
                  sign up
               </Button>
            </div>
         </form>

      </div>
   );
}
