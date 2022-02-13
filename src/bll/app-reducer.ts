const initialState: InitialStateT = {
   theme: 'light',
   loading: false,
   error: false,
   showTooltip: false,
   feedbackMessage: ''
}

export const appReducer = (state: InitialStateT = initialState, action: AppActionsT): InitialStateT => {
   switch (action.type) {
      case "app/SET_LOADING":
      case "app/SET_FEEDBACK":
      case "app/SET_THEME":
         return {...state, ...action.payload}

      default:
         return state
   }
}

export const setLoading = (loading: boolean) => ({type: 'app/SET_LOADING', payload: {loading}} as const)
export const setTheme = (theme: ThemeT) => ({type: 'app/SET_THEME', payload: {theme}} as const)
export const setFeedback = (feedbackMessage: string, showTooltip: boolean, error: boolean = false) => ({
   type: 'app/SET_FEEDBACK',
   payload: {feedbackMessage, showTooltip, error}
} as const)

export type InitialStateT = {
   theme: ThemeT
   loading: boolean
   error: boolean
   showTooltip: boolean
   feedbackMessage: string
}

export type ThemeT = 'light' | 'dark'

export type AppActionsT = ReturnType<typeof setLoading>
   | ReturnType<typeof setFeedback>
   | ReturnType<typeof setTheme>
