interface changeThemeIdType {type: 'SET_THEME_ID', id: number}
interface initStateType {themeId: number}

const initState = {themeId: 1,}

export const themeReducer = (state: initStateType = initState, action: changeThemeIdType): initStateType => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID' :
            return {
                themeId: action.id
            }
        default:
            return state
    }
}

export const changeThemeId = (id: number): changeThemeIdType => ({type: 'SET_THEME_ID', id}) // fix any
