import {Dispatch} from "redux"
import {authApi} from "../Api/api";

const initialSignUpState = {
    email: '',
    password: '',
    error: '',
    isOldUser: false,
}

const SIGNUP_DATA = 'SIGNUP_DATA'
const SET_ERROR_REGISTRATION = 'SET_ERROR_REGISTRATION'
const CHECK_USER = 'CHECK_USER'

export type signUpPayloadType = {
    email: string
    password: string
    error: string
    isOldUser: boolean
}

export const signUpReducer = (state: signUpPayloadType = initialSignUpState, action: SignUpActionsType) => {
    switch (action.type) {
        case SIGNUP_DATA: {
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        }
        case SET_ERROR_REGISTRATION: {
            return {
                ...state,
                error: action.error
            }
        }
        case CHECK_USER: {
            return {
                ...state,
                isOldUser: action.isOldUser
            }
        }
        default: {
            return state;
        }
    }
}

export const signUp = (email: string, password: string) => ({type: SIGNUP_DATA, email, password})
export const setErrorRegistration = (error: string) => ({type: SET_ERROR_REGISTRATION, error})
export const checkUser = (isOldUser: boolean) => ({type: CHECK_USER, isOldUser})

type SignUpActionsType =
    ReturnType<typeof signUp>
    & ReturnType<typeof setErrorRegistration>
    & ReturnType<typeof checkUser>

export const regNewUser = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        await authApi.signUp(email, password)
        dispatch(signUp(email, password))
        dispatch(checkUser(true))
    } catch (err: any) {
        const error = err.response
            ? err.response.data.error
            : (err.message + ', more details in the console');
        console.log('Error: ', {...err})
        dispatch(setErrorRegistration(error))
    }
}




