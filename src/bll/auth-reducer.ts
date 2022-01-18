import {ThunkActionT} from "./store";
import {authApi, LoginDataT, ResponseUserDataT} from "../dal/authApi";
import {setFeedback, setLoading} from "./app-reducer";

const initialState: InitialStateT = {
   isAuth: false,
   userData: null
}

export const authReducer = (state: InitialStateT = initialState, action: AuthActionsT): InitialStateT => {
   switch (action.type) {
      case "auth/SET_IS_AUTH":
         return {...state, ...action.payload}

      default:
         return state
   }
}

const setIsAuth = (isAuth: boolean) => ({type: 'auth/SET_IS_AUTH', payload: {isAuth}} as const)
const setUserData = (userData: ResponseUserDataT) => ({type: 'auth/SET_IS_AUTH', payload: {userData}} as const)


export const fetchMe = (): ThunkActionT => async (dispatch, getState) => {
   try {
      if (!getState().auth.userData) {
         const response = await authApi.me()

         dispatch(setUserData(response.data))
         dispatch(setIsAuth(true))
      }
   } catch (e: any) {
      const message = e.response ? e.response.data.error : `${e.message} more information in the console`

      dispatch(setIsAuth(false))
      dispatch(setFeedback(message, true, true))
      setTimeout(() => dispatch(setFeedback(message, false, false)), 3000)
   }
}

export const loginUserData = (data: LoginDataT): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      const response = await authApi.login(data)

      dispatch(setUserData(response.data))
      dispatch(setIsAuth(true))

      dispatch(setLoading(false))
      dispatch(setFeedback('Login successful!!!', true))
      setTimeout(() => dispatch(setFeedback('Login successful!!!', false)), 3000)
   } catch (e: any) {
      const message = e.response ? e.response.data.error : `${e.message} more information in the console`

      dispatch(setFeedback(message, true, true))
      setTimeout(() => dispatch(setFeedback(message, false, false)), 2000)
      dispatch(setLoading(false))
   }
}

export type InitialStateT = {
   isAuth: boolean
   userData: ResponseUserDataT | null
}

export type AuthActionsT = ReturnType<typeof setIsAuth>
   | ReturnType<typeof setUserData>

