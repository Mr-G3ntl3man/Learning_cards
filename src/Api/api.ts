import axios from "axios";

/*const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   withCredentials: true
})*/

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const authApi = {
    signUp(email: string, password: string) {
        return instance.post<newUserApiType>('/auth/register', {email, password})
    },
}

export type newUserApiType = {
    addedUser: {}
    error: string
}
