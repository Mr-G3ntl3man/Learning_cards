import axios from "axios";
import {number} from "yup";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   // baseURL: "http://localhost:7542/2.0/",
   withCredentials: true
})


export const cardsApi = {
   getCardsForPack(data: RequestCardsT) {
      return instance.get<GetCardsResT>('cards/card', {params: data})
         .then(res => res.data)
   }

}

type GetCardsResT = {
   cardPacks: CardPacksT[]
   cardPacksTotalCount: number
   maxCardsCount: number
   minCardsCount: number
   page: number
   pageCount: number
   token: string
   tokenDeathTime: number
}

export type CardPacksT = {
   cardsCount: number
   created: string
   grade: number
   more_id: string
   name: string
   path: string
   private: false
   rating: number
   shots: number
   type: string
   updated: string
   user_id: string
   user_name: string
   __v: number
   _id: string
}

export type RequestCardsT = {
   cardAnswer?: string
   cardQuestion?: string
   cardsPack_id: string
   min?: number
   max?: number
   sortCards?: string
   page?: number
   pageCount?: number
}