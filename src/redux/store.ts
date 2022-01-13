import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";
import thunk from 'redux-thunk'
import {signUpReducer} from "../redux/signUpReducer";

const rootReducer = combineReducers({
   test: testReducer,
   signUp:signUpReducer,
})
export const store=createStore(rootReducer, applyMiddleware(thunk))

//export const store = createStore(rootReducer)

export type AppRootStateT = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;