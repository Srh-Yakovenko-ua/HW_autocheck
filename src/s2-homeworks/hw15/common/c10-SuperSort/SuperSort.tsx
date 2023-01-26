import React from 'react'
import up from './img/up.png'
import down from './img/down.png'
import double from './img/double arrow.png'

// добавить в проект иконки и импортировать
const downIcon = down
const upIcon = up
const noneIcon = double

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    return sort === down ? up : sort === up ? '' : down
}

const SuperSort: React.FC<SuperSortPropsType> = ({
                                                     sort,
                                                     value,
                                                     onChange,
                                                     id = 'hw15',
                                                 }) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            <img style={{paddingLeft : '5px' , width : '20px'}}
                id={id + '-icon-' + sort}
                src={icon}
             alt={''}/>

        </span>
    )
}

export default SuperSort
