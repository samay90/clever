import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
const Home = ({ token, api, user ,classrooms}) => {
  const navigate = useNavigate()
  const handleClassroomClick = (ele) =>{
    const element = document.getElementById(`classroom_card_${ele}`)
    element.classList.add("classroom_card_active")
    setTimeout(()=>{
      navigate("/app/classroom/"+classrooms[ele].class_id)
    },[300])
  }
  return (
    <div className="home_content page">
      <div className="header">
        <div className="emoji">👋</div>
        <div className="text">
          <h1> Hello {user?.first_name}.</h1>
          <p>Happy Learning!</p>{" "}
        </div>
      </div>
      <div className="classrooms" >
        {classrooms.map((classroom,key) => (
          <div className="classroom_card" id={`classroom_card_${key}`} key={key} onClick={()=>handleClassroomClick(key)}>
            <div className="content">
              <h2>{classroom.class_name}</h2>
              <p>{classroom.class_description} hello this isi samds
                sdf
                sdfds
                fdsf
                samdsfd
              </p>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
