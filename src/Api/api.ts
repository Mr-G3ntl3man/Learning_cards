import axios from "axios";

const instance = axios.create({
   baseURL: 'https://neko-back.herokuapp.com/2.0',
   withCredentials: true
})


export const testApi = {
   test() {
      return instance.get('')
   },
   recoverPassForgot(email: string){
      return instance.post('/auth/forgot', {email})
   }
}