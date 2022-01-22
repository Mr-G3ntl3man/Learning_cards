import {ThunkActionT} from "./store";
import {authApi, LoginDataT, ResponseUserDataT} from "../dal/authApi";
import {setFeedback, setLoading} from "./app-reducer";
import {errorHandler} from "../utils/errorHandler";

export enum authStatuses {
   IDLE = 'IDLE',
   LOGIN = 'LOGIN',
   PASS_CHANGED = 'PASS_CHANGED',
   LOADING = 'LOADING',
   SUCCEEDED = 'SUCCEEDED',
}

const initialState: InitialStateT = {
   authStatus: authStatuses.IDLE,
   userData: null
}

export const authReducer = (state: InitialStateT = initialState, action: AuthActionsT): InitialStateT => {
   switch (action.type) {
      case "auth/SET_AUTH_STATUS":
      case "auth/SET_USER_DATA":
         return {...state, ...action.payload}

      default:
         return state
   }
}

const setUserData = (userData: ResponseUserDataT) => ({type: 'auth/SET_USER_DATA', payload: {userData}} as const)
export const setAuthStatus = (authStatus: authStatuses) => ({
   type: 'auth/SET_AUTH_STATUS',
   payload: {authStatus}
} as const)


export const firstFetchMe = (): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setAuthStatus(authStatuses.LOADING))

      const response = await authApi.me()

      dispatch(setUserData(response.data))
      dispatch(setAuthStatus(authStatuses.SUCCEEDED))
   } catch (e: any) {
      dispatch(setAuthStatus(authStatuses.LOGIN))
   }
}

export const fetchMe = (): ThunkActionT => async (dispatch, getState) => {
   try {
      if (getState().auth.userData === null) {
         dispatch(setAuthStatus(authStatuses.LOADING))

         const response = await authApi.me()

         dispatch(setUserData(response.data))
         dispatch(setAuthStatus(authStatuses.SUCCEEDED))
         dispatch(setLoading(false))
      }
   } catch (e: any) {
      dispatch(setAuthStatus(authStatuses.LOGIN))
      errorHandler(e, dispatch)
   }
}

export const loginUserData = (data: LoginDataT): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      const response = await authApi.login(data)

      dispatch(setUserData(response.data))
      dispatch(setAuthStatus(authStatuses.SUCCEEDED))

      dispatch(setLoading(false))
      dispatch(setFeedback('Login successful!', true))
      setTimeout(() => dispatch(setFeedback('Login successful!', false)), 2000)
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}
export const logOutUser = (): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setAuthStatus(authStatuses.LOADING))

      await authApi.logOut()

      dispatch(setAuthStatus(authStatuses.LOGIN))
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export const forgotPassSendInst = (email: string): ThunkActionT => async (dispatch) => {
   try {
      const res = await authApi.forgotPassword(email)

      dispatch(setFeedback(res.data.info, true))
      setTimeout(() => dispatch(setFeedback(res.data.info, false)), 2000)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}

export const setNewPassword = (password: string, resetPasswordToken: string): ThunkActionT => async (dispatch) => {
   try {
      const res = await authApi.setNewPassword({password, resetPasswordToken})

      dispatch(setAuthStatus(authStatuses.PASS_CHANGED))
      dispatch(setFeedback(res.data.info, true))
      setTimeout(() => dispatch(setFeedback(res.data.info, false)), 2000)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}


export type InitialStateT = {
   authStatus: authStatuses
   userData: ResponseUserDataT | null
}

export type AuthActionsT = ReturnType<typeof setAuthStatus>
   | ReturnType<typeof setUserData>

