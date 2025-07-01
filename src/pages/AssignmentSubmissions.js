import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/icon";
import SearchInput from "../components/SearchInput";
import SubmissionPage from "./SubmissionPage";
import moment from "moment";
const AssignmentSubmissions = ({ api, class_id, token,assignment, classroom }) => {
  const { assignment_id } = useParams();
  const [submissions, setSubmissions] = React.useState([]);
  const [search,setSearch ]= React.useState("");
  const [submission,setSubmission] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const getSubmissions = async () => {
      if (token && api && assignment_id && class_id) {
        const data = await fetch(
          api +
            `/classroom/${class_id}/assignment/${assignment_id}/submissions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const parsed = await data.json();
        if (!parsed.error) {
          setSubmissions(parsed.data);
        } else {
          navigate("/app/home");
        }
      }
    };
    getSubmissions();
  }, [assignment_id, api, class_id, token, navigate]);
  return (
    <div className="page assignment_submissions">
      <div className="as_content">
        <div className="lists">
          <div className="student_card header">
            <h3>Students</h3>
            <SearchInput placeholder={"Search student..."} value={search} setValue={setSearch}  />
          </div>
          {
            submissions.filter((i)=>(i.first_name+i.last_name).toLowerCase().includes(search.toLowerCase())|| i.email.toLowerCase().includes(search.toLowerCase())).map((i,key)=>{
              return <div className="student_card" onClick={()=>{setSubmission(i);navigate(`/app/classroom/${class_id}/assignment/${assignment_id}/submissions/${i.submission_id}`);navigate(`/app/classroom/${class_id}/assignment/${assignment_id}/submissions/${i.submission_id}`)}} key={key}>
                <div className="student_info">
                  <div className="icon">
                    <Icon url={i.profile_image} height={35} chr={i.first_name.charAt(0)+i.last_name.charAt(0)}></Icon>
                    <span className={`status ${i.submission_id===null?"orange":(i.marks===null?"red":"green")}`}></span>
                  </div>
                  <div className="name">
                    <h3>{i.first_name+" "+i.last_name}</h3>
                    <p>{i.email}</p>
                  </div>
                </div>
                <div></div>
              </div>
            })
          }
        </div>
        <div className="submissions">
          <Routes>
            <Route path="/:submission_id" element={<SubmissionPage key={submission?.submission_id} api={api} token={token} assignment={assignment} assignment_id={assignment_id} class_id={class_id} submission={submission}></SubmissionPage>}></Route>
            <Route path="/" element={
              <div className="default_page page">
            <div className="submission_title">
              <h3><i className="fa-regular fa-diagram-project"></i> Statistics</h3>
            </div>
            <div className="submission_statistics">
              <div className="card">
                <div className="details">
                    <h3>Submissions</h3>
                  <h1>{submissions.filter((i)=>i.submission_id!=null).length}<span>/{submissions.length}</span>
                  </h1>
                  <p>students</p>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-users"></i>
                </div>
              </div>
              <div className="card">
                <div className="details">
                    <h3>Graded</h3>
                  <h1>{submissions.filter((i)=>i.marks!=null).length}<span>/{submissions.filter((i)=>i.submission_id!=null).length}</span>
                  </h1>
                  <p>students</p>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-graduation-cap"></i>
                </div>
              </div>
              <div className="card">
                <div className="details">
                    <h3>Deadline</h3>
                  <h1><span className="non_h1">{moment(parseInt(assignment?.due_date_time)).format("Do MMM YYYY")}</span>
                  </h1>
                  <p>{moment(parseInt(assignment?.due_date_time)).format("hh:mm A")}</p>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-alarm-clock"></i>
                </div>
              </div>
              <div className="card">
                <div className="details">
                    <h3>Avg Marks</h3>
                  <h1>{(submissions.reduce((a,b)=>a+b.marks,0)/submissions.length).toFixed(1)}<span>/{assignment?.total_marks}</span>
                  </h1>
                  <p>marks</p>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-square-poll-vertical"></i>
                </div>
              </div>
            </div>
            <div className="submission_title instructions">
              <h4><i className="fa-regular fa-triangle-exclamation"></i> Instructions</h4>
              <p>
                <span className="status orange"></span>Student has not submitted the assignment.
              </p>
              <p>
                <span className="status red"></span>Remained for evaluation.
              </p>
              <p>
                <span className="status green"></span>Graded.
              </p>
            </div>
          </div>
            }></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
