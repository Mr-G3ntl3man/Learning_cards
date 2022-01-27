import React, { useEffect, useState } from 'react';
import { authApi } from '../../api/api';
import s from '../../styles/Pack.module.scss'

export type CardPacksT = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
 }

export  const Pack = () => {

    const [data, setData] = useState<Array<CardPacksT>>([])
    console.log(data);
    
    useEffect(() => {
        authApi.getPack()
        .then((res) => {
            setData(res.data.cardPacks)
        
        })
    }, [])
    
if (data.length === 0) {
    return <div>Loading.......</div>
}

    return <div>
        {data.length > 0 ? (
            <div>{data.map( (el)=> {
                return (
                    <ul className={s.list}>
                        <li>{el.name} </li>
                        <li>{el.cardsCount} </li>
                        <li>{el.updated} </li>
                    </ul>
                )
            })}</div>
        ) : (<div>Null......</div>  )}
           
    </div>
}