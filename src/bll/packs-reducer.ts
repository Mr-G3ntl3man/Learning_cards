import {CardPacksT, packApi, RequestPacksT} from "../dal/pakcApi";
import {ThunkActionT} from "./store";
import {setLoading} from "./app-reducer";
import {errorHandler} from "../utils/errorHandler";

const initialState: InitialStateT = {
   requestPacks: {
      min: 0,
      max: 0,
      page: 1,
      pageCount: 10,
   },
   uiOptions: {
      maxRangeRes: 0,
      minRangeRes: 0,
      cardPacksTotalCount: 0,
      maxPage: 0,
   },
   packs: [],
}


export const packsReducer = (state: InitialStateT = initialState, action: PacksActionsT): InitialStateT => {
   switch (action.type) {
      case "packs/SET_PAGE":
      case 'packs/SET_PACK_NAME':
      case "packs/SET_PAGE_COUNT":
      case "packs/SET_SELECTED_MIN_MAX_RANGE":
         return {...state, requestPacks: {...state.requestPacks, ...action.payload}}

      case "packs/SET_PACKS_DATA":
         return {...state, packs: action.data}

      case "packs/SET_USER_ID":
         return {...state, requestPacks: {...state.requestPacks, ...action.payload,}}

      case "packs/SET_MIN_MAX_RANGE":
         return {...state, requestPacks: {...state.requestPacks,}, uiOptions: {...state.uiOptions, ...action.payload}}

      case "packs/SET_TOTAL_PACKS_COUNT":
         return {
            ...state,
            uiOptions: {
               ...state.uiOptions,
               ...action.payload,
               maxPage: Math.ceil(action.payload.cardPacksTotalCount / state.requestPacks.pageCount)
            }
         }

      default:
         return state
   }
}


export const setSortPacks = (sortPacks: string) => ({type: 'packs/SET_PACK_NAME', payload: {sortPacks}} as const)

export const setUserID = (user_id: string) => ({type: 'packs/SET_USER_ID', payload: {user_id}} as const)
export const setPackPage = (page: number) => ({type: 'packs/SET_PAGE', payload: {page}} as const)
export const setPackPageCount = (pageCount: number) => ({type: 'packs/SET_PAGE_COUNT', payload: {pageCount}} as const)
export const setPacksName = (packName: string) => ({type: 'packs/SET_PACK_NAME', payload: {packName}} as const)
export const setPacksData = (data: CardPacksT[]) => ({type: 'packs/SET_PACKS_DATA', data} as const)
export const setTotalPacksCount = (cardPacksTotalCount: number) => ({
   type: 'packs/SET_TOTAL_PACKS_COUNT',
   payload: {cardPacksTotalCount}
} as const)

export const setSelectedMinMaxRange = (min: number, max: number) => ({
   type: 'packs/SET_SELECTED_MIN_MAX_RANGE',
   payload: {min, max}
} as const)

export const setMinMaxRange = (minRangeRes: number, maxRangeRes: number,) => ({
   type: 'packs/SET_MIN_MAX_RANGE', payload: {
      maxRangeRes,
      minRangeRes
   }
} as const)


export const fetchPacks = (): ThunkActionT => async (dispatch, getState) => {
   try {
      if (getState().auth.userData !== null) {
         dispatch(setLoading(true))

         const res = await packApi.getPack(getState().packs.requestPacks)

         dispatch(setPacksData(res.cardPacks))
         dispatch(setMinMaxRange(res.minCardsCount, res.maxCardsCount))
         dispatch(setTotalPacksCount(res.cardPacksTotalCount))

         dispatch(setLoading(false))
      }
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}


export type PacksActionsT = ReturnType<typeof setPacksName>
   | ReturnType<typeof setSelectedMinMaxRange>
   | ReturnType<typeof setPackPage>
   | ReturnType<typeof setPackPageCount>
   | ReturnType<typeof setPacksData>
   | ReturnType<typeof setTotalPacksCount>
   | ReturnType<typeof setMinMaxRange>
   | ReturnType<typeof setUserID>

export type InitialStateT = {
   requestPacks: RequestPacksT
   packs: CardPacksT[]
   uiOptions: uiOptionsT
}

export type uiOptionsT = {
   minRangeRes: number
   maxRangeRes: number
   cardPacksTotalCount: number
   maxPage: number
}