import React from 'react'
import "./index.css"
const Icon = ({url,chr,height}) => {
  return (
    <div className='icon_image'>
        {url?<img src={url} alt='icon_img'/>:""}
        <h2 style={{fontSize:((18/40)*height).toString()+"px"}}>{chr.toUpperCase()}</h2>
    </div>
  )
}

export default Icon