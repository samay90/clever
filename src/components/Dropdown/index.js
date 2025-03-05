import React from 'react'
import "./index.css"
const Dropdown = ({opener,children}) => {
  const [open,setOpen] = React.useState(false)
  return (
    <div className='dropdown'>
        <div className={'dropdown_opener ' + (open?"dropdown_open":"")} onClick={() => setOpen(!open)}> 
    	    {opener}
        </div>
        <div onClick={()=>{setOpen(false)}} className={'dropdown_content ' + (open?"dropdown_content_open":"")}>
            {children}
        </div>
        <div className='dropdown_overlay' onClick={()=>{setOpen(false)}}></div>
    </div>
  )
}

export default Dropdown