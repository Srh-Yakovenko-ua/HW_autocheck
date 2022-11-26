import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort':
            const newState = [...state];
            newState.sort(function (a, b) {
                if (action.payload === 'up') {
                    return a.name > b.name ? 1 : -1
                } else if (action.payload === 'down') {
                    return a.name < b.name ? 1 : -1
                } else return 0
            })
            return newState;
        case 'check': {
            return state.filter(user => user.age > 18)
        }
        default:
            return state
    }
}
