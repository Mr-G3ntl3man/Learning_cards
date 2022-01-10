const initialState: InitialStateT = {}

export const testReducer = (state: InitialStateT = initialState, action: ActionsType): InitialStateT => {
   switch (action.type) {

      default:
         return {...state}
   }
}

export type InitialStateT = {}

export const action = () => ({type: 'TEST'} as const)

type ActionsType = ReturnType<typeof action>
