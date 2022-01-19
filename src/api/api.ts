import axios from "axios";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   withCredentials: true
})

// const instance = axios.create({
//     baseURL: "http://localhost:7542/2.0/",
//     withCredentials: true
// })


export const authApi = {
   login(data: { email: string, password: string }) {
      return instance.post('auth/login', data)
   },
   signUp(email: string, password: string) {
      return instance.post<newUserApiType>('auth/register', {email, password})
   },
   setNewPassword(data: { password: string, resetPasswordToken: string }) {
      return instance.post('auth/set-new-password', data)
   },
   forgotPassword(email: string) {
      return instance.post('auth/forgot', {
         email,
         message: `
         <div style="background-color: lime; padding: 15px">
            Password recovery link:
             <a href='http://localhost:3000/#/set-new-password/$token$'>Link</a>
         </div> `
      })
   },
   getPack(){
      return instance.get('cards/pack')
   }
}

export type newUserApiType = {
   addedUser: {}
   error: string
}
