import React from "react";
import ReactPaginate from "react-paginate";
import styles from "../../styles/PacksList.module.scss";

type PaginationT = {
   initialPage: number
   pageCount: number,
   onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationT> = ({pageCount, onPageChange, initialPage}) => {

   const handlePageClick = (event: { selected: number }) => {
      onPageChange(event.selected)
   }

   return (
      <>
         <ReactPaginate
            initialPage={initialPage}
            className={styles.pagination}
            breakLabel="..."
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel=""
            renderOnZeroPageCount={undefined}
         />
      </>
   )
}