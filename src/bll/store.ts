import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk'
import {signUpReducer} from "./signUpReducer";
import {PacksActionsT, packsReducer} from "./packs-reducer";
import {AuthActionsT, authReducer} from "./auth-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionsT, appReducer} from "./app-reducer";

const rootReducer = combineReducers({
   app: appReducer,
   signUp: signUpReducer,
   auth: authReducer,
   packs: packsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateT = ReturnType<typeof rootReducer>

export type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, RootActionT>

export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector

type RootActionT = AppActionsT | PacksActionsT | AuthActionsT

// @ts-ignore
window.store = store;