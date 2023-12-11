import React from 'react'

const PublicItemTop = ({ title }) => {
  return (
    <div>
      <div className="big_collection_item_top">
        <span>{title}</span>
        <i className="fa-regular fa-star one_ic"></i>
        <i className="fa-solid fa-star two_ic"></i>
      </div>
    </div>
  )
}

export default PublicItemTop