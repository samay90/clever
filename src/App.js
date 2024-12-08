import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const url = "http://192.168.0.107:9920"
  const [token,setToken] = React.useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token){
      navigate("/auth/signin")
    }
  },[token,navigate])
  return (
    <> 
      <Toaster/>
      <Routes>
        <Route path='/auth/signin' element={<Signin api={url} token={token} setToken={setToken}/>}></Route>
        <Route path='/auth/signup' element={<Signup api={url} token={token} setToken={setToken}/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App