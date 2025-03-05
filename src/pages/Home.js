import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import conv from "../static/banner.json"
import Icon from "../components/icon";
const Home = ({ token, api, user ,classrooms}) => {
  const navigate = useNavigate()
  const handleClassroomClick = (ele) =>{
    navigate("/app/classroom/"+classrooms[ele].class_id)
  }
  return (
    <>
    <div className="home_content page">
      <div className="header">
        <div className="emoji">👋</div>
        <div className="text">
          <h1> Hello {user?.first_name}.</h1>
          <p>Happy Learning!</p>{" "}
        </div>
      </div>
      <div className="classrooms" >
        {classrooms.map((classroom,key) => {
          return <div className="classroom_card" style={{background:`url(${api}/banners/${conv[classroom.banner_id]})`}} key={key} onClick={()=>handleClassroomClick(key)}>
            <div className="content">
              <div className="classroom_info">
                <h2>{classroom.class_name.length>20?classroom.class_name.slice(0,20)+"...":classroom.class_name}</h2>
                <p>{classroom.class_description}</p>
              </div>
              <div className="creator_info">
                <div className="creator_icon">
                  <Icon url={classroom.creator_profile_image?api+"/profile/"+classroom.creator_profile_image:null} height={30} chr={classroom.creator_first_name.charAt(0)}></Icon>                
                </div>
                <div>
                <div className="creator_name">
                {classroom.creator_id===user.user_id?"You":classroom.creator_first_name+" " + classroom.creator_last_name}
                </div>
                </div>
              </div>
            </div>
        </div>
        })}
      </div>
    </div>
    </>
  );
};

export default Home;
