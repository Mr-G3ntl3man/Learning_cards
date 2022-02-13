import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {PATH} from '../../router/Routes';
import styles from '../../styles/Form.module.scss'
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {registrationNewUser} from '../../../bll/auth-reducer';
import {useDispatch} from "react-redux";
import {ReactSVG} from "react-svg";
import logo from "../../images/logo-light.svg";
import {Spinner} from "../common/Spinner";
import {useAppSelector} from "../../../bll/store";

export const Registration = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const loading = useAppSelector<boolean>(state => state.app.loading)

   const redirect = () => navigate(PATH.LOGIN)

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

   const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormValues>({
         mode: "onChange",
         resolver: yupResolver(schema),
         defaultValues: {
            email: '',
            password: '',
         }
      }
   );

   const onSubmit: SubmitHandler<FormValues> = async (data) => dispatch(registrationNewUser(data, redirect))

   return (
      <div className={loading ? `${styles.content} ${styles.loading}` : styles.content}>
         {loading && <Spinner/>}

         <h1><ReactSVG src={logo}/></h1>

         <span>Sign Up</span>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrap}>
               {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}
               <Input
                  type="email"
                  label={"Email"}
                  {...register("email")}/>
            </div>

            <div className={styles.inputWrap}>
               {!!errors.password && <div className={styles.errorMes}>{errors.password.message}</div>}
               <Input
                  type={"password"}
                  label={"Password"}
                  autoComplete={'on'}
                  {...register("password", {required: true})}/>
            </div>

            <div className={styles.inputWrap}>
               {!!errors.repeatPassword && <div className={styles.errorMes}>{errors.repeatPassword.message}</div>}
               <Input
                  type="password"
                  label={"Confirm password"}
                  autoComplete={'on'}
                  {...register("repeatPassword", {required: true})}/>
            </div>

            <div className={styles.btnWrap}>
               <Link to={PATH.LOGIN}>
                  <Button>
                     Cancel
                  </Button>
               </Link>

               <Button disabled={!isValid} type={'submit'}>
                  Register
               </Button>
            </div>
         </form>
      </div>
   );
}

type FormValues = {
   email: string;
   password: string;
   repeatPassword: string;

}