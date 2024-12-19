import React from 'react'
import conv from "../static/banner.json" 
import Icon from "../components/icon"
import moment from 'moment'
const ClassroomStream = ({classroom,data,api}) => {   
  return (
    <div className='main_content'>
        {classroom?classroom.banner_id?<div className='banner' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>
          <h1>{classroom?.class_name}</h1>
        </div>:"":""}
      <div>
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
          return <div className='classroom_card'  key={key}>
            <div className='tags'>
            <div className='tag' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>{item.resource_id?<h3><i className="fa-regular fa-book"></i> Resource</h3>:<h3><i className="fa-regular fa-ballot-check"></i> Assignment</h3>}</div>
            {item.assignment_id?<div className='tag' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>{item.total_marks} marks</div>:""}
            </div>
            <div className='creator_info'>
              <div className='icon_image'>
              <Icon url={item.creator_profile_image?api+"/profile/"+item.creator_profile_image:null} height={35} chr={item.creator_first_name[0]}/>
              </div>
              <div className='info'>
                <h3>{item.creator_first_name} {item.creator_last_name}</h3>
                <p>{moment(parseInt(item.created_at)).format("Do MMM YYYY")} {item.created_at!==item.updated_at?`(Edited on ${moment(parseInt(item.updated_at)).format("Do MMM YYYY")})`:""}</p>
              </div>
            </div>
            <div className='body'>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
            {
              item.resource_id?<div className='comment'></div>:""
            }
          </div>
        })}
        </div>
      </div>
      </div>
  )
}

export default ClassroomStream