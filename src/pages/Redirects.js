import React from 'react'
import toast from 'react-hot-toast'
import { Route, Routes, useParams } from 'react-router-dom'

const Redirects = ({api,token}) => {

  const {join_code} = useParams()
  const join_classroom = async() =>{
    const raw = await fetch(api+`/classroom/join`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({join_code:join_code})
    })
    const parsed = await raw.json()
    if (parsed.error){
      toast.error(parsed.message,{
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
      toast.success(parsed.message,{
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
  }
  return (
    <>
    <h1>asdsd</h1>
    <Routes> 
      <Route path='/join/:join_code' action={join_classroom}></Route>
    </Routes>
    </>
  )
}

export default Redirects