import React from 'react'
import "./index.css"
const MarksInput = ({placeholder,value,setValue,totalMarks,init_value,isLoading,onSubmit}) => {
    const handleChange = (e) => {
      const input = e.target.value;
      const regex = /^\d+(\.\d)?$/;
      if (input === "" || regex.test(input)) {
        setValue(input);
      }
    };
  return (
    <div className={`marks_input ${value===init_value || value===""?"":"enable"}`}>
        <div>
            <h3>{placeholder}</h3>
        </div>
        <div>
            <input placeholder={parseFloat(totalMarks/1.3).toFixed(2)} type='text' onChange={(e)=>{handleChange(e)}} value={value}></input>
            <span>/{totalMarks}</span>
        </div>
        <div>
            <button onClick={onSubmit} disabled={isLoading} className='btn_secondary'>{isLoading?<span className='btn_loading'></span>:<i className="fa-regular fa-arrow-right"></i>}</button>
        </div>
    </div>
  )
}

export default MarksInput