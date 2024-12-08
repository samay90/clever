import React from 'react'
import "../styles/Auth.css"
import InputPrimary from '../components/InputPrimary'
import CheckBox from '../components/Checkbox'
import ButtonPrimary from '../components/ButtonPrimary'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Signin = ({api,setToken}) => {
  const [form,setForm] = React.useState({
    "authenticator":"",
    "password":"",
  })
  const [checked,setChecked] = React.useState(false)
  const navigate = useNavigate()
  const handleSubmit = async ()=>{
    await fetch(api+"/auth/login  ",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(form)
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
        toast.success(data.message,{
          iconTheme:{primary:"#fff",secondary:"#5C60F5"},
          style:{
            borderRadius:"30px",
            background:"#5C60F5",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
        setToken(data.token)
        if (checked){
          localStorage.setItem("token",data.data.token)
        }else{
          localStorage.setItem("token","")
        }
        navigate("/home")
      }
    })
  }
  return (
    <>
      <div className='page'>
        <div className='side_bar'>
            <div className='logo'>
              <span className='logo_chr'>
                C
              </span>
                <h1>lever</h1>
            </div>
            <div className='content'>
              <h2>Let's learn<br/>something<br/>amazing today.</h2>
              <p>It's the power of new generation.<br/>Join the classroom today.</p>
            </div>
            <div className='vector'>
              <span></span>
            </div>
        </div>
        <div className='form_section'>
          <div className='inner_section'>
            <div className='header'>
              <h1>👋</h1>
              <h2>Nice to see you back!</h2>
            </div>
            <div className='form'>
              <InputPrimary placeholder="Email address or Username" type="text" value={form.authenticator} onChange={(e)=>{setForm({...form,authenticator:e.target.value})}}/>
              <InputPrimary placeholder="Password" type="password" value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
              <CheckBox placeholder="Keep me logged in" value={checked} onChange={()=>{setChecked(!checked)}}/>
              <ButtonPrimary arrow={true} onClick={handleSubmit}>Sign in</ButtonPrimary>
            </div>
            <div className='refer_section'>
              <span>OR</span>
              <p>Don't have an account? <Link className='link_secondary' to="/auth/signup">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin