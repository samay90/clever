import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import conv from "../static/banner.json"
import Icon from "../components/icon"
import moment from 'moment'
import Modal from '../components/Modal'
import FileInput from '../components/FileInput'
import toast from 'react-hot-toast'
import axios from 'axios'
const ClassroomAssignement = ({api,class_id,token,classroom}) => {
    const {assignment_id} = useParams() 
    const [assignment,setAssignment] = React.useState(null)
    const [isOpen,setIsOpen] = React.useState(false)
    const navigate = useNavigate()
    const [files,setFiles] = React.useState([]);
    const [loading,setLoading] = React.useState(false)
    const handleFiles = (e)=>{
        setFiles([...e.target.files])
    }
    React.useEffect(()=>{
        const getAssignment =async ()=>{
            if (token && api){
                const data = await fetch(api+`/classroom/${class_id}/assignment/${assignment_id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"multipart/form-data",
                        "Accept":'multipart/form-data',
                        "Authorization":"Bearer "+token
                    }
                })
                const parsed =await data.json()
                if (!parsed.error){
                    setAssignment(parsed.data)
                }else{
                    navigate("/app/home")
                }
            }
        }
        getAssignment()
    },[assignment_id,api,class_id,token,navigate])
    
    const handleAssignmentSubmit =async ()=>{
        setLoading(true)
        const newForm = new FormData()
        for (let i = 0; i < files.length; i++) {
            newForm.append("attachments", files[i]);
        }
        try{
          const raw = await axios.post(api+`/classroom/${class_id}/assignment/${assignment_id}/submit`,newForm,{headers:{authorization:"Bearer "+token}})
          setLoading(false)
          toast.success(raw.data.message,{
            iconTheme:{primary:"#fff",secondary:"#5C60F5"},
            style:{
              borderRadius:"30px",
              background:"#5C60F5",
              color:"white",
              fontWeight:"100",
              fontSize:"12px"
            }
          })
          setIsOpen(false)
          setFiles([])
        }catch(e){
            setLoading(false)
                toast.error(e.response.data.message,{
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
    }
  return (
    <>
        {assignment?.due_date_time>((new Date()).getTime())?assignment?.submissions?.marks?"":<Modal loading={loading} onSubmit={handleAssignmentSubmit} title={<>Submit Assignment</>} isOpen={isOpen} setIsOpen={setIsOpen}>                    
            <FileInput onChange={handleFiles} files={files} setFiles={setFiles} label={<><i className="fa-regular fa-plus"></i>&nbsp; Add work</>}/>
        </Modal>:""}
    <div className='page classroom_page ra_page modal_page_content'>
        {assignment?<div className='main_content'>
            <div className='top_content'>
                <div className='header'>
                    {classroom?<div className='icon'>
                        {classroom.banner_id?<i className="fa-regular fa-book " style={{backgroundImage:`url(${api}/banners/${conv[classroom.banner_id]})`}}></i>:""}
                    </div>:""}
                    <div className='info'>
                        <div className='title'>{assignment?.title}</div>
                    </div>
                </div>
                <div className='header'>
                    <div className='icon'>
                        <Icon url={assignment?.creator_profile_image?api+"/profile/"+assignment.creator_profile_image:null} height={35} chr={assignment?.creator_first_name}/>
                    </div>
                    <div className='info'>
                        {assignment?<div className='creator_info'>
                            <div className='info'>
                                    <h3>{assignment.creator_first_name} {assignment.creator_last_name}</h3>
                                    <p>{moment(parseInt(assignment?.created_at)).format("ll")} {assignment?.created_at!==assignment?.updated_at?`(Edited on ${moment(parseInt(assignment?.updated_at)).format("ll")})`:""}</p>
                                </div>
                            </div>:""}
                    </div>
                </div>
                <div className='header'>
                    {classroom?<div className='icon'>
                        {classroom.banner_id?<i className="fa-regular fa-bullseye-arrow " style={{backgroundImage:`url(${api}/banners/${conv[classroom.banner_id]})`}}></i>:""}
                    </div>:""}
                    <div className='info'>
                        <div className='assignment_info'>
                          <h3>{assignment?.submissions?.marks?assignment?.submissions?.marks+"/":"Not graded. Total "}{assignment?.total_marks} marks</h3>
                          <p>Due on {moment(parseInt(assignment?.due_date_time)).format("lll")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='mid_content'>
                <div className='body'><p>{assignment?.body}</p></div>
                {assignment?.attachments.length>0?<div className='attachments'>
                    <h3><i className="fa-regular fa-paperclip"></i> Attachments</h3>
                    <div className='data'>
                        {assignment.attachments.map((item,key)=>{
                            return <div className='attachment'  onClick={()=>{window.open(`${api}/classrooms/${class_id}/assignments/${item.file_name}`,"","height:auto;width:auto")}} key={key}>
                                <div className='icon'></div>
                                <div className='filename'><i className="fa-regular fa-file"></i>{item.file_name}</div>
                            </div>
                        })}
                    </div>
                </div>:""}
                
            </div>
            {assignment?.submissions?<div className='bottom_content'>
                <div className='title'>
                    <h4><i className="fa-regular fa-memo-pad"></i>&nbsp;Your last submission</h4>
                </div>
                {assignment?.attachments.length>0?<div className='attachments'>
                    <div className='data'>
                        {assignment?.submissions?.file_name.map((item,key)=>{
                            return <div className='attachment'  onClick={()=>{window.open(`${api}/classrooms/${class_id}/assignments/submissions/${item}`,"","height:auto;width:auto")}} key={key}>
                                <div className='icon'></div>
                                <div className='filename'><i className="fa-regular fa-file"></i>{item}</div>
                            </div>
                        })}
                    </div>
                </div>:""}
            </div>:""}
        </div>:<div className='main_content skeleton'>
            <div className='top_content'>
                <div className='header'>
                    <div className='icon'></div>
                    <div className='info'><div className='title'></div></div></div>
                <div className='header'>
                    <div className='icon'><span></span></div>
                    <div className='info'>
                        <div className='creator_info'>
                            <div className='info'><h3>&nbsp;</h3><p>&nbsp;</p></div></div></div></div></div>
                            <div className='header'>
                    <div className='icon'></div>
                    <div className='info'><div className='assignment_info'><h3>&nbsp;</h3><p></p></div></div></div>
                            <hr/>
            <div className='mid_content'><div className='body'><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div></div></div>}
        
    </div>
    </>
  )
}

export default ClassroomAssignement