import React, { useEffect } from 'react'
import {Routes,Route, useNavigate, useLocation} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Classroom from "./pages/Classroom"
const App = () => {
  const url = "http://192.168.0.107:9920"
  const [token,setToken] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [user,setUser] = React.useState({})
  const [classrooms,setClassroooms] = React.useState([])
  React.useEffect(() => {
    if (!token && location.pathname!=='/auth/signin' && location.pathname!=='/auth/signup'){
      const temp = localStorage.getItem("token")
      if (temp){
        setToken(temp)
      }else{
        navigate("/auth/signin")
      }
    }
  },[token,navigate,location])
  useEffect(() => {
    if (token){
      fetch(url+"/user/classrooms",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":"Bearer "+token
        }
      }).then((res)=>res.json()).then((data)=>{
          setClassroooms(data.data)
      })
    }
    if (token){
      fetch(url+"/user/profile",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":"Bearer "+token
        }
      }).then((res)=>res.json()).then((data)=>{
        if (data.error){
          toast.error(data.message,{
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
          setUser(data.data)
        }
      })
    }
  },[token])
  return (
    <> 
      <Toaster/>
      <Routes>
        <Route path='/auth/signin' element={<Signin api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/signup' element={<Signup api={url} token={token} setToken={setToken}/>}></Route>
        <Route path="/app" element={<Navbar classrooms={classrooms} user={user} token={token} api={url}/>}>
          <Route path="/app/home" element={<Home classrooms={classrooms} user={user} token={token} api={url}/>}></Route>
          <Route path="/app/classroom/:class_id" element={<Classroom classrooms={classrooms} user={user} token={token} api={url}/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App