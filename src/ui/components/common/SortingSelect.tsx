import React, {MouseEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../../../bll/store';
import styles from "../../styles/Select.module.scss";
import {ReactSVG} from "react-svg";
import arrow from "../../images/icons/selectArrow.svg";

export type ListT = {
   item: string
   data_sort: string
}

type SortingSelectT = {
   list: ListT[]
   onSortItemCLick: (sortingBy: string) => void
   defaultValue: string
   sortingBy: 'packs' | 'cards'
}

export const SortingSelect: React.FC<SortingSelectT> = ({list, onSortItemCLick, defaultValue, sortingBy}) => {
   const sortPacks = useAppSelector<string | undefined>(state => state.packs.requestPacks.sortPacks)
   const sortCards = useAppSelector<string | undefined>(state => state.cards.requestCards.sortCards)

   const [selected, setSelected] = useState<string>(defaultValue)
   const [collapsed, setCollapsed] = useState<boolean>(true)

   const onSelectClick = () => setCollapsed(!collapsed)

   const sortingItem = sortingBy === 'packs' ? sortPacks : sortCards

   const onItemClick = (e: MouseEvent<HTMLLIElement>) => {
      if (e.currentTarget instanceof HTMLLIElement) {
         onSortItemCLick(e.currentTarget.dataset.sort as string)

         setSelected(e.currentTarget.outerText)
         setCollapsed(true)
      }
   }

   const listener = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement

      if (target) {
         if (!target.closest(`.${styles.sortingSelect}`)) setCollapsed(true)
      }
   }

   useEffect(() => {
      window.addEventListener('click', listener)
      return () => {
         window.removeEventListener('click', listener)
      }
   }, [])


   return (
      <div className={styles.sortingSelect}>
         <div onClick={onSelectClick}
              className={collapsed ? styles.selected : `${styles.selected} ${styles.active}`}>
            <div className={styles.selectedItem}>{selected}</div>
            <div className={collapsed ? styles.arrow : `${styles.arrow} ${styles.active}`}><ReactSVG
               src={arrow}/></div>
         </div>

         <ul className={collapsed ? styles.sortList : `${styles.sortList} ${styles.active}`}>
            {
               list.map(el => <li
                  className={sortingItem === el.data_sort ? `${styles.sortItem} ${styles.active}` : styles.sortItem}
                  onClick={onItemClick}
                  data-sort={el.data_sort}
                  key={el.data_sort}>
                  {el.item}
               </li>)
            }
         </ul>
      </div>
   )
}

