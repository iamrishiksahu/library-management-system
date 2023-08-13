import React from 'react'
import "./Card.css"

const Card = ({ title, count, bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="card-container">

      <p className='card-title'>{title}</p>
      <p className="card-count">
        {count}
      </p>


    </div>
  )
}

export default Card