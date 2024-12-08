import React from 'react'
import './index.css'
const CheckBox = ({placeholder,onChange,value}) => {
  return (
    <div className='checkbox'>
        <input type="checkbox" checked={value} onChange={onChange} />
        <label htmlFor="checkbox">{placeholder}</label>
    </div>
  )
}

export default CheckBox