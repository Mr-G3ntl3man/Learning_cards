import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
   test: testReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

//export const store = createStore(rootReducer)

export type AppRootStateT = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;