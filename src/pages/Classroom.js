import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import "../styles/Classroom.css"
import ClassroomStream from './ClassroomStream'
import ClassroomAssignment from './ClassroomAssignment'
import ClassroomResource from './ClassroomResource'
const Classroom = ({token,setLoading,user,classrooms,api}) => {
  const {class_id} = useParams()
  const [data,setData] = React.useState([])
  const [classroom,setClassroom] = React.useState({})
  const [current,setCurrent] = React.useState("stream")
  const location = useLocation()
  useEffect(()=>{
    if (token && api && class_id){
      setLoading(false)
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
          setData(data.data)
        }
      }
      getClassroom()
    }
  },[token,api,class_id,setLoading])
  useEffect(()=>{
    const temp = classrooms.filter((ele) => ele.class_id===parseInt(class_id))[0]
    setClassroom(temp)
  },[classrooms,class_id])
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
        <ul>
          <li className={current==="stream"?"active":""}><Link to="" className='tab_link'><i className="fa-regular fa-airplay"></i>Stream</Link></li>
          <li className={current==="myclass"?"active":""}><Link to="myclass" className='tab_link'><i className="fa-regular fa-screen-users"></i>My Class</Link></li>
          <li className={current==="about"?"active":""}><Link to="about" className='tab_link'><i className="fa-regular fa-circle-info"></i>About</Link></li>
        </ul>
      </div>
      <Outlet/>
      <Routes>
        <Route path='/' element={<ClassroomStream classroom={classroom} data={data} api={api}/>}/>
        <Route path='/assignment/:assignment_id' element={<ClassroomAssignment api={api} classroom={classroom} class_id={class_id} token={token}/>}/>
        <Route path='/resource/:resource_id' element={<ClassroomResource api={api} class_id={class_id} classroom={classroom} token={token}/>}/>
      </Routes>
    </div>
    </>
  )
}

export default Classroom