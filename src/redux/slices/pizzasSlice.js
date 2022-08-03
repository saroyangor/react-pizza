import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ currentPage, category, sort, search }) => {
    const { data } = await axios.get(`https://62e28192e8ad6b66d85d08a4.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sortType}&order=desc${search}`)
    return data
  }
)

const initialState = {
  items: [],
  status: "loading"
}

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error"
      state.items = []
    }
  }
})

export const {} = pizzasSlice.actions

export default pizzasSlice.reducer