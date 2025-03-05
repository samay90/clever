import React from 'react'
import "./index.css"
const FileInput = ({label,onChange,files,setFiles}) => {
  return (
    <div className='file_input'>
        <label htmlFor='file_input'>{label}</label>
        <input id='file_input' onChange={onChange} type="file" multiple></input>
        <div className='preview'>
            {files.map((file,i)=>(<div className='file' key={i}><p>{file.name}</p><i onClick={()=>{setFiles(prev=>prev.filter((_,j)=>j!==i))}} className="fa-regular fa-trash"></i></div>))}
        </div>
    </div>
  )
}

export default FileInput