import React, {useState} from 'react';
import styles from '../../styles/Form.module.scss'
import {Button} from "../Button";
import {Input} from "../Input";
import {Link, useNavigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {SubmitHandler, useForm} from "react-hook-form";
import {authApi} from "../../api/api";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

type FormDataT = {
   email: string
   password: string
}

export const Login = () => {
   const [feedback, setFeedback] = useState<boolean>(false)
   const [colorFeedback, setColorFeedback] = useState<'green' | ' #fd5232'>()
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
   })

   const {register, handleSubmit, reset, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
         email: '',
         password: ''
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = async (data) => {
      try {
         await authApi.login(data)

         setFeedback(true)
         setColorFeedback('green')
         setFeedbackMessage('Login Success!')

         setTimeout(() => {
            setFeedback(false)
            reset()
            navigate(PATH.PROFILE)
         }, 500)
      } catch (e: any) {
         setFeedback(true)
         setColorFeedback(' #fd5232')
         setFeedbackMessage(e.response ? e.response.data.error : `${e.message} more information in the console`)

         setTimeout(() => setFeedback(false), 3000)
      }
   }

   return (
      <>
         {feedback &&
         <div style={{backgroundColor: colorFeedback}} className={styles.errorFeedback}>
            <span>{feedbackMessage}</span>
         </div>}

         <div className={styles.content}>
            <h1>It-incubator</h1>

            <span>Sign In</span>

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.inputGroup}>


                  <div className={styles.inputWrap}>
                     {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}
                     <Input
                        type={'text'}
                        label={'Email'}
                        {...register("email", {required: true})}
                     />
                  </div>


                  <div className={styles.inputWrap}>
                     {!!errors.password && <div className={styles.errorMes}>{errors.password.message}</div>}
                     <Input
                        type={'password'}
                        label={'Password'}
                        autoComplete={'on'}
                        {...register("password", {required: true})}/>
                  </div>
               </div>

               <Link className={styles.linkForgot} to={PATH.FORGOT_PASS}>
                  Forgot Password
               </Link>

               <div className={styles.btn}>
                  <Button type={'submit'}>
                     Login
                  </Button>
               </div>
            </form>

            <span>Don’t have an account?</span>

            <Link className={styles.linkSing} to={PATH.REGISTRATION}>
               Sign Up
            </Link>
         </div>
      </>
   )
}
