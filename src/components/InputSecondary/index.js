import React from 'react'
import './index.css'
const InputSecondary = ({placeholder,secondary_placeholder,type,onChange,value,maxLength,disabled,autoFocus}) => {
  return (
    <div className='input-field_sec'>
        <input placeholder={secondary_placeholder??" "} autoFocus={autoFocus} disabled={disabled} maxLength={maxLength} type={type} onChange={onChange} value={value} />
        <label>{placeholder}</label>
    </div>
  )
}

export default InputSecondary