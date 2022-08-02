import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import qs from "qs"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "../redux/slices/filterSlice"

import Categories from "../components/Categories"
import Sort, { sortList } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import PizzaBlock from "../components/PizzaBlock"
import Pagination from "../components/Pagination"


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, searchValue, currentPage } = useSelector(state => state.filter)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setLoading] = useState(true)

  const fetchPizzas = () => {
    setLoading(true)

    const category = categoryId > 0 ? `&category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    axios.get(`https://62e28192e8ad6b66d85d08a4.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sort.sortType}&order=desc${search}`
    )
      .then(res => {
        setPizzas(res.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortType === params.sortType)

      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)

    if(!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
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
  const items = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : items
        }
      </div>
      <Pagination/>
    </div>
  )
}

export default Home