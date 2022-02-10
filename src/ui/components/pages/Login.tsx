import React from 'react';
import styles from '../../styles/Form.module.scss'
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppSelector} from "../../../bll/store";
import {authStatuses, loginUserData} from "../../../bll/auth-reducer";
import {useDispatch} from "react-redux";
import {Spinner} from "../common/Spinner";
import {ReactSVG} from "react-svg";
import logo from "../../images/logo.svg";

type FormDataT = {
   email: string
   password: string
   rememberMe: boolean
}

export const Login = () => {
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)
   const loading = useAppSelector<boolean>(state => state.app.loading)

   const dispatch = useDispatch()

   const schema = yup.object().shape({
      email: yup
         .string()
         .email('Email should have correct format!')
         .required('Email is a required field!'),
      password: yup
         .string()
         .required('Password is a required field!'),
   })

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onBlur",
      resolver: yupResolver(schema),
      defaultValues: {
         email: '',
         password: '',
         rememberMe: true
      }
   })

   const onSubmit: SubmitHandler<FormDataT> = async (data) => dispatch(loginUserData(data))

   if (authStatus === authStatuses.SUCCEEDED) return <Navigate to={PATH.PROFILE}/>

   return (
      <>
         <div className={loading ? `${styles.content} ${styles.loading}` : styles.content}>
            <h1><ReactSVG src={logo}/></h1>

            <span>Sign In</span>

            <form onSubmit={handleSubmit(onSubmit)}>
               {loading && <Spinner/>}

               <div className={styles.inputGroup}>

                  <div style={{paddingBottom: '10px'}} className={styles.inputWrap}>
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

               <div className={styles.checkbox}>
                  <label>
                     <input type="checkbox"
                            {...register("rememberMe", {required: false})}
                     />
                     Remember me ?
                  </label>
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
