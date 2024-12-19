import React from 'react'
import "./index.css"
import logo from '../../static/images/logo.png'
const Loading = ({loading}) => {
    React.useEffect(()=>{
        const div = document.getElementById('loading')
        if (!loading){
            div.classList.add('loading__off')
        }else{
            div.classList.remove('loading__off')
        }
    },[loading])
  return (
    <div id='loading'>
        <div className='logo'>
            <span></span>
            <img src={logo} alt='logo'/>
        </div>
    </div>
  )
}

export default Loading