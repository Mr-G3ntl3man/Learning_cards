import axios from "axios";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   // baseURL: "http://localhost:7542/2.0/",
   withCredentials: true
})


const emailMassage = `
         <div style='
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 30px;
            max-width: 500px; 
            background-color: #ececf9;
            '>
               <h1 style='color: #000' >Password recovery!</h1>
               <p style='color: #000'>To reset your password, click on the button and you will be redirected to the password reset form.</p>
               <a style='
                    padding: 5px 10px;
                    background-color: #21268f;
                    color: #fff;  ' 
                   href='https://mr-g3ntl3man.github.io/Learning_cards/#/set-new-password/$token$'
                   > Reset password</a>
                   <p>Message from: <a style="color: #fff;text-align: left " href="https://mr-g3ntl3man.github.io/Learning_cards">mr-g3ntl3man.github.io/Learning_cards</a></p>
         </div>
`


export const authApi = {
   me() {
      return instance.post('auth/me')
   },
   changeProfile(data: ChangeProfileT) {
      return instance.put<ResChangeProfileT>('auth/me', data)
   },
   login(data: LoginDataT) {
      return instance.post<ResponseUserDataT>('auth/login', data)
   },
   logOut() {
      return instance.delete('auth/me')
   },
   signUp(data: { email: string, password: string }) {
      return instance.post<newUserApiType>('auth/register', data)
   },
   setNewPassword(data: { password: string, resetPasswordToken: string }) {
      return instance.post('auth/set-new-password', data)
   },
   forgotPassword(email: string) {
      return instance.post('auth/forgot', {email, message: emailMassage})
   },
}

export type ResponseUserDataT = {
   created: string
   email: string
   isAdmin: boolean
   name: string
   publicCardPacksCount: number
   rememberMe: boolean
   token: string
   tokenDeathTime: number
   updated: string
   verified: boolean
   __v: number
   _id: string
   avatar?: string
}

export type LoginDataT = {
   email: string,
   password: string
   rememberMe: boolean
}

export type newUserApiType = {
   addedUser: {}
   error: string
}

export type ChangeProfileT = {
   name?: string
   avatar?: string | ArrayBuffer | null
   email?: string
}

type ResChangeProfileT = {
   updatedUser: ResponseUserDataT
   token: string
   tokenDeathTime: string
}