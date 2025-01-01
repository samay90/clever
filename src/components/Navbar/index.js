import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import full_logo from "../../static/images/full_logo.png"
import './style.css'
import Dropdown from '../Dropdown'
import Icon from '../icon'
const Navbar = ({token,setLoading,setToken,api,user,classrooms}) => {
  const [side_open,setSide_Open] = useState(false)
  const logout = () =>{
    localStorage.setItem("token","")
    setToken("")

  } 
  return (
    <>
    {user?<div className='page home_page'>
      <div className='navbar'>
        <div className='nav_left'>
          <button className='hamburger_button nav_button' onClick={()=>{setSide_Open(!side_open)}}>
            <i className="fa-regular fa-bars"></i>
          </button>
          <div className='logo'>
            <Link to="/app/home"><img src={full_logo} alt='full_logo'/></Link>
          </div>
        </div>
        <div className='nav_right'>
          <button className='nav_button'><i className="fa-regular fa-plus"></i></button>
          <Dropdown opener={<button className='nav_button'>{user?user.first_name?<Icon url={user?.path} height={40} chr={user?.first_name[0]}/>:"":""}</button>}>
            <ul>
              <li><Link className='link' to="/app/profile"><i className="fa-regular fa-user"></i> My Profile</Link></li>
              <li><Link className='link' to="/app/settings"><i className="fa-regular fa-gear"></i> Settings</Link></li>
              <li><button className='link' onClick={()=>{logout()}}><i className="fa-solid fa-arrow-left-from-bracket"></i> Logout</button></li>
            </ul>
          </Dropdown>
          
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