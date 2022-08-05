import { TCartItem } from "../@types/types";

export const setTotalPrice = (items: TCartItem[]) => {
  console.log(items.reduce((sum, obj) => obj.price * obj.count + sum, 0))
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}