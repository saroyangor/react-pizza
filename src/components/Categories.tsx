import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCategoryId } from "../redux/slices/filterSlice"
import { RootState } from "../redux/store";


export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const categoryId = useSelector((state: RootState) => state.filter.categoryId)

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => (
            <li
              key={ category }
              className={ categoryId === index ? "active" : "" }
              onClick={ () => dispatch(setCategoryId(index)) }
            >
              { category }
            </li>
          ))
        }
      </ul>
    </div>
  )
})
