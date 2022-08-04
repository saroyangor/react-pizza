export type TSort = {
  name: string,
  sortType: "rating" | "price" | "title"
}

export type TCartItem = {
  id: number
  name: string
  price: number
  type: string
  size: number
  count: number
  imageUrl: string
}

export type TPizzaBlock = {
  id: number
  name: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

export type TFetchPizzasArgs = {
  currentPage: number
  category: string
  sort: TSort
  search: string
}

export type TFilterState = {
  categoryId: number
  currentPage: number
  sort: TSort
  searchValue: string
  sortType: "rating" | "price" | "title"
}