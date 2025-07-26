import React, { useEffect } from 'react'
import conv from "../static/banner.json"
import colors from "../static/colors.json" 
import Icon from "../components/icon"
import moment from 'moment'
import {Empty} from '../components/Empty'
import { useNavigate } from 'react-router-dom'
import ModalSecondary from '../components/ModalSecondary';
import InputSecondary from '../components/InputSecondary'
import TextArea from '../components/TextArea'
import toast from 'react-hot-toast'
const ClassroomStream = ({classroom,data,api,token,user,loading,loadingStream,hasMore,setVisible,refreshStream}) => {  
  const navigate = useNavigate() 
  const [infoActive,setInfoActive] = React.useState(false)
  const [announceOpen,setAnnounceOpen] = React.useState(false);
  const [announcement,setAnnouncement] = React.useState({title:"",body:""})
  const [announceLoading,setAnnounceLoading] = React.useState(false)
  useEffect(()=>{
    setVisible(true)
  },[classroom,setVisible])

  const postAnnouncement = async () => {
    setAnnounceLoading(true)
    const res = await fetch(
      `${api}/classroom/${classroom?.class_id}/resource/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({...announcement,topic:"mUNPxeiMJMfTYDX4nvXs3aY8MOERV99x8AsrNFbCMTS4BiYEQd"}),
      }
    );
    const result = await res.json();
    if (!result.error) {
      setAnnounceOpen(false);
      setAnnounceLoading(false)
      setAnnouncement({title:"",body:""})
      refreshStream();
    }else{
      toast.error(result.message,{
        iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
        style:{
          borderRadius:"30px",
          background:"var(--primary-color)",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      })
      setAnnounceLoading(false)
    }
  }
  return (
    <>
    <ModalSecondary heading="Classroom information" open={infoActive} setOpen={setInfoActive}>
      <div className='classroom_about'>
        <div className='head'>
            <h2>About classroom</h2>
            <h3>{classroom?.class_name}</h3>
        </div>
        <div className='about_content'>
            <div>
                <h3>Description</h3>
                <p>{classroom?.class_description}</p>
            </div>
            <div className='creator_info'>
                <div className='title'>
                    <h3>Creator Info</h3>
                </div>
                <div>
                    <div className='icon'>
                        <Icon url={classroom?.creator_profile_image} height={30} chr={classroom?.creator_first_name?.charAt(0)+classroom?.creator_last_name?.charAt(0)}></Icon>
                    </div>
                    <div className='info'>
                        <h3>{classroom?.creator_first_name+" "+classroom?.creator_last_name}</h3>
                        <p>{classroom?.creator_email}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='bottom_content'>
            <p>• created {moment(parseInt(classroom?.created_at)).fromNow()}</p>
            {classroom?.updated_at!==classroom?.created_at?<p>• updated {moment(parseInt(classroom?.updated_at)).fromNow()}</p>:null}
        </div>
    </div>
    </ModalSecondary>
    <ModalSecondary heading="Quick announcement" open={announceOpen} setOpen={setAnnounceOpen}>

      <div className='announce_form'>
            <InputSecondary placeholder="Title" secondary_placeholder="Endsem exam result" type="text" onChange={(e)=>{setAnnouncement({...announcement,title:e.target.value})}} value={announcement?.title}></InputSecondary>
            <TextArea placeholder="Body" secondary_placeholder="Body here..." type="text" onChange={(e)=>{setAnnouncement({...announcement,body:e.target.value})}} value={announcement?.body}></TextArea>
            <div className='btn_group'>
              <div className='btn_tertiary' onClick={()=>setAnnounceOpen(!announceOpen)}>Cancel</div>
              <div className='btn_secondary' style={{width:"32px"}}  onClick={postAnnouncement} disabled={true}>{announceLoading?<span className='btn_loading'></span>:"Post"}</div>
            </div>
            </div>
    </ModalSecondary>
    <div className='main_content page' style={{"--bg":colors[conv[classroom?.banner_id]]}}>
        {classroom?classroom.banner_id?<div className={`banner `} style={{backgroundImage:`url(/banners/${conv[classroom?.banner_id]})`}}>
          <h1>{classroom?.class_name}</h1>
          <span className='banner_info' onClick={()=>setInfoActive(!infoActive)} >{!infoActive?<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className="YGy4X NMm5M"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>:<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className="YGy4X NMm5M"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>}</span>
        </div>:"":""}
      <div>
         {classroom?.role!=="student" ?<div className='announcement_section'>
            <div className='announce_button' onClick={()=>setAnnounceOpen(!announceOpen)}>
              <div className='icon'>
                <Icon url={user?.url} height={38} chr={user?.first_name?.charAt(0)+user?.last_name?.charAt(0)}></Icon>
              </div>
              <div className='text'>Announce something to your class</div>
            </div>
          </div>:""}
        <div className='classroom_cards'>
          {loadingStream&&data.length===0?<div className='skeleton_classroom_card classroom_card'>
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
          </div>:data.length===0?<Empty head="No work todo!" body={"No notes or assignments found"} img="empty_geometry.svg" size={"200px"} margin="50px 0 15px 0"/>:data.map((item,key)=>{
          return <div className='classroom_card' onClick={()=>{navigate(item.resource_id?`resource/${item.resource_id}`:`assignment/${item.assignment_id}`)}}  key={key+parseInt(item.created_at)}>
            {item.resource_id&&item.topic==="mUNPxeiMJMfTYDX4nvXs3aY8MOERV99x8AsrNFbCMTS4BiYEQd"?<div className='creator_info'>
              {<div className='icon_image'>
              <Icon url={item.creator_profile_image} height={40} chr={item.creator_first_name[0]+item.creator_last_name[0]}/>
              </div>}
              <div className='info'>
                <h3>{item.creator_first_name} {item.creator_last_name}</h3>
                <p>{moment(parseInt(item.created_at)).format("ll")} {item.created_at!==item.updated_at?`(Edited ${moment(parseInt(item.updated_at)).fromNow()})`:""}</p>
              </div>
            </div>: 
            <div className='creator_info ra'>
              {<div className='icon_image'>
              <Icon height={40} icon={item.assignment_id?<i className="fa-regular fa-bullseye-arrow"></i>:<i className="fa-regular fa-book"></i>} background={`rgb(${colors[conv[classroom?.banner_id]]})`}/>
              </div>}
              <div className='info'>
                <h3>{item.creator_first_name} {item.creator_last_name} posted a new {item.assignment_id?"assignment":"material"}: {item.title}</h3>
                <p>{moment(parseInt(item.created_at)).format("ll")} {item.created_at!==item.updated_at?`(Edited ${moment(parseInt(item.updated_at)).fromNow()})`:""}</p>
              </div>
            </div>
            }
              
            {item.resource_id&&item.topic==="mUNPxeiMJMfTYDX4nvXs3aY8MOERV99x8AsrNFbCMTS4BiYEQd"&&<div className='body'>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>}

          </div>
        })}
        {data.length>0&&loadingStream&&hasMore?<div className='skeleton_classroom_card classroom_card'>
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
        </div>
      </div>
      </div>
      </>
  )
}

export default ClassroomStream