import React from 'react'
import "../styles/Auth.css"
import InputPrimary from '../components/InputPrimary'
import ButtonPrimary from '../components/ButtonPrimary'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import full_logo from "../static/images/full_logo.png"
const ResetPassword = ({api,setToken}) => {
  const [form,setForm] = React.useState({
    password:"",
    confirm_password:""
  })
  const [loading,setLoading] = React.useState(false)
  const {slug} = useParams();
  const navigate = useNavigate()
  const handleSubmit = async ()=>{
    setLoading(true)
    await fetch(api+"/auth/reset/password/"+slug,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(form)
    }).then((res)=>res.json()).then((data)=>{
      if (data.error){
        setLoading(false)
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
        setLoading(false)
        toast.success(data.message,{
          iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
          style:{
            borderRadius:"30px",
            background:"var(--primary-color)",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
        localStorage.setItem("token",data.data.token)
        setToken(data.data.token)
        navigate("/")
      }
    })
  }
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
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
              <h2>Reset your password!</h2>
            </div>
            <div className='form'>
              <InputPrimary placeholder="Password" type="password" value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
              <InputPrimary placeholder="Confirm Password" type="password" value={form.confirm_password} onChange={(e)=>{setForm({...form,confirm_password:e.target.value})}}/>
              <ButtonPrimary disabled={loading||(form.password!==form.confirm_password)||(!passwordRegex.test(form.password))} onClick={handleSubmit}>{loading?<span className='btn_loading'></span>:<>Reset &nbsp;<i className="fa-regular fa-arrow-right"></i></>}</ButtonPrimary>
            </div>
            <div className='header'>
                <p>
                    {!passwordRegex.test(form.password)?"Password should be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character":""}
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword