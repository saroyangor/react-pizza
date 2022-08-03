import React, { useEffect, useRef } from "react"
import qs from "qs"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "../redux/slices/filterSlice"
import { fetchPizzas } from "../redux/slices/pizzasSlice"

import Categories from "../components/Categories"
import Sort, { sortList } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import Pagination from "../components/Pagination"


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = useRef(false)

  const { categoryId, sort, searchValue, currentPage } = useSelector(state => state.filter)
  const { items, status } = useSelector(state => state.pizzas)

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    dispatch(fetchPizzas({
      currentPage,
      category,
      sort,
      search
    }))

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortType === params.sortType)

      dispatch(setFilters({
        ...params,
        sort
      }))
    }
  }, [dispatch])

  useEffect(() => {
    getPizzas()
  }, [sort.sortType, currentPage, categoryId, searchValue])

  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort.sortType,
        categoryId,
        currentPage
      })

      navigate((`?${queryString}`))
    }
    isMounted.current = true
  }, [sort.sortType, currentPage, categoryId, navigate])

  const skeletons = [...new Array(4)].map((_, idx) => <Skeleton key={idx}/>)
  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению не удалось получить пиццы. Попробуйте повторить запрос позже.</p>
          </div>
        ) : <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      }

      <Pagination/>
    </div>
  )
}

export default Home