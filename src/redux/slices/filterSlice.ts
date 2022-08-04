import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TSort } from "../../@types/types";

interface IFilterState {
  categoryId: number
  currentPage: number
  sort: TSort
  searchValue: string
}

const initialState: IFilterState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности", sortType: "rating" },
  searchValue: ""
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<IFilterState>) => {
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