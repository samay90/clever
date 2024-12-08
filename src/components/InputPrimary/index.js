import React from 'react'
import './index.css'
const InputPrimary = ({placeholder,type,onChange,value}) => {
  return (
    <div className='input-field'>
        <label>{placeholder}</label>
        <input type={type} onChange={onChange} value={value} />
    </div>
  )
}

export default InputPrimary