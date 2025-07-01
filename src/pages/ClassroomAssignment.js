import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import conv from "../static/banner.json";
import colors from "../static/colors.json";
import Icon from "../components/icon"
import moment from 'moment';
import Modal from '../components/Modal'
import FileInput from '../components/FileInput'
import toast from 'react-hot-toast'
import axios from 'axios'
import ModalSecondary from '../components/ModalSecondary'
import FileView from '../components/FileView';
const ClassroomAssignement = ({api,class_id,token,classroom,assignment}) => {
    const {assignment_id} = useParams() 
    const [isOpen,setIsOpen] = React.useState(false)
    const navigate = useNavigate()
    const [files,setFiles] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [deleteOpen,setDeleteOpen] = React.useState(false);
    const [deleteLoading,setDeleteLoading] = React.useState(false);
    const handleFiles = (e)=>{
        setFiles([...e.target.files])
    }

    
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
    const deleteAssignment =async ()=>{
        setDeleteLoading(true)
        const raw = await fetch(api+`/classroom/${class_id}/assignment/${assignment_id}/delete`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                "authorization":"Bearer "+token
            }
        })
        const parsed = await raw.json()
        if (parsed.error){
            toast.error(parsed.message,{
                iconTheme:{primary:"#fff",secondary:"#5C60F5"},
                style:{
                  borderRadius:"30px",
                  background:"#5C60F5",
                  color:"white",
                  fontWeight:"100",
                  fontSize:"12px"
                }
              })
              setDeleteLoading(false)
        }else{
            setDeleteOpen(false)
            navigate(`/app/classroom/${class_id}`)
        }
    }
  return (
    <>
        {((assignment?.due_date_time>((new Date()).getTime()))&&(classroom?.role==="student"))?assignment?.submissions?.marks?"":<Modal loading={loading} onSubmit={handleAssignmentSubmit} title={<>Submit Assignment</>} isOpen={isOpen} setIsOpen={setIsOpen}>                    
            <FileInput onChange={handleFiles} files={files} setFiles={setFiles} label={<><i className="fa-regular fa-plus"></i>&nbsp; Add work</>}/>
        </Modal>:""}
        <ModalSecondary open={deleteOpen} setOpen={setDeleteOpen} heading={"Delete Assignment"}>
        <div className='nav_form'>
          <p className='text_secondary'>Are you sure you want to delete this assignment. Once deleted it can't be recovered.</p>
          <br/>
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setDeleteOpen(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"80px"}} disabled={deleteLoading} onClick={deleteAssignment}>{deleteLoading?<span className='btn_loading'/>:"Delete"}</button>
          </div>
        </div>
    </ModalSecondary>
    <div className='page classroom_page ra_page modal_page_content'>
        {assignment?<div className='main_content'>
            {classroom?.role!=="student"?<div className='ra_bottom_bar'>
                <button className='btn_tertiary' onClick={()=>{setDeleteOpen(true)}}><i className="fa-regular fa-trash"></i> &nbsp;Delete</button>
                <button className='btn_secondary' onClick={()=>{navigate("/app/classroom/"+class_id+"/assignment/"+assignment_id+"/edit")}}><i className="fa-regular fa-pen"></i> &nbsp;Edit</button>
            </div>:""}
            <div className={'top_content '+(classroom?.role!=="student"?"top__bar":"")}>
                <div className='header'>
                    {classroom?<div className='icon'>
                        {classroom.banner_id?<i className="fa-regular fa-book " style={{"--bg":colors[conv[classroom?.banner_id]]}}></i>:""}
                    </div>:""}
                    <div className='info'>
                        <div className='title'>{assignment?.title}</div>
                    </div>
                </div>
                <div className='header'>
                    <div className='icon'>
                        <Icon url={assignment?.creator_profile_image} height={30} chr={assignment?.creator_first_name[0]+assignment?.creator_last_name[0]}/>
                    </div>
                    <div className='info'>
                        {assignment?<div className='creator_info'>
                            <div className='info'>
                                    <h3>{assignment.creator_first_name} {assignment.creator_last_name}</h3>
                                    <p>{moment(parseInt(assignment?.created_at)).format("ll")} {assignment?.created_at!==assignment?.updated_at?`(Edited ${moment(parseInt(assignment?.updated_at)).fromNow()})`:""}</p>
                                </div>
                            </div>:""}
                    </div>
                </div>
                <div className='header'>
                    {classroom?<div className='icon'>
                        {classroom.banner_id?<i className="fa-regular fa-bullseye-arrow " style={{"--bg":colors[conv[classroom?.banner_id]]}}></i>:""}
                    </div>:""}
                    <div className='info'>
                        <div className='assignment_info'>
                          <h3>{assignment?.submissions?.marks?assignment?.submissions?.marks+"/":classroom?.role==="student"?"Not graded. Total ":"Total "}{assignment?.total_marks} marks</h3>
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
                            return <FileView files={assignment.attachments.map((item)=>item.url)} key={key} path={item.url} fileName={item.url}/>

                        })}
                    </div>
                </div>:""}
                
            </div>
            {assignment?.submissions?<div className='bottom_content'>
                <div className='title'>
                    <h4><i className="fa-regular fa-memo-pad"></i>&nbsp;Your last submission</h4>
                </div>
                {assignment?.attachments.length>0?<div className='attachments'>
                    <div className='data' style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                        {assignment?.submissions?.url.map((item,key)=>{
                            return <FileView files={assignment?.submissions?.url} key={key} path={item} fileName={item}/>
                        })}
                    </div>
                </div>:""}
            </div>:""}
        </div>:<div className='main_content skeleton'>
            <div className={'top_content '+(classroom?.role!=="student"?"top__bar":"")}>
                <div className='header'>
                    <div className='icon'><span></span></div>
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