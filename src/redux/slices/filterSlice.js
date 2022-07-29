import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
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
    }
  }
})

export const { setSearchValue, setCategoryId, setSort } = filterSlice.actions

export default filterSlice.reducer