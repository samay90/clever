import React, { useEffect } from 'react'
import Icon from '../components/icon'
import InputSecondary from '../components/InputSecondary'
import moment from 'moment'
import TextArea from '../components/TextArea'
import Selector from '../components/Selector'
import axios from 'axios'
import toast from 'react-hot-toast'

const SettingsProfile = ({user,api,token}) => {
    const [form,setForm] = React.useState({})
    const [countries,setCountries] = React.useState([]);
    const [states,setStates] = React.useState([]);
    const [cities,setCities] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [profile,setProfile] = React.useState(null);
    React.useEffect(()=>{
        if (user){
            setForm(user)
        }
    },[user])
    const dateConverter = (date) =>{
        return moment(parseInt(date)).format('YYYY-MM-DD');
    }
    useEffect(()=>{
        const getCountries = async ()=>{
            setStates([]);
            setCities([]);
            const data = await fetch("https://geolocation-api-lovat.vercel.app/v1/",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            const parsed =await data.json()
            if (!parsed.error){
                setCountries(parsed.data.map(country=>country.name))
            }
        }
        getCountries()
    },[form.country])
    useEffect(()=>{
        const getStates = async ()=>{
            setCities([]);
            const data = await fetch("https://geolocation-api-lovat.vercel.app/v1/"+form.country,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            const parsed =await data.json()
            if (!parsed.error){
                setStates(parsed.data.map(state=>state.name))
            }
        }
        if (form.country){
            getStates()
        }
    },[form.country])
    useEffect(()=>{
        const getCities = async ()=>{
            const data = await fetch("https://geolocation-api-lovat.vercel.app/v1/"+form.country+"/"+form.state,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            const parsed =await data.json()
            if (!parsed.error){
                setCities(parsed.data.map(city=>city.name))
            }
        }
        if (form.state){
            getCities()
        }
    },[form.state,form.country])
    const handleSubmit = async ()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("first_name",form.first_name)
        formData.append("last_name",form.last_name)
        formData.append("email",form.email)
        formData.append("phone_no",form.phone_no)
        formData.append("country",form.country)
        formData.append("state",form.state)
        formData.append("city",form.city)
        formData.append("date_of_birth",form.date_of_birth)
        formData.append("bio",form.bio)
        formData.append("dob",dateConverter(form.dob))
        formData.append("profile",profile);
        await axios.post(api+"/user/profile/update",formData,{headers:{authorization:"Bearer "+token}}).then((res)=>{setLoading(false);toast.success(res.data.message,{iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},style:{borderRadius:"30px",background:"var(--primary-color)",color:"white",fontWeight:"100",fontSize:"12px"}})}).catch(res=>{
            setLoading(false)
            if (res.response.data.error){
                toast.error(res.response.data.message,{iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},style:{borderRadius:"30px",background:"var(--primary-color)",color:"white",fontWeight:"100",fontSize:"12px"}})
            }
        })
        
    }
    const handleProfileImage = (e) =>{
        const profile_img = e.target.files[0];
        if (!(profile_img.type==="image/png" || profile_img.type==="image/jpeg")){
            toast.error("Image be of type png or jpg",{iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},style:{borderRadius:"30px",background:"var(--primary-color)",color:"white",fontWeight:"100",fontSize:"12px"}})
        }else if(profile_img.size>1000000){
            toast.error("Size of image should be less that 1MB",{iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},style:{borderRadius:"30px",background:"var(--primary-color)",color:"white",fontWeight:"100",fontSize:"12px"}})
        }else{
            setProfile(profile_img);
        }
    }
    const reverseDate = (date) => {
        const d = new Date(date);
        return d.getTime()
    }
  return (
    <div className='settings_form page'>
        <div className='form'>
            {form?.email?<>
                <div className='input'>
                <h4 className='label'>Profile Image</h4>
                <div className='container'>
                    <div className='image_view'>
                        <Icon url={user?.url} height={80} chr={user?.first_name?.charAt(0)+user?.last_name?.charAt(0)}></Icon>
                    </div>
                    <span className='edit_profile'><i className="fa-regular fa-pen"></i>
                        <input onChange={handleProfileImage} className='file_input' type="file"></input>
                    </span>
                </div>
                <div className='text'>Your profile image will be visible to other users.</div>
            </div>
            <div className='input_group'>
            <InputSecondary placeholder="First Name" secondary_placeholder="Sam" type="text" onChange={(e)=>{setForm({...form,first_name:e.target.value})}} value={form.first_name} maxLength={50}/>
            <InputSecondary placeholder="Last Name" secondary_placeholder="Paul" type="text" onChange={(e)=>{setForm({...form,last_name:e.target.value})}} value={form.last_name} maxLength={50}/>
            </div>
            <div className='date_input'>
            <InputSecondary placeholder="Date of Birth" secondary_placeholder="05/10/2006" value={dateConverter(form.dob)} type="date" onChange={(e)=>{setForm({...form,dob:reverseDate(e.target.value)})}} />
            </div>
            <TextArea placeholder="Biography" maxLength={200} secondary_placeholder="I do everything that i don't meant." onChange={(e)=>{setForm({...form,bio:e.target.value})}} value={form?.bio??""}></TextArea>
            <div className='location_selector'>
                <Selector value={form.country??""} onChange={(e)=>{setForm({...form,country:e.target.value})}}  placeholder='Country' option={countries??[]}/>
                <Selector value={form.state??""} onChange={(e)=>{setForm({...form,state:e.target.value})}} placeholder='State' option={states??[]}/>
                <Selector value={form.city??""} onChange={(e)=>{setForm({...form,city:e.target.value})}} placeholder='City' option={cities??[]}/>
            </div>
            <div className='button_group btn_group'>
                <button className='btn_tertiary' onClick={(e)=>{setForm(user);}}>Reset</button>
                <button className='btn_secondary' style={{width:"60px"}} onClick={handleSubmit} disabled={loading}>{loading?<span className='btn_loading'></span>:"Save"}</button>
            </div>
            </>:<></>}
        </div>
    </div>
  )
}

export default SettingsProfile