import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import conv from "../static/banner.json"
import Icon from "../components/icon"
import moment from 'moment'
import TextArea from '../components/TextArea'
import InputSecondary from '../components/InputSecondary'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
const ClassroomResource = ({api,class_id,token,classroom}) => {
    const {resource_id} = useParams() 
    const [resource,setResource] = React.useState(null)
    const [query,setQuery] = React.useState({query_title:'',query_body:''})
    const [isOpen,setIsOpen] = React.useState(false)
    const [queries,setQueries] = React.useState([])
    const navigate = useNavigate()
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
  return (
    <>
        <Modal onSubmit={onSubmit} title={<>Raise Query</>} isOpen={isOpen} setIsOpen={setIsOpen}>                    
            <div className='input_box'>
                <InputSecondary placeholder={"Query title"} value={query.query_title} onChange={(e)=>setQuery({...query,query_title:e.target.value})} secondary_placeholder={"Ex. Doubt related to astronomy."}/>
                <TextArea maxLength={200} placeholder={"Query body"} secondary_placeholder={"Ex. Why don't aliens eat clowns? "} value={query.query_body} onChange={(e)=>setQuery({...query,query_body:e.target.value})}/>
            </div>
        </Modal>
    <div className='page classroom_page ra_page modal_page_content'>
        {resource?<div className='main_content'>
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
                        <Icon url={resource?.creator_profile_image?api+"/profile/"+resource.creator_profile_image:null} height={35} chr={resource?.creator_first_name}/>
                    </div>
                    <div className='info'>
                        {resource?<div className='creator_info'>
                            <div className='info'>
                                    <h3>{resource.creator_first_name} {resource.creator_last_name}</h3>
                                    <p>{moment(parseInt(resource?.created_at)).format("ll")} {resource?.created_at!==resource?.updated_at?`(Edited on ${moment(parseInt(resource?.updated_at)).format("ll")})`:""}</p>
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
                            return <div className='attachment'  onClick={()=>{window.open(`${api}/classrooms/${class_id}/resources/${item.file_name}`,"","height:auto;width:auto")}} key={key}>
                                <div className='icon'></div>
                                <div className='filename'><i className="fa-regular fa-file"></i>{item.file_name}</div>
                            </div>
                        })}
                    </div>
                </div>:""}
                
            </div>
            <div className='bottom_content'>
                <div className='title'>
                    <h4><i className="fa-regular fa-clipboard-question"></i> &nbsp;Your previous queries.</h4>
                </div>
                <div className='queries'>
                        {queries.map((item,key)=>{
                            return <div key={key} className='query_card' onClick={(e)=>{e.currentTarget.classList.add("div_modal_open")}}>
                                <div className='query_question'>
                                    <h3>{item.query_title}</h3>
                                    <p>{item.query_body}</p>
                                    <p>Asked on {moment(parseInt(item?.created_at)).format("lll")} {item?.created_at!==item?.updated_at?`(Edited on ${moment(parseInt(item?.updated_at)).format("lll")})`:""}</p>
                                </div>
                                <div></div>
                            </div>
                        })}
                </div>
            </div>
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