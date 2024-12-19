import React from 'react'
import "./index.css"
const Dropdown = ({opener,children}) => {
  return (
    <div className='dropdown'>
        <div className='dropdown_opener'>
    	    {opener}
        </div>
        <div className='dropdown_arrow'>
            <span></span>
        </div>
        <div className='dropdown_content'>
            {children}
        </div>
    </div>
  )
}

export default Dropdown