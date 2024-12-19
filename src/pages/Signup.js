import React from 'react'
import "../styles/Auth.css"
import InputPrimary from '../components/InputPrimary'
import CheckBox from '../components/Checkbox'
import ButtonPrimary from '../components/ButtonPrimary'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import full_logo from "../static/images/full_logo.png"
const Signup = ({api,setToken}) => {
  const [form,setForm] = React.useState({
    "email":"",
    "phone_no":"",
    "password":"",
    "first_name":"",
    "last_name":""
  })
  const [checked,setChecked] = React.useState(false)
  const navigate = useNavigate()
  const handleSubmit = async ()=>{
    await fetch(api+"/auth/signup",{
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
        setToken(data.data.token)
        if (checked){
          localStorage.setItem("token",data.data.token)
        }else{
          localStorage.setItem("token","")
        }
        navigate("/app/home")
      }
    })
  }
  return (
    <>
      <div className='page auth_page'>
        <div className='side_bar'>
            <div className='logo'>
                <img className='logo_img' src={full_logo} alt="Full Logo" />
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
              <h2>Nice to see you!</h2>
            </div>
            <div className='form'>
              <div className='divider'>
              <InputPrimary placeholder="First name" type="text" value={form.first_name} onChange={(e)=>{setForm({...form,first_name:e.target.value})}}/>
              <InputPrimary placeholder="Last name" type="text" value={form.last_name} onChange={(e)=>{setForm({...form,last_name:e.target.value})}}/>
              </div>
              <InputPrimary placeholder="Email address" type="email" value={form.email} onChange={(e)=>{setForm({...form,email:e.target.value})}}/>
              <InputPrimary placeholder="Phone number" type="number" value={form.phone_no} onChange={(e)=>{setForm({...form,phone_no:e.target.value})}}/>
              <InputPrimary placeholder="Password" type="password" value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
              <CheckBox placeholder="Keep me logged in" value={checked} onChange={()=>{setChecked(!checked)}}/>
              <ButtonPrimary arrow={true} onClick={handleSubmit}>Sign up</ButtonPrimary>
            </div>
            <div className='refer_section'>
              <span>OR</span>
              <p>Have an account? <Link className='link_secondary' to="/auth/signin">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup