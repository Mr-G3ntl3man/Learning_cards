import React from "react";
import ReactPaginate from "react-paginate";
import styles from "../../styles/PacksList.module.scss";

type PaginationT = {
   pageCount: number,
   onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationT> = ({pageCount, onPageChange}) => {

   const handlePageClick = (event: { selected: number }) => {
      onPageChange(event.selected + 1)
   }

   return (
      <>
         <ReactPaginate
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