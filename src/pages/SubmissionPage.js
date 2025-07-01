import React, { useEffect } from 'react'
import Icon from '../components/icon'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import MarksInput from '../components/MarksInput';
import toast from 'react-hot-toast';
import FileView from '../components/FileView';

const SubmissionPage = ({api,class_id,token,assignment,assignment_id,classroom,submission}) => {
  const navigate = useNavigate();
  const [marks,setMarks] = React.useState("");
  useEffect(()=>{
    if (submission && submission.marks!=null){
      setMarks(submission.marks);
    }
  },[submission])
  const [isLoading,setIsLoading] = React.useState(false);
  const updateMarks = async () => {
    setIsLoading(true);
    const data = await fetch(api+"/classroom/"+class_id+"/assignment/"+assignment_id+"/submission/"+submission?.submission_id+"/mark",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({marks:parseFloat(marks)})
    });
    const parsed = await data.json();
    if (!parsed.error){
      setIsLoading(false);
      submission.marks = marks;
    }else{
      setIsLoading(false);
      toast.error(parsed.message,{
        iconTheme:{primary:"#fff",secondary:"#5C60F5"},
        style:{
          borderRadius:"30px",
          background:"#5C60F5",
          color:"white",
          fontWeight:"100",
          fontSize:"12px"
        }
      });
    }
  }
  return (
    <div className='page submission_page' key={submission?.submission_id}>
        <div className='submission_navbar'>
          <div>
            <div className='back'>
              <i className="fa-regular fa-arrow-left" onClick={()=>{navigate(`/app/classroom/${class_id}/assignment/${assignment_id}/submissions`)}}></i>
            </div>
            <div className='user_icon'>
              <Icon url={submission?.profile_image} chr={submission?.first_name.charAt(0)+submission?.last_name.charAt(0)} height={35}/>
            </div>
            <div className='user_info'>
              <h3>{submission?.first_name+" "+submission?.last_name}</h3>
              <p>{submission?.email}</p>
            </div>
          </div>
          <div>
            <span className={`status ${submission?.submission_id===null?"orange":(submission?.marks===null?"red":"green")}`}></span>
          </div>
        </div>
        <div className='submission_content'>
          <div className='submission_info'>
            <h3>Submitted on</h3>
            <p>{moment(parseInt(submission?.created_at)).format("llll")}</p>  
          </div>
          <div className='submission_marks'>
            <MarksInput key={submission?.submission_id} isLoading={isLoading} onSubmit={updateMarks} init_value={submission?.marks??""} placeholder="Enter marks" value={marks} setValue={setMarks} totalMarks={assignment?.total_marks}/>
          </div>
          <div className='submission_file'>
            <h3>Attachments</h3>
            <div className='files'>
              {JSON.parse(submission&&submission.submission?submission.submission:'[]').map((file,index)=>{return <FileView files={JSON.parse(submission&&submission.submission?submission.submission:'[]')} key={index} path={file} fileName={file}/>})}
            </div>
          </div>
        </div>
    </div>
  )
}

export default SubmissionPage