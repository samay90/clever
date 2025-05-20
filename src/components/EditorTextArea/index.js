import React, { useEffect, useRef } from 'react'
import "./index.css"
const EditorTextArea = ({maxLength,value,setValue,placeholder,fontSize,color}) => {
  const textAreaRef = useRef(null);

    useEffect(()=>{
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    },[value])
  return (
    <div className='editor_textarea'>
        <textarea ref={textAreaRef} placeholder={placeholder} maxLength={maxLength} style={{fontSize:fontSize,color:color}} type="text" value={value} onChange={setValue} />
    </div>
  )
}

export default EditorTextArea