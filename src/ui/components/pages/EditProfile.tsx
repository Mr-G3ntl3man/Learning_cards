import React, {ChangeEvent, useRef, useState} from 'react';
import styles from '../../styles/EditProfile.module.scss'
import {useAppSelector} from "../../../bll/store";
import {ReactSVG} from "react-svg";
import avatarDefault from "../../images/avatarDef.svg";
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {Link} from "react-router-dom";
import {PATH} from "../../router/Routes";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import {changeProfile} from "../../../bll/auth-reducer";
import {Spinner} from "../common/Spinner";
import {setBase64Img} from "../../../utils/setBase64Img";

export const EditProfile = () => {
   const dispatch = useDispatch()

   const inputRef = useRef<HTMLInputElement>(null)

   const loading = useAppSelector<boolean>(state => state.app.loading)
   const name = useAppSelector<string | undefined>(state => state.auth.userData?.name)
   const email = useAppSelector<string | undefined>(state => state.auth.userData?.email)
   const avatar = useAppSelector<string | undefined>(state => state.auth.userData?.avatar)

   const [base64, setBase64] = useState<string | ArrayBuffer | null>(avatar ? avatar : null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setBase64Img(e, setBase64, dispatch)

   const schema = yup.object().shape({email: yup.string().email('Email should have correct format!')})

   const onSubmit: SubmitHandler<FormDataT> = (data) => {
      dispatch(changeProfile({
         ...data,
         avatar: base64 ? base64 : undefined
      }))
   }

   const {register, handleSubmit, formState: {errors}} = useForm<FormDataT>({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {email, name}
   })

   return (
      <>
         {loading && <Spinner/>}

         <div className={loading ? `${styles.wrapper} ${styles.loading}` : styles.wrapper}>
            <div className={styles.editForm}>
               <span>Personal Information</span>

               <div onClick={() => inputRef.current?.click()} className={styles.editAvatar}>
                  <input type="file"
                         ref={inputRef}
                         onChange={onChangeHandler}
                         accept=".jpg, .jpeg, .png"/>

                  {base64
                     ? <img src={base64 as string} alt="avatar"/>
                     : <ReactSVG src={avatarDefault} alt="avatar"/>}
               </div>

               <form onSubmit={handleSubmit(onSubmit)}>

                  <Input style={{marginBottom: '30px'}}
                         value={name}
                         label={'Name'}
                         {...register("name", {required: false})}/>

                  <div className={styles.inputWrap}>
                     {!!errors.email && <div className={styles.errorMes}>{errors.email.message}</div>}

                     <Input
                        value={email}
                        label={'Email'}
                        {...register("email", {required: false})}/>
                  </div>

                  <div className={styles.btnWrap}>
                     <Link to={PATH.PROFILE}>
                        <Button>
                           Cancel
                        </Button>
                     </Link>

                     <Button type={'submit'}>Save</Button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}


type FormDataT = {
   name: string
   email: string
}
