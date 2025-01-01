import React, { useRef } from 'react'
import './index.css'
const TextArea = ({placeholder,maxLength,secondary_placeholder,onChange,value}) => {
  const textAreaRef = useRef(null);
  const handleChange = (e) => {
    onChange(e)
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight-20 + "px";
  };
  return (
    <div className='text-area'>
        <textarea ref={textAreaRef} id='text-area' maxLength={maxLength} placeholder={secondary_placeholder??" "} onChange={handleChange} value={value} />
        <label>{placeholder}</label>
    </div>
  )
}

export default TextArea