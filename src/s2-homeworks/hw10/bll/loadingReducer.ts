export interface loadingState {
    isLoading: boolean
}

const initState: loadingState = {
    isLoading: false,
}

export const loadingReducer = (state: loadingState = initState, action: LoadingActionType): loadingState => { // fix any
    switch (action.type) {
        case 'CHANGE_LOADING' :
            return {
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})
