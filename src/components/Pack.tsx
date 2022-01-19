import React, { useEffect, useState } from 'react';
import { authApi } from '../api/api';

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

    const [data, setData] = useState<Array<CardPacksT>>()

    useEffect(() => {
        authApi.getPack()
        .then((res) => {
            setData(res.data.cardPacks)
            console.log(data)
        })
    }, [])
    
    return <div>
            <span>Name </span>
        <ul>
           {data?.map((p) => {
                <li>p.name</li>
            })}
        </ul>
            <span>Cards </span>
        <ul>
           {data?.map((p) => {
                <li>p.cardsCount</li>
            })}
        </ul>
            <span>Last Updated </span>
        <ul>
           {data?.map((p) => {
                <li>p.updated</li>
            })}
        </ul>
            <span>Created by </span>
        <ul>
           {data?.map((p) => {
                <li>p.user_name</li>
            })}
        </ul>
            <span>Actions</span>
    </div>
}