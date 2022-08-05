import { setTotalPrice } from "./setTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart")
  const items = data ? JSON.parse(data) : []
  const totalPrice = setTotalPrice(items)

  return {
    items,
    totalPrice
  }
}