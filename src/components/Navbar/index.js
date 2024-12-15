import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import full_logo from "../../images/full_logo.png"
import './style.css'
const Navbar = ({token,api,user,classrooms}) => {
  const [side_open,setSide_Open] = useState(true)
  return (
    <>
    {user?<div className='page home_page'>
      <div className='navbar'>
        <div className='nav_left'>
          <button className='hamburger_button nav_button' onClick={()=>setSide_Open(!side_open)}>
            <i className="fa-regular fa-bars"></i>
          </button>
          <div className='logo'>
            <Link to="/app/home"><img src={full_logo} alt='full_logo'/></Link>
          </div>
          <div className='divider'>{">"}</div>
          <div className='breadcrumb'>
            <Link to="/app/home" className='breadcrumb_item'>Science</Link>
          </div>
        </div>
        <div className='nav_right'>
          <button className='nav_button'><i className="fa-regular fa-plus"></i></button>
          <button className='nav_button'>{user.path?<img src={user.path} alt='profile'/>:<span>{"A"}</span>}</button>
        </div>
      </div>
      <div className='main'>
        <div id='sidebar' className={`side_bar ${side_open?"sidebar_open":""}`}>
            <div className='class_title'>
              <div className='icon'><i className="fa-regular fa-screen-users"></i></div>
              <div className='title'>Classrooms</div>
            </div>
            {
              classrooms.map((classroom,key)=>{
                return <div key={key} className='class_placeholder'>
                <div className='icon'><h1>{classroom.class_name[0]}</h1></div>
                <div className='class_name'>
                  <h2>{classroom.class_name}</h2>
                  <p>{classroom.class_description}</p>
                </div>
              </div>
              })
            }
        </div>
        <div className={`content ${side_open?"content_shrink":""}`}>
          <Outlet/>
        </div>
      </div>
    </div>:""}
    </>
  )
}

export default Navbar