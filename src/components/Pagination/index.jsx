import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel=" ... "
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageCount={3}
      pageRangeDisplayed={4}
    />
  )
}

export default Pagination