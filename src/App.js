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
import Redirects from './pages/Redirects'
import {UiContext} from './store/UiContext'
import Settings from './pages/Settings'
import SettingsProfile from './pages/SettingsProfile'
import FileViewer from './components/FileViewer'
import SettingsGeneral from './pages/SettingsGeneral'
import VerifyUser from './pages/VerifyUser'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
const App = () => {
  const url = "https://clever-alpha.onrender.com"
  // https://clever-alpha.onrender.com
  const [token,setToken] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [user,setUser] = React.useState({})
  const [classrooms,setClassroooms] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  const [side_open,setSide_Open] = React.useState(false)
  const [crr,setCrr] = React.useState(-1);
  const [files,setFiles] = React.useState([]);
  const [rClassRoom,refreshClassroom] = React.useState(1);
  const [rUser,refreshUser] = React.useState(1);
  const [theme,setTheme] = React.useState(null);
  useEffect(()=>{
    const getTheme = async () =>{
      const temp =await localStorage.getItem("theme")
      if (theme===null){
        if (!temp){
          localStorage.setItem("theme","light")
          setTheme("light")
        }else{
          setTheme(temp)
        }
      }else{
        if (temp!==theme){
          localStorage.setItem("theme",theme)
        }
      }
      document.documentElement.setAttribute('data-theme', theme);
    }
    getTheme()
  },[theme])
  useEffect(() => {
    const navigateToLogin = () =>{
      if (location.pathname.split("/")[1]!=="auth"){
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
          setLoading(false)
        }
      }
      
      getClassrooms()
    }
  },[token,rClassRoom])
  useEffect(()=>{     
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
            iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
            style:{
              borderRadius:"30px",
              background:"var(--primary-color)",
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
      if (token){
        getUser()
      }
  },[token,rUser])
  useEffect(() => {
    if (location.pathname==="/"){navigate("/app/home")}
  },[location.pathname,navigate])
  return (
    <> 
      <Toaster/>
      <CommandBox classrooms={classrooms}/>
      <Loading loading={loading}/>
      <UiContext.Provider value={{side_open:side_open,setSide_Open:setSide_Open,crr:crr,setCrr:setCrr,files:files,setFiles:setFiles,theme,setTheme}}>
      <FileViewer/>
      <Routes>
        <Route path='/auth/signin' element={<Signin api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/signup' element={<Signup api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/forgot/password' element={<ForgotPassword api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/reset/password/:slug' element={<ResetPassword api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/verify/:slug' element={<VerifyUser api={url} token={token} setToken={setToken}/>}></Route>
        <Route path="/app" element={<Navbar refreshClassroom={refreshClassroom} setLoading={setLoading} classrooms={classrooms} user={user} token={token} setToken={setToken} api={url}/>}>
          <Route path="/app/home" element={<Home refreshClassroom={refreshClassroom} refreshUser={refreshUser} classrooms={classrooms} user={user} token={token} api={url}/>}></Route>
          <Route path="/app/classroom/:class_id/*" element={<Classroom refreshClassrooms={refreshClassroom} refreshUser={refreshUser} classrooms={classrooms} setLoading={setLoading} user={user} token={token} api={url}/>}></Route>
          <Route path='/app/settings/*' element={<Settings api={url} token={token} user={user}/>}>
            <Route path="" element={<SettingsProfile refreshUser={refreshUser} api={url} token={token} user={user}/>}></Route>
            <Route path="general" element={<SettingsGeneral api={url} token={token} user={user}/>}></Route>
          </Route>
        </Route>
        <Route path='/redirect/*' element={<Redirects api={url} token={token}/>}></Route>
      </Routes>
      </UiContext.Provider>
    </>
  )
}

export default App