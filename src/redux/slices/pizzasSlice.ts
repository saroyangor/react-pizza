import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { TFetchPizzasArgs, TPizzaBlock } from "../../@types/types";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ currentPage, category, sort, search }: TFetchPizzasArgs) => {
    const { data } = await axios.get<TPizzaBlock[]>(`https://62e28192e8ad6b66d85d08a4.mockapi.io/items?page=${ currentPage }&limit=4${ category }&sortBy=${ sort.sortType }&order=desc${ search }`)
    return data as TPizzaBlock[]
  }
)

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

interface IPizzaState {
  items: TPizzaBlock[]
  status: Status
}

const initialState: IPizzaState = {
  items: [],
  status: Status.LOADING
}

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export default pizzasSlice.reducer