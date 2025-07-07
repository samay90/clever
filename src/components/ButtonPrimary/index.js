import React from 'react'
import './index.css'
const ButtonPrimary = ({children,disabled,onClick}) => {
  return (
    <button disabled={disabled} onClick={onClick} className='button_primary'>
        {children}
    </button>
  )
}

export default ButtonPrimary