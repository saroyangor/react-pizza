import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности", sortType: "rating" },
  searchValue: ""
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
    },
    resetFilters: (state) => {
      state.currentPage = 1
      state.categoryId = 0
      state.sort = { name: "популярности", sortType: "rating" }
    }
  }
})

export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters, resetFilters } = filterSlice.actions

export default filterSlice.reducer