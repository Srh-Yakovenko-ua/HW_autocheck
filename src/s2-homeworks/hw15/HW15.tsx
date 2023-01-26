import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import {Preloader} from './common/Preloader/Preloader';

/*
* 1 - дописать SuperPagination-  done
* 2 - дописать SuperSort-  done
* 3 - проверить pureChange тестами -  done
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(36)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = async (params: any) => {
        setLoading(true)
        try {
            const res = await getTechs(params)
            if (res) {
                setTechs(res.data.techs)
                setTotalCount(res.data.totalCount)
                console.log(res)
            }
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        setPage(newPage)
        setCount(newCount)

        const pageParam: { page?: string } = newPage ? {page: newPage.toString()} : {}
        const countParam: { count?: string } = newCount ? {count: newCount.toString()} : {}
        const {page, count, ...lastQueries} = Object.fromEntries(searchParams)
        const allParams = {...pageParam, ...countParam, ...lastQueries}

        sendQuery(allParams)
        setSearchParams(allParams)

    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)
        setPage(1)

        const sortParam : {sort? : string} = newSort ? {sort: newSort} : {};
        const {sort, page, ...lastQueries} = Object.fromEntries(searchParams)
        const allSortParams = {...lastQueries , ...sortParam  }

        sendQuery(allSortParams)
        setSearchParams(allSortParams)

    }
    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}><Preloader/></div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        <span className={s.text}>Tech</span>
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        <span className={s.text}>Developer</span>
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
