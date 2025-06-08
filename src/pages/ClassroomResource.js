import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import conv from "../static/banner.json"
import Icon from "../components/icon"
import moment from 'moment'
import TextArea from '../components/TextArea'
import InputSecondary from '../components/InputSecondary'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
import ModalSecondary from '../components/ModalSecondary'
import FileView from '../components/FileView'
const ClassroomResource = ({api,class_id,token,classroom}) => {
    const {resource_id} = useParams() 
    const [resource,setResource] = React.useState(null)
    const [query,setQuery] = React.useState({query_title:'',query_body:''})
    const [isOpen,setIsOpen] = React.useState(false)
    const [queries,setQueries] = React.useState([])
    const navigate = useNavigate()
    const [submitLoading,setSubmitLoading] = React.useState(false)
    const [deleteOpen,setDeleteOpen] = React.useState(false)
    const [deleteLoading,setDeleteLoading] = React.useState(false)
    const [queryDelete,setQueryDelete] = React.useState(false)
    const [queryEdit,setQueryEdit] = React.useState(false);
    const [editQuery,setEditQuery] = React.useState({query_title:'',query_body:''})
    React.useEffect(()=>{
        const getResource =async ()=>{
            if (token && api){
                const data = await fetch(api+`/classroom/${class_id}/resource/${resource_id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":'application/json',
                        "Authorization":"Bearer "+token
                    }
                })
                const parsed =await data.json()
                if (!parsed.error){
                    setResource(parsed.data)
                }else{
                    navigate("/app/home")
                }
            }
        }
        getResource()
    },[resource_id,api,class_id,token,navigate])
    const onSubmit =async ()=>{
        setSubmitLoading(true)
        const raw = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/query/ask`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                "authorization":"Bearer "+token
            },
            body:JSON.stringify(query)
        })
        const parsed = await raw.json()
        setSubmitLoading(false)
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
        }else{
            setIsOpen(false)
            setQuery({query_title:'',query_body:''})
            toast.success(parsed.message,{
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
    React.useEffect(()=>{
        const getQuerys =async ()=>{
            if (token && api){
                const data = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/queries`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":'application/json',
                        "Authorization":"Bearer "+token
                    }
                })
                const parsed =await data.json()
                if (!parsed.error){
                    setQueries(parsed.data)
                }else{
                    navigate("/app/home")
                }
            }
        }
        getQuerys()
    },[resource_id,api,class_id,token,navigate])
    const deleteResource =async ()=>{
        setDeleteLoading(true)
        const raw = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/delete`,{
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
    const deleteQuery =async (query_id)=>{
        console.log(query_id)
        setDeleteLoading(true)
        const raw = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/query/${query_id}/delete`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                "authorization":"Bearer "+token
            }
        })
        const parsed = await raw.json()
        if (parsed.error){
            setDeleteLoading(false)
            setQueryDelete(false)
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
        }else{
            setDeleteLoading(false)
            setQueryDelete(false)
            toast.success(parsed.message,{
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
    const handleEditQuery =async () =>{
        setSubmitLoading(true)
        const raw = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/query/${queryEdit}/edit`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
                "authorization":"Bearer "+token
            },
            body:JSON.stringify(editQuery)
        })
        const parsed = await raw.json()
        setSubmitLoading(false)
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
        }else{
            setQueryEdit(false)
            toast.success(parsed.message,{
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
        {classroom?.role==="student"?<Modal loading={submitLoading} onSubmit={onSubmit} title={<>Raise Query</>} isOpen={isOpen} setIsOpen={setIsOpen}>                    
            <div className='input_box'>
                <InputSecondary placeholder={"Query title"} value={query.query_title} onChange={(e)=>setQuery({...query,query_title:e.target.value})} secondary_placeholder={"Ex. Doubt related to astronomy."}/>
                <TextArea maxLength={200} placeholder={"Query body"} secondary_placeholder={"Ex. Why don't aliens eat clowns? "} value={query.query_body} onChange={(e)=>setQuery({...query,query_body:e.target.value})}/>
            </div>
        </Modal>:""}
        {classroom?.role==="student"?<ModalSecondary open={queryEdit} setOpen={setQueryEdit} heading={"Edit query"}>
            <div className='nav_form'>
          <InputSecondary placeholder="Query title" value={editQuery.query_title} type="text" secondary_placeholder="Doubt related to astronomy" onChange={(e)=>{setEditQuery(prev=>({...prev,query_title:e.target.value}))}} maxLength={50} disabled={false} />
          <TextArea placeholder="Query body" type="text" value={editQuery.query_body} secondary_placeholder="Ex. Why don't aliens eat clowns?" onChange={(e)=>{setEditQuery(prev=>({...prev,query_body:e.target.value}))}} maxLength={200} disabled={false} />
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setQueryEdit(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"85px"}} disabled={submitLoading} onClick={handleEditQuery}>{submitLoading?<span className='btn_loading'/>: <><i className="fa-regular fa-pen"></i> &nbsp; Edit</>}</button>
          </div>
        </div>
        </ModalSecondary>:""}
        {classroom?.role!=="student"?<ModalSecondary open={deleteOpen} setOpen={setDeleteOpen} heading={"Delete resource"}>
        <div className='nav_form'>
          <p className='text_secondary'>Are you sure you want to delete this resource. Once deleted it can't be recovered.</p>
          <br/>
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setDeleteOpen(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"80px"}} disabled={deleteLoading} onClick={deleteResource}>{deleteLoading?<span className='btn_loading'/>:"Delete"}</button>
          </div>
        </div>
    </ModalSecondary>:""}
    <ModalSecondary open={!(queryDelete===false)} setOpen={setQueryDelete} heading={"Delete query"}>
        <div className='nav_form'>
          <p className='text_secondary'>Are you sure you want to delete this query. Once deleted it can't be recovered.</p>
          <br/>
          <div className='button_group'>
              <button className='btn_tertiary' onClick={()=>{setQueryDelete(false)}}>Cancel</button>
              <button className='btn_secondary' style={{width:"80px"}} disabled={deleteLoading} onClick={()=>{deleteQuery(queryDelete)}}>{deleteLoading?<span className='btn_loading'/>:"Delete"}</button>
          </div>
        </div>
    </ModalSecondary>
    <div className='page classroom_page ra_page modal_page_content'>
        {resource?<div className='main_content'>
            {classroom?.role!=="student"?<div className='ra_bottom_bar'>
                <button className='btn_tertiary' onClick={()=>{setDeleteOpen(true)}}><i className="fa-regular fa-trash"></i> &nbsp;Delete</button>
                <button className='btn_secondary' onClick={()=>{navigate("/app/classroom/"+class_id+"/resource/"+resource_id+"/edit")}}><i className="fa-regular fa-pen"></i> &nbsp;Edit</button>
            </div>:""}
            <div className='top_content'>
                <div className='header'>
                    {classroom?<div className='icon'>
                        {classroom.banner_id?<i className="fa-regular fa-book " style={{backgroundImage:`url(${api}/banners/${conv[classroom.banner_id]})`}}></i>:""}
                    </div>:""}
                    <div className='info'>
                        <div className='title'>{resource?.title}</div>
                    </div>
                </div>
                <div className='header'>
                    <div className='icon'>
                        <Icon url={resource?.creator_profile_image?api+"/profile/"+resource.creator_profile_image:null} height={35} chr={resource?.creator_first_name[0]+resource?.creator_last_name[0]}/>
                    </div>
                    <div className='info'>
                        {resource?<div className='creator_info'>
                            <div className='info'>
                                    <h3>{resource.creator_first_name} {resource.creator_last_name}</h3>
                                    <p>{moment(parseInt(resource?.created_at)).format("ll")} {resource?.created_at!==resource?.updated_at?`(Edited ${moment(parseInt(resource?.updated_at)).fromNow()})`:""}</p>
                                </div>
                            </div>:""}
                    </div>
                </div>
            </div>
            <hr/>
            <div className='mid_content'>
                <div className='body'><p>{resource?.body}</p></div>
                {resource?.attachments.length>0?<div className='attachments'>
                    <h3><i className="fa-regular fa-paperclip"></i> Attachments</h3>
                    <div className='data'>
                        {resource.attachments.map((item,key)=>{
                            return <>
                            <FileView path={item.file_path} fileName={item.file_name} key={key}/>
                            </>
                        })}
                    </div>
                </div>:""}
                
            </div>
            {resource?.body!==""?<hr/>:""}
            {classroom?.role==="student"?<div className='bottom_content'>
                <div className='title'>
                    <h4><i className="fa-regular fa-clipboard-question"></i> &nbsp;Your previous queries.</h4>
                </div>
                <div className='queries'>
                        {queries.map((item,key)=>{
                            return <div key={key} className='query_card' onClick={(e)=>{e.currentTarget.classList.add("div_modal_open")}}>
                                <div className='query_options'>
                                    <div className='query_icon'>
                                        Q
                                    </div>
                                    <div className='query_option' onClick={()=>{setQueryEdit(item.query_id);setEditQuery({
                                        query_title:item.query_title,
                                        query_body:item.query_body
                                    })}}>
                                        <i className="fa-regular fa-pen"></i>
                                    </div>
                                    <div className='query_option' onClick={()=>{setQueryDelete(item.query_id)}}>
                                        <i className="fa-regular fa-trash"></i>
                                    </div>
                                </div>
                                <div className='query'>
                                    <div className='query_question'>
                                        <div>
                                            <h3>{item.query_title}</h3>
                                            <p>{item.query_body}</p>
                                        </div>
                                        <p className='query_time'>Asked on {moment(parseInt(item?.created_at)).format("lll")} {item?.created_at!==item?.updated_at?`(Edited ${moment(parseInt(item?.updated_at)).fromNow()})`:""}</p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        })}
                </div>
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
                            <div className='info'><h3>&nbsp;</h3><p>&nbsp;</p></div></div></div></div></div><hr/>
            <div className='mid_content'><div className='body'><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div></div></div>}
        
    </div>
    </>
  )
}

export default ClassroomResource