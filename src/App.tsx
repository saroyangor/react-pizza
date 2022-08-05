import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import "./scss/app.scss"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Loader from "./components/Loader";

const Cart = React.lazy(() => import("./pages/Cart"))
const NotFound = React.lazy(() => import("./pages/NotFound"))


function App() {
  return (
    <Routes>

      <Route path="/" element={ <MainLayout/> }>
        <Route path="" element={ <Home/> }/>
        <Route path="cart" element={
          <Suspense fallback={ <Loader/> }>
            <Cart/>
          </Suspense>
        }/>
        <Route path="*" element={
          <Suspense fallback={ <Loader/> }>
            <NotFound/>
          </Suspense> }/>
      </Route>
    </Routes>
  )
}

export default App
