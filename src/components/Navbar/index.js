import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import full_logo from "../../static/images/full_logo.png"
import './style.css'
import Dropdown from '../Dropdown'
import colors from '../../static/colors.json'
import conv from '../../static/banner.json'
import Icon from '../icon'
import ModalSecondary from '../ModalSecondary'
import InputSecondary from '../InputSecondary'
import TextArea from '../TextArea'
import toast from 'react-hot-toast'
import { UiContext } from '../../store/UiContext'
const Navbar = ({token,setToken,api,user,classrooms}) => {
  const {side_open,setSide_Open} = React.useContext(UiContext);
  const [open,setOpen] = useState(false)  
  const [createLoading,setCreateLoading] = useState(false)
  const [createClass,setCreateClass] = useState({
    class_name:"",
    class_description:""
  })
  const [joinOpen,setJoinOpen] = useState(false)
  const [joinLoading,setJoinLoading] = useState(false)
  const [join_code,setJoinCode] = useState("")
  const logout = () =>{
    localStorage.setItem("token","")
    setToken("")
  } 
  const createClassroom = async () =>{
    setCreateLoading(true)
    const raw = await fetch(api+"/user/class/new",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify(createClass)
    })
    const parsed = await raw.json()
    setCreateLoading(false)
    if (parsed.error){
      toast.error(parsed.message, {
        iconTheme:{primary:"#fff",secondary:"#5C60F5"},
        style:{
          borderRadius:"30px",
          background:"#5C60F5",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      })
    }else{
      toast.success(parsed.message, {
        iconTheme:{primary:"#fff",secondary:"#5C60F5"},
        style:{
          borderRadius:"30px",
          background:"#5C60F5",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      })
    }
  }
  const joinClassroom = async () =>{
    setJoinLoading(true)
    const raw = await fetch(api+"/user/class/join",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({join_code})
    })
    const parsed = await raw.json()
    setJoinLoading(false)
    if (parsed.error){
      toast.error(parsed.message, {
        iconTheme:{primary:"#fff",secondary:"#5C60F5"},
        style:{
          borderRadius:"30px",
          background:"#5C60F5",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      })
    }else{
      toast.success(parsed.message, {
        iconTheme:{primary:"#fff",secondary:"#5C60F5"},
        style:{
          borderRadius:"30px",
          background:"#5C60F5",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      })
    }
  }
  const navigate = useNavigate()
  return (
    <>
    <ModalSecondary open={open} setOpen={setOpen} heading={"Create Classroom"}>
        <div className='nav_form'>
          <InputSecondary placeholder="Classroom Name" value={createClass.class_name} type="text" secondary_placeholder="The Nerd Herd" onChange={(e)=>{setCreateClass(prev=>({...prev,class_name:e.target.value}))}} maxLength={50} disabled={false} />
          <TextArea placeholder="Classroom Description" type="text" value={createClass.class_description} secondary_placeholder="Here we learn about all the things that is not realted to purpose for what it is made." onChange={(e)=>{setCreateClass(prev=>({...prev,class_description:e.target.value}))}} maxLength={200} disabled={false} />
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setOpen(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"80px"}} disabled={createLoading} onClick={createClassroom}>{createLoading?<span className='btn_loading'/>:"Create"}</button>
          </div>
        </div>
    </ModalSecondary>
    <ModalSecondary open={joinOpen} setOpen={setJoinOpen} heading={"Join Classroom"}>
        <div className='nav_form'>
          <InputSecondary placeholder="Classroom Code" value={join_code} type="text" secondary_placeholder="Ask to teacher" onChange={(e)=>{setJoinCode(e.target.value)}} disabled={false} />
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setJoinOpen(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"80px"}} disabled={joinLoading} onClick={joinClassroom}>{joinLoading?<span className='btn_loading'/>:"Join"}</button>
          </div>
        </div>
    </ModalSecondary>
    {user?<div className='page home_page'>
      <div className='navbar'>
        <div className='nav_left'>
          <button className='hamburger_button nav_button' onClick={()=>{setSide_Open(!side_open)}}>
            <div className={`hamburger ${side_open?"ham_open":""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {/* <i className={"fa-regular fa-bars" + (side_open?" ham_open":"")}></i> */}
          </button>
          <div className='logo'>
            <Link to="/app/home"><img src={full_logo} alt='full_logo'/></Link>
          </div>
        </div>
        <div className='nav_right'>
        <Dropdown opener={<button className='nav_button'><i className="fa-regular fa-plus"></i></button>}>
            <ul>
              <li><button onClick={()=>{setOpen(true)}} className='link'><i className="fa-regular fa-sparkles"></i>Create</button></li>
              <li><button onClick={()=>{setJoinOpen(true)}} className='link'><i className="fa-regular fa-object-exclude"></i>Join</button></li>
            </ul>
          </Dropdown>
          
          <Dropdown opener={<button className='nav_button'>{user?user.first_name?<Icon url={user?.file_name?api+"/profile/"+user.file_name:""} height={40} chr={user?.first_name[0]+user?.last_name[0]}/>:"":""}</button>}>
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
                return <div key={key} onClick={()=>{navigate(`/app/classroom/${classroom.class_id}`)}} className='class_placeholder' style={{"--bg":colors[conv[classroom.banner_id]]}}>
                <div className='icon' ><h1>{classroom.class_name[0]}</h1></div>
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