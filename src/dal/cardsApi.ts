import axios from "axios";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   // baseURL: "http://localhost:7542/2.0/",
   withCredentials: true
})


export const cardsApi = {
   getCardsForPack(data: RequestGetCardsT) {
      return instance.get<GetCardsResT>('cards/card', {params: data})
         .then(res => res.data)
   },
   changeCard(data: RequestPostCardsT) {
      return instance.post('cards/card', {params: data})
         .then(res => res.data)
   },
   changeCardRating(data: { grade: number, card_id: string }) {
      return instance.put('cards/grade', data)
         .then(res => res.data)
   },

}

export type RequestPostCardsT = {
   _id: string
   question?: string
   answer?: string
   grade?: number
   shots?: number
   rating?: number
   answerImg?: string
   questionImg?: string
   questionVideo?: string
   answerVideo?: string
   type?: string
}

export type RequestGetCardsT = {
   cardAnswer?: string
   cardQuestion: string
   cardsPack_id: string
   min?: number
   max?: number
   sortCards?: string
   page: number
   pageCount: number
}

type GetCardsResT = {
   cards: CardsT[]
   cardsTotalCount: number
   maxGrade: number
   minGrade: number
   packUserId: string
   page: number
   pageCount: number
   token: string
   tokenDeathTime: number
}

export type CardsT = {
   answer: string
   cardsPack_id: string
   comments: string
   created: string
   grade: number
   more_id: string
   question: string
   rating: number
   shots: number
   type: string
   updated: string
   user_id: string
   __v: number
   _id: string
}
