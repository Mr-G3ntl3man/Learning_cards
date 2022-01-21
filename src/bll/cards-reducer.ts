import {CardsT, cardsApi, RequestGetCardsT} from "../dal/cardsApi";
import {ThunkActionT} from "./store";
import {CardPacksT} from "../dal/pakcApi";
import {setLoading} from "./app-reducer";
import {fetchMe} from "./auth-reducer";
import {errorHandler} from "../utils/errorHandler";

const initialState: InitialStateT = {
   requestCards: {
      cardsPack_id: '',
      pageCount: 5,
      cardQuestion: '',
      page: 0,
   },
   uiOptions: {
      maxPage: 0,
      cardsTotalCount: 0
   },
   cards: [],
}

export const cardsReducer = (state: InitialStateT = initialState, action: CardsActionsT): InitialStateT => {
   switch (action.type) {
      case "cards/SET_PAGE":
      case "cards/SET_PAGE_COUNT":
      case "card/SET_CARDS_QUESTION":
         return {...state, requestCards: {...state.requestCards, ...action.payload}}

      case "cards/SET_CARDS":
         return {...state, ...action.payload}

      case "packs/SET_TOTAL_CARDS_COUNT":
         return {
            ...state,
            uiOptions: {
               ...state.uiOptions,
               ...action.payload,
               maxPage: Math.ceil(action.payload.cardsTotalCount / state.requestCards.pageCount)
            }
         }

      default:
         return state
   }
}


export const setCardPackPage = (page: number) => ({type: 'cards/SET_PAGE', payload: {page}} as const)
export const setCardPageCount = (pageCount: number) => ({type: 'cards/SET_PAGE_COUNT', payload: {pageCount}} as const)
export const setCards = (cards: CardsT[]) => ({type: 'cards/SET_CARDS', payload: {cards}} as const)
export const setPack = (currentPack: CardPacksT) => ({type: 'cards/SET_PACK', payload: {currentPack}} as const)
export const setTotalCardsCount = (cardsTotalCount: number) => ({
   type: 'packs/SET_TOTAL_CARDS_COUNT',
   payload: {cardsTotalCount}
} as const)
export const setCardQuestion = (cardQuestion: string) => ({
   type: 'card/SET_CARDS_QUESTION',
   payload: {cardQuestion}
} as const)

export const fetchCardsForPacks = (cardsPack_id: string): ThunkActionT => async (dispatch, getState) => {
   try {
      dispatch(setLoading(true))

      if (getState().auth.userData !== null) {
         const cards = await cardsApi.getCardsForPack({...getState().cards.requestCards, cardsPack_id})
         dispatch(setCards(cards.cards))

         dispatch(setTotalCardsCount(cards.cardsTotalCount))
         dispatch(setLoading(false))
      }

   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export type InitialStateT = {
   requestCards: RequestGetCardsT
   cards: CardsT[]
   uiOptions: uiOptionsT
}

type uiOptionsT = {
   cardsTotalCount: number
   maxPage: number
}

export type CardsActionsT =
   ReturnType<typeof setCards>
   | ReturnType<typeof setTotalCardsCount>
   | ReturnType<typeof setCardPackPage>
   | ReturnType<typeof setCardPageCount>
   | ReturnType<typeof setCardQuestion>

