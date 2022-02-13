import {ThunkActionT} from "./store";
import {authApi, ChangeProfileT, LoginDataT, ResponseUserDataT} from "../dal/authApi";
import {setLoading} from "./app-reducer";
import {errorHandler} from "../utils/errorHandler";
import {feedbackHandler} from "../utils/feedbackHandler";

export enum authStatuses {
   IDLE = 'IDLE',
   LOGIN = 'LOGIN',
   PASS_CHANGED = 'PASS_CHANGED',
   LOADING = 'LOADING',
   SUCCEEDED = 'SUCCEEDED',
}

const initialState: InitialStateT = {
   authStatus: authStatuses.IDLE,
   userData: null,
   error: '',
}

export const authReducer = (state: InitialStateT = initialState, action: AuthActionsT): InitialStateT => {
   switch (action.type) {
      case "auth/SET_AUTH_STATUS":
      case "auth/SET_USER_DATA":
      case "auth/SET_ERROR_REGISTRATION":
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
export const setErrorRegistration = (error: string) => ({
   type: 'auth/SET_ERROR_REGISTRATION',
   payload: {error}
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

      feedbackHandler('Login successful!', dispatch)
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export const logOutUser = (): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))
      dispatch(setAuthStatus(authStatuses.LOADING))

      await authApi.logOut()

      dispatch(setAuthStatus(authStatuses.LOGIN))
      dispatch(setLoading(false))
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export const forgotPassSendInst = (email: string, sendMess: (email: string) => void): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      const res = await authApi.forgotPassword(email)

      dispatch(setLoading(false))
      sendMess(email)
      feedbackHandler(res.data.info, dispatch)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}

export const setNewPassword = (password: string, resetPasswordToken: string): ThunkActionT => async (dispatch) => {
   try {
      const res = await authApi.setNewPassword({password, resetPasswordToken})

      dispatch(setAuthStatus(authStatuses.PASS_CHANGED))
      feedbackHandler(res.data.info, dispatch)
   } catch (e) {
      errorHandler(e, dispatch)
   }
}

export const registrationNewUser = (data: { email: string, password: string }, redirect: () => void): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      await authApi.signUp(data)

      dispatch(setLoading(false))
      dispatch(setAuthStatus(authStatuses.LOGIN))
      feedbackHandler('Successful registration!', dispatch)
      redirect()
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}

export const changeProfile = (data: ChangeProfileT): ThunkActionT => async (dispatch) => {
   try {
      dispatch(setLoading(true))

      const res = await authApi.changeProfile(data)
      dispatch(setUserData(res.data.updatedUser))

      feedbackHandler(`Personal information saved successfully!`, dispatch)
      dispatch(setLoading(false))
   } catch (e: any) {
      errorHandler(e, dispatch)
   }
}


export type InitialStateT = {
   authStatus: authStatuses
   userData: ResponseUserDataT | null
   error: string
}

export type AuthActionsT = ReturnType<typeof setAuthStatus>
   | ReturnType<typeof setUserData>
   | ReturnType<typeof setErrorRegistration>



