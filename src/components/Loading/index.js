import React from 'react'
import "./index.css"
import logo from '../../static/images/logo3.png'
const Loading = ({loading}) => {
    React.useEffect(()=>{
        const div = document.getElementById('loading')
        if (!loading){
            div.classList.add('loading__off')
            setTimeout(()=>{div.style.display="none"},300)
        }else{
            div.style.display="flex"
            setTimeout(()=>{div.classList.remove('loading__off')},10)
        }
    },[loading])
  return (
    <div id='loading'>
        <div className='logo'>
            <span></span>
            <img src={logo} alt='logo'/>
        </div>
        <div className='new_feature'>
            New feature. ctrl+spc to search
        </div>
    </div>
  )
}

export default Loading