import React, { useEffect } from "react";
import InputSecondary from "../components/InputSecondary";
import TextArea from "../components/TextArea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import banners from "../static/banner.json"
const ClassroomSettings = ({ token, api,user, classroom, class_id }) => {
    const [changes,setChanges] = React.useState({})
    const [sensitive,setSensitive] = React.useState({})
    const [reset,setReset] = React.useState(0)
    const navigate = useNavigate()
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [banner,setBanner] = React.useState(null)
    useEffect(()=>{
        if (!classroom&&classroom?.role==="creator"){
            navigate("/app/classroom/"+class_id);
        }
    },[class_id,classroom,navigate])
    React.useEffect(()=>{
        setReset(0)
        if (classroom){
            setChanges({
                class_name:classroom.class_name??"",
                class_description:classroom.class_description??"",
                join_password:classroom.join_password??"",
                banner_id:classroom.banner_id??""
            })
            setBanner(classroom.banner_id??null)
        }
    },[classroom,reset])
    React.useEffect(()=>{
        const getSensitive = async () => {
            const req =await fetch(api+"/classroom/"+class_id+"/sensitive", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+token
                }
            })
            const data =await req.json()
            if (data.error){
                toast.error(data.message, {
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
                setSensitive(data.data)
            }
        }
        if (token && api && class_id){getSensitive()}
    },[api,class_id,token])
    const saveChanges = async () => {
        if (token && api && class_id){
            setButtonDisabled(true)
            const req =await fetch(api+"/classroom/"+class_id+"/edit", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+token
                },
                body:JSON.stringify({
                    class_name:changes.class_name,
                    class_description:changes.class_description,
                    banner_id:parseInt(banner)
                })
            })
            const data =await req.json()
            if (data.error){
                toast.error(data.message, {
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
                toast.success(data.message, {
                    iconTheme:{primary:"#fff",secondary:"#5C60F5"},
                    style:{
                        borderRadius:"30px",
                        background:"#5C60F5",
                        color:"white",
                        fontWeight:"100",
                        fontSize:"12px"
                    }
                })
            }
            setButtonDisabled(false)
        }
    }
  return (<>
      <div className="settings_navbar">
        <h2 onClick={()=>{navigate("/app/classroom/"+class_id+"/")}}><i className="fa-regular fa-arrow-left"></i>Settings</h2>
      </div>
    <div className="classroom_settings_page page classroom_page">
      <div className="main_content">
        <div className="header">
          <p>
            It contain's all the sensitive information about the{" "}
            <b>{classroom?.class_name}'s</b> classroom and can be changed by the
            administrative
          </p>
        </div>
        <hr />
        <div className="settings_content">
            <div className="input">
            <InputSecondary maxLength={50} placeholder="Class Name" secondary_placeholder="The Nerd Herd" type="text" value={changes.class_name??""} onChange={(e)=>{setChanges(prev=>({...prev,class_name:e.target.value}))}}/>
            <p>*Max 50 characters</p>
            </div>
            <div className="input">
            <TextArea maxLength={200} placeholder="Class Description" secondary_placeholder="Here we learn about all the things that is not realted to purpose for what it is made." type="text" value={changes.class_description??""} onChange={(e)=>{setChanges(prev=>({...prev,class_description:e.target.value}))}}/>
            <p>*Max 200 characters</p>
            </div>
            <div className="input">
            <InputSecondary disabled={true} placeholder="Classroom Code" secondary_placeholder="I won't say it" type="text" value={sensitive.join_code??""}/>
            </div>
            <div className="input">
            {classroom&&classroom.class_id?<ImageSelector heading="Select Banner" value={changes?.banner_id} current={banner} setCurrent={setBanner} data={Object.keys(banners).map((i)=>{return {key:i,url:`/banners/${banners[i]}`}})}  placeholder="Customise Banner"/>:""}
            </div>
            <div className="submit_area">
                <button className="reset" onClick={()=>{setReset(prev=>prev+1)}}>Reset</button>
                <button className="save" onClick={saveChanges} disabled={buttonDisabled}>{buttonDisabled?<span className="btn_loading"></span>:"Save"}</button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ClassroomSettings;
