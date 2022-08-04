import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { TCartItem } from "../../@types/types";

interface ICartState {
  totalPrice: number
  items: TCartItem[]
}

const initialState: ICartState = {
  totalPrice: 0,
  items: []
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem && findItem.count > 0) {
        findItem.count--
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
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