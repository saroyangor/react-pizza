import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { TCartItem } from "../../@types/types"
import { setTotalPrice } from "../../utils/setTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";

export interface ICartState {
  totalPrice: number
  items: TCartItem[]
}

const { items, totalPrice } = getCartFromLS()

const initialState: ICartState = {
  totalPrice,
  items
}


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = setTotalPrice(state.items)
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem && findItem.count > 1) {
        findItem.count--
      }

      state.totalPrice = setTotalPrice(state.items)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = setTotalPrice(state.items)
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const selectCart = (state: RootState) => state.cart

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer