import React, { useEffect } from 'react'
import conv from "../static/banner.json"
import colors from "../static/colors.json" 
import Icon from "../components/icon"
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import AddWork from '../components/AddWork'
const ClassroomStream = ({classroom,data,api,token}) => {  
  const navigate = useNavigate() 
  const [infoActive,setInfoActive] = React.useState(false)
  const [open,setOpen] = React.useState(false)
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLocaleLowerCase() === "n") {
        e.preventDefault()
        setOpen(true);
      }
    })
},[])
  return (
    <>
    <AddWork heading="Create work" open={open} class_id={classroom?.class_id} token={token} api={api} setOpen={setOpen}></AddWork>
    <div className='main_content page'>
        {classroom?classroom.banner_id?<div className={`banner ${infoActive?"banner_active":""} `}style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>
          <h1>{classroom?.class_name}</h1>
          <span className='banner_info' onClick={()=>setInfoActive(!infoActive)} >{!infoActive?<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className="YGy4X NMm5M"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>:<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className="YGy4X NMm5M"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>}</span>
        </div>:"":""}
      <div>
        <div className={`classroom_info ${infoActive?"active":""}`}>
          <p>{classroom?.class_description}</p>
        </div>
        <div className='announcement_section'>
          <button onClick={()=>{setOpen(true)}} className='btn_secondary announcment_btn' style={{"--bg":colors[conv[classroom?.banner_id]]}}><i className="fa-regular fa-plus"></i>&nbsp;Create</button>
        </div>
        <div className='classroom_cards'>
          {data.length===0?<div className='skeleton_classroom_card classroom_card'>
            <div className='tags'>
              <div className='tag'></div>
              <div className='tag'></div>
            </div>
            <div className='creator_info'>
              <span className='ske_icon'></span>
              <div className='ske_info'>
                <h3>&nbsp;</h3>
                <p></p>
              </div>
            </div>
            <div className='body'>
              <h4>&nbsp;</h4>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>:""}
        {data.map((item,key)=>{
          return <div className='classroom_card' onClick={()=>{navigate(item.resource_id?`resource/${item.resource_id}`:`assignment/${item.assignment_id}`)}}  key={key}>
            <div className='tags'>
            {classroom?<div className='tag' style={{"--bg":colors[conv[classroom?.banner_id]]}}>{item.resource_id?<h3><i className="fa-regular fa-book"></i> Resource</h3>:<h3><i className="fa-regular fa-ballot-check"></i> Assignment</h3>}</div>:""}
            {item.assignment_id?<div className='tag' style={{"--bg":colors[conv[classroom?.banner_id]]}}><h3><i className="fa-regular fa-bullseye-arrow"></i> {item.total_marks} marks</h3></div>:""}
            </div>
            <div className='creator_info'>
              <div className='icon_image'>
              <Icon url={item.creator_profile_image?api+"/profile/"+item.creator_profile_image:null} height={35} chr={item.creator_first_name[0]+item.creator_last_name[0]}/>
              </div>
              <div className='info'>
                <h3>{item.creator_first_name} {item.creator_last_name}</h3>
                <p>{moment(parseInt(item.created_at)).format("ll")} {item.created_at!==item.updated_at?`(Edited ${moment(parseInt(item.updated_at)).fromNow()})`:""}</p>
              </div>
            </div>
            {item.due_date_time?<p className='due_date'>Due on {moment(parseInt(item.due_date_time)).format("lll")}</p>:""}
            <div className='body'>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
            {
              item.resource_id?<div className='comment'>
                <button><i className="fa-regular fa-comment-question"></i> Ask query...</button>
              </div>:""
            }
          </div>
        })}
        </div>
      </div>
      </div>
      </>
  )
}

export default ClassroomStream