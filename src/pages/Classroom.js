import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import "../styles/Classroom.css"
import ClassroomStream from './ClassroomStream'
import ClassroomSettings from './ClassroomSettings'
import ClassroomClass from './ClassroomClass'
import ResourceRouter from '../components/ResourceRouting'
import AssignmentRouter from '../components/AssignmentRouting'
const Classroom = ({token,setLoading,user,classrooms,api}) => {
  const {class_id} = useParams()
  const [data,setData] = React.useState([])
  const [classroom,setClassroom] = React.useState({})
  const [loading2,setLoading2] = React.useState(false);
  const [current,setCurrent] = React.useState("stream")
  const location = useLocation()
  useEffect(()=>{
    setData([])
  },[class_id])
  useEffect(()=>{
    const temp = classrooms.filter((ele) => ele.class_id===parseInt(class_id))[0]
    setClassroom(temp)
  },[classrooms,class_id])
  useEffect(()=>{
    if (token && api && class_id ){
      setLoading(false)
      setLoading2(true)
      const getClassroom = async () =>{
        const req =await fetch(api+"/classroom/"+class_id, {
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+token
          }
        })
        const data =await req.json()
        if (data.error){
          setLoading2(false)
          toast.error(data.message, {
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
          setLoading(false)
          setLoading2(false)
          setData(data.data)
        }
      }
      getClassroom()
    }
  },[token,api,class_id,setLoading,classroom])
  useEffect(()=>{
    const temp  = location.pathname.split("/")
    if (!temp[4]){
      setCurrent("stream")
    }else{
      setCurrent(temp[4])
    }
  },[location.pathname])
  
  return (
    <>
    <div className='page classroom_page'>
      <div className='navigation' >
        <div className='tabs'>
          <div className={`tab ${current==="stream"?"active":""}`}><Link to="" className='tab_link'><i className="fa-regular fa-airplay"></i><span>Stream</span></Link></div>
          <div className={`tab ${current==="myclass"?"active":""}`}><Link to="myclass" className='tab_link'><i className="fa-regular fa-screen-users"></i><span>My</span> Class</Link></div>
          <div className={`tab ${current==="about"?"active":""}`}><Link to="about" className='tab_link'><i className="fa-regular fa-circle-info"></i><span>About</span></Link></div>
          {classroom&&classroom.role==="creator"?<div className={`tab ${current==="settings"?"active":""}`}><Link to="settings" className='tab_link'><i className="fa-regular fa-sliders"></i><span>Settings</span></Link></div>:""}
        </div>
      </div>
      <Outlet/>
      <Routes>
        <Route path='/' element={<ClassroomStream loading={loading2} token={token} classroom={classroom} data={data} api={api}/>}/>
        <Route path='/assignment/:assignment_id/*' element={<AssignmentRouter api={api} user={user} classroom={classroom} class_id={class_id} token={token}/>}/>
        <Route path='/resource/:resource_id/*' element={<ResourceRouter api={api} user={user} class_id={class_id} classroom={classroom} token={token}/>}/>
        <Route path='/settings' element={<ClassroomSettings user={user} api={api} classroom={classroom} class_id={class_id} token={token}/>}/>
        <Route path='/myclass' element={<ClassroomClass api={api} user={user} classroom={classroom} class_id={class_id} token={token}/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default Classroom