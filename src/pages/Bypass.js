import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Bypass = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading,setLoading] = React.useState(true)
    useEffect(() => {
        navigate(location.pathname.split("bypass")[1])
    },[navigate,location.pathname,loading])
    useEffect(() => {
        setLoading(!loading)
    },[loading])
  return (
    <div>Bypass</div>
  )
}

export default Bypass