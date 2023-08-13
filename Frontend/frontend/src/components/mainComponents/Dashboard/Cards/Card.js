import React from 'react'
import "./Card.css"

const Card = ({ title, count, icon, bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="card-container">
      <div className="left">
        <p className='card-title'>{title}</p>
        <p className="card-count">
          {count}
        </p>
      </div>
      <div className="right">
        <icon/>
      </div>

    </div>
  )
}

export default Card