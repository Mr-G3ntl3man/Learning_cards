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
   signUp(email: string, password: string) {
      return instance.post<newUserApiType>('/auth/register', {email, password})
   },
   recoverPassForgot(email: string) {
      return instance.post('/auth/forgot', {email})
   },
   login(data: { email: string, password: string }) {
      return instance.post('auth/login', data)
   }
}

export type newUserApiType = {
   addedUser: {}
   error: string
}
