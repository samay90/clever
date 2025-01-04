import React, { useEffect } from 'react'
import {Routes,Route, useNavigate, useLocation} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Classroom from "./pages/Classroom"
import Loading from './components/Loading'
import CommandBox from './components/CommandBox'

const App = () => {
  const url = "http://192.168.0.107:9920"
  const [token,setToken] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [user,setUser] = React.useState({})
  const [classrooms,setClassroooms] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  useEffect(() => {
    const navigateToLogin = () =>{
      if (location.pathname!=="/auth/signup" && location.pathname!=="/auth/signin"){
        navigate("/auth/signin")
      }
    } 
    if (!token){
      const temp = localStorage.getItem("token")
      if (temp){
        setToken(temp)
      }else{
        navigateToLogin()
        setLoading(false)
      }
    }
  },[token,navigate,location.pathname])
  useEffect(() => {
    if (token){
      setLoading(true)
      const getClassrooms = async () =>{
        const req =await fetch(url+"/user/classrooms",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+token
          }
        })
        const parsed =await req.json()
        if (parsed.error){
          localStorage.setItem("token","")
          setToken("")
        }else{
          setClassroooms(parsed.data)
        }
      }
      const getUser = async () => {
        const req =await fetch(url+"/user/profile",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+token
          }
        })
        const data =await req.json()
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
          setLoading(false)
        }
      }
      getClassrooms()
      getUser()
    }
  },[token])
  return (
    <> 
      <Toaster/>
      <CommandBox classrooms={classrooms}/>
      <Loading loading={loading}/>
      <Routes>
        <Route path='/auth/signin' element={<Signin api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/signup' element={<Signup api={url} token={token} setToken={setToken}/>}></Route>
        <Route path="/app" element={<Navbar setLoading={setLoading} classrooms={classrooms} user={user} token={token} setToken={setToken} api={url}/>}>
          <Route path="/app/home" element={<Home classrooms={classrooms} user={user} token={token} api={url}/>}></Route>
          <Route path="/app/classroom/:class_id/*" element={<Classroom classrooms={classrooms} setLoading={setLoading} user={user} token={token} api={url}/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App