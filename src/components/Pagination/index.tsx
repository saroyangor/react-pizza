import React from "react"
import ReactPaginate from "react-paginate"

import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "../../redux/slices/filterSlice"
import { RootState } from "../../redux/store";

import styles from "./Pagination.module.scss"

const Pagination: React.FC = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state: RootState) => state.filter.currentPage)

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  return (
    <ReactPaginate
      className={ styles.root }
      breakLabel=" ... "
      nextLabel=">"
      previousLabel="<"
      onPageChange={ (e) => onChangePage(e.selected + 1) }
      pageCount={ 3 }
      forcePage={ currentPage - 1 }
      pageRangeDisplayed={ 4 }
    />
  )
}

export default Pagination