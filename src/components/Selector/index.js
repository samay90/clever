import React from 'react'
import "./index.css"
const Selector = ({defaultValue,placeholder,option,value,onChange}) => {
  return (
    <div className='option_selector'>
        <label>{placeholder}</label>
        <select defaultValue={defaultValue} value={value} onChange={onChange}>
            {option.map((opt,i)=>(<option key={i} value={opt}>{opt}</option>))}
        </select>
    </div>
  )
}

export default Selector