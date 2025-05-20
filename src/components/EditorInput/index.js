import React from 'react'
import "./index.css"
const EditorInput = ({maxLength,value,setValue,placeholder,fontSize,color}) => {
  return (
    <div className='editor_input'>
        <input placeholder={placeholder} maxLength={maxLength} style={{fontSize:fontSize,color:color}} type="text" value={value} onChange={setValue} />
    </div>
  )
}

export default EditorInput