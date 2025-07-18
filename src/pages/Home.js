import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import conv from "../static/banner.json"
import Icon from "../components/icon";
import {Empty} from "../components/Empty";
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
          <h1> Hey {user?.first_name}.</h1>
          <p>Happy Learning!</p>{" "}
        </div>
      </div>
      <div className="classrooms" >
        {classrooms.length===0?<Empty img="empty_states_home.svg" head="No classrooms found" body="Create or join a classroom" size="200px" margin="50px 0 15px 0"/>:classrooms.map((classroom,key) => {
          return <div className="classroom_card" style={{background:`url(/banners/${conv[classroom.banner_id]})`}} key={key} onClick={()=>handleClassroomClick(key)}>
            <div className="content">
              <div className="classroom_info">
                <h2>{classroom.class_name}</h2>
                <p>{classroom.class_description}</p>
              </div>
              <div className="creator_info">
                <div className="creator_icon">
                  <Icon url={classroom.creator_profile_image} height={30} chr={classroom.creator_first_name.charAt(0)+classroom.creator_last_name.charAt(0)}></Icon>                
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
