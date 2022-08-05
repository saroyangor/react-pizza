import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={ 1 }
      width={ 280 }
      height={ 500 }
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="135" cy="135" r="125"/>
      <rect x="0" y="280" rx="10" ry="10" width="280" height="20"/>
      <rect x="0" y="322" rx="10" ry="10" width="280" height="88"/>
      <rect x="0" y="443" rx="9" ry="9" width="95" height="30"/>
      <rect x="128" y="430" rx="24" ry="24" width="152" height="45"/>
    </ContentLoader>
  </div>
)
