import React from 'react'
import './index.css'
const Radio = ({value}) => {
  return (
    <div className={`radio ${value===1?"active":""}`}>
        <span ></span>
    </div>
  )
}

export default Radio