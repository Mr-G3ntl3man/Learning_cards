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
      return instance.post('/auth/forgot', {email, message: `<div style="background-color: lime; padding: 15px">		error: string;	
      password recovery link: 	}	
      <a href='http://localhost:3000/#/set-new-password/$token$'>		
      link</a></div>`})
   },
   recoverPassNewPass(password:string){
      return instance.post('/auth/set-new-password', {password})
   }
}