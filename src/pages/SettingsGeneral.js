import { useContext, useState } from 'react'
import { UiContext } from '../store/UiContext'
import Radio from '../components/Radio'
import toast from 'react-hot-toast'

const SettingsGeneral = ({api,user}) => {
    const {theme,setTheme} = useContext(UiContext)
    const [loading,setLoading] = useState(false)
    const handleSubmit = async ()=>{
    setLoading(true)
    await fetch(api+"/auth/reset/password",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify({email:user.email})
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
      }
    })
  } 
  return (
    <div className='settings_form settings_general page'>
      <div className='form_header'>
        <h3>General</h3>
      </div>
        <div className='form_field' onClick={()=>{setTheme(theme==="light"?"dark":"light")}}>
            <div className='label'><h3>Theme</h3><p>Choose your preferred theme for the app interface.</p></div>
            <div className='button' ><Radio value={theme==="light"?0:1} onChange={(e)=>setTheme(e.target.value)}></Radio></div>
        </div>
        <div className='form_field'>
            <div className='label'><h3>Forgot Password</h3><p>Reset link will be sent to your email.</p></div>
            <div className='button' ><button className='btn_secondary' style={{width:"60px"}} onClick={handleSubmit} disabled={loading}>{loading?<span className='btn_loading'></span>:"Reset"}</button></div>
        </div>
    </div>
  )
}

export default SettingsGeneral