import React, { useEffect, useRef } from 'react'
import "./index.css"
const Modal = ({children,title,isOpen,setIsOpen,onSubmit}) => {
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  useEffect(()=>{
    const ele = document.getElementsByClassName("modal_page_content")[0];
    if (isOpen){
      ref3.current.style.display = "flex";
      ele.style.transform = "scale(0.95)";
      setTimeout(()=>{
        ref2.current.style.bottom = 0+"px";
        ref3.current.style.background=" #00000060";
      },[2])
    }else{
      ele.style.transform = "scale(1)";
      ref2.current.style.bottom = -1*ref2.current.offsetHeight+50+"px";
      ref3.current.style.background=" #00000000";
      setTimeout(()=>{
        ref3.current.style.display = "none";
      },[300])
    }
  },[isOpen])
  useEffect(()=>{
    document.addEventListener("keydown",(e)=>{
      if (e.key === "Escape"){
        setIsOpen(false);
      }
    })
  },[setIsOpen])
  return (
    <div className={`modal ${!isOpen?"modal_closed":""}`} ref={ref} >
        <div ref={ref3} className='modal_overlay' onClick={()=>{setIsOpen(false)}}></div>
        <div className='container' ref={ref2}>

          <div className='top_content' onClick={()=>{setIsOpen(!isOpen)}}>
              <div className='title'>{title}</div>
              <div className='close_button' ><i className="fa-regular fa-chevron-down"></i></div>
          </div>

          <div className='content'>{children}</div>
          <div className='bottom_content'>
            <button className='button-1' onClick={()=>{setIsOpen(false)}}>Cancel</button>
            <button className='button-2' onClick={onSubmit}>Submit</button>
          </div>

        </div>
    </div>
  )
}

export default Modal