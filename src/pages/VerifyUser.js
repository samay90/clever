import React, { useEffect } from 'react'
import "../styles/Auth.css"
import ButtonPrimary from '../components/ButtonPrimary'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import full_logo from "../static/images/full_logo.png"
import OtpInput from '../components/OTPInput'
const VerifyUser = ({api,setToken}) => {
  const [otp,setOpt] = React.useState()
  const [loading,setLoading] = React.useState(false)
  const {slug} = useParams();
  const {state} = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    if (!state?.email ){
      navigate("/auth/signup")
    }
  },[state,navigate])
  const handleSubmit = async ()=>{
    setLoading(true)
    await fetch(api+"/auth/verify/"+slug,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify({code:otp})
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
              <h1>Check your email</h1>
              <h3>Enter the code sent to <br/><span style={{color:"var(--primary-color)",fontSize:"14px"}}>{state?.email}</span></h3>
            </div>
            <div className='form'>
                <OtpInput onChange={(t)=>setOpt(t)}/>
                <br/>
                <ButtonPrimary disabled={loading} onClick={handleSubmit}>{loading?<span className='btn_loading'></span>:<>Verify &nbsp;<i className="fa-regular fa-arrow-right"></i></>}</ButtonPrimary>
            </div>
            <div className='header'>
              <p>Code expires in 10 minutes.</p>
            </div>
            <div className='refer_section'>
              <span>OR</span>
              <p>Didn't receive the code? <Link className='link_secondary' to="/auth/signup">Sign up</Link></p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyUser