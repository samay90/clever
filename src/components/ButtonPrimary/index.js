import React from 'react'
import './index.css'
const ButtonPrimary = ({children,arrow,onClick}) => {
  return (
    <button onClick={onClick} className='button_primary'>
        <span className={!arrow?"no_margin":""}>{children}</span>
        {arrow?<span><i className="fa-regular fa-arrow-right"></i></span>:""}
    </button>
  )
}

export default ButtonPrimary