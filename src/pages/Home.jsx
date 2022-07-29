import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import Pagination from "../components/Pagination"
import { SearchContext } from "../App"


const Home = () => {
  const { searchValue } = useContext(SearchContext)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({ name: "популярности", sort: "rating" })

  useEffect(() => {
    setLoading(true)
    axios.get(`https://62e28192e8ad6b66d85d08a4.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sort}&order=desc${searchValue ? `&search=${searchValue}` : ""}`
    )
      .then(res => {
        setPizzas(res.data)
        setLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, currentPage, searchValue])

  const skeletons = [...new Array(4)].map((_, idx) => <Skeleton key={idx}/>)
  const items = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId}/>
        <Sort value={sortType} onChangeSort={setSortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : items
        }
      </div>
      <Pagination onChangePage={setCurrentPage}/>
    </div>
  )
}

export default Home