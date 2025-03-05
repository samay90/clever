import React from 'react'
import "./index.css"
import InputSecondary from '../InputSecondary'
import TextArea from '../TextArea'
import FileInput from '../FileInput'
import { UiContext } from '../../store/UiContext'
import axios from 'axios'
import toast from 'react-hot-toast'
const AddWork = ({ class_id,heading ,open,setOpen,token,api}) => {
    const ref = React.useRef();
    const ref2 = React.useRef();
    const {side_open} = React.useContext(UiContext);
    const [data,setData] = React.useState({"title":"","body":""})
    const [current,setCurrent] = React.useState(0)
    const [files,setFiles] = React.useState([])
    const [loading,setLoading] = React.useState(false)
    React.useEffect(() => {
      ref2.current.style.width=`calc(100vw - ${side_open ? "280px" : "50px"}) `
    },[side_open])
    React.useEffect(() => {
      if (open && ref) {
        ref.current.style.display = "flex";
        setTimeout(() => {
          ref.current.style.background = "#00000060";
          ref2.current.style.opacity = "1";
          ref2.current.style.transform = "scale(1)";
        }, 10);
      } else {
        ref2.current.style.opacity = "0";
        ref2.current.style.transform = "scale(0.9)";
        ref.current.style.background = "#00000000";
        setTimeout(() => {
          if (ref && ref.current){
            ref.current.style.display = "none";
          }
        }, 300);
      }
    }, [open]);
    React.useEffect(() => {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      });
    }, [setOpen]);
    const addWork = async () =>{
      const formData = new FormData()
      setLoading(true)
      formData.append("title",data.title)
      formData.append("body",data.body)
      formData.append("due_date_time",data.due_date_time)
      formData.append("total_marks",data.total_marks)
      files.forEach((file)=>{
        formData.append("attachments",file)
      })
      try{
        const raw = await axios.post(api+`/classroom/${class_id}/${current === 0 ? "resource" : "assignment"}/new`,formData,{headers:{authorization:"Bearer "+token}})
        setLoading(false)
        toast.success(raw.data.message, {
          iconTheme:{primary:"#fff",secondary:"#5C60F5"},
          style:{
            borderRadius:"30px",
            background:"#5C60F5",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
        setOpen(false)
        
      }catch (e){
        setLoading(false)
        toast.error(e.response.data.message, {
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
    <div className="add_work ">
      <div className="overlay" ref={ref}>
        <div className="selector" ref={ref2}>
          <div className="nav_tab">
            <div className="title">{heading}</div>
            <div
              className="close_button"
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="fa-regular fa-xmark"></i>
            </div>
          </div>
            <div className='selector_nav'>
                <ul>
                <span style={{left:current===0?"calc(0% + 5px)":"calc(50%)"}} className='slider'></span>
                    <li className={current === 0 ? "active" : ""} onClick={() => {setCurrent(0);setData({"title":"","body":""});setFiles([])}}>Resource</li>
                    <li className={current === 1 ? "active" : ""} onClick={() => {setCurrent(1);setData({"title":"","body":"","due_date_time":"","total_marks":0});setFiles([])}}>Assignment</li>
                </ul>
            </div>
            <div className='form'>
                {
                    current===0?<div className='form_content'>
                        <InputSecondary maxLength={50} placeholder="Resource name" secondary_placeholder="Resource name" type="text" onChange={(e)=>{setData({...data,title:e.target.value})}} value={data.title} disabled={false}></InputSecondary>
                        <TextArea placeholder="Resource description" secondary_placeholder="Resource description" maxLength={500} onChange={(e)=>{setData({...data,body:e.target.value})}} value={data.body}></TextArea>
                        <FileInput key={1} label="Add attachments" onChange={(e)=>{setFiles([...e.target.files])}} files={files} setFiles={setFiles}></FileInput>
                    </div>:<div className='form_content'>
                        <InputSecondary maxLength={50} placeholder="Assignment name" secondary_placeholder="Assignment name" type="text" onChange={(e)=>{setData({...data,title:e.target.value})}} value={data.title} disabled={false}></InputSecondary>
                        <InputSecondary placeholder="Assignment due date" secondary_placeholder="Assignment due date" type="datetime-local" onChange={(e)=>{setData({...data,due_date_time:e.target.value})}} value={data.due_date_time} disabled={false}></InputSecondary>
                        <InputSecondary placeholder={"Total marks"} secondary_placeholder="Total marks" type="number" onChange={(e)=>{setData({...data,total_marks:e.target.value})}} value={data.total_marks} disabled={false}/>
                        <TextArea placeholder="Assignment description" secondary_placeholder="Assignment description" maxLength={500} onChange={(e)=>{setData({...data,body:e.target.value})}} value={data.body}></TextArea>
                        <FileInput key={0} label="Add attachments" onChange={(e)=>{setFiles([...e.target.files])}} files={files} setFiles={setFiles}></FileInput>
                    </div>
                }
                <div className='btn_group'>
                  <button className='btn_tertiary' onClick={() => {setOpen(false);}}>Cancel</button>
                  <button style={{width:"80px"}} disabled={loading} className='btn_secondary' onClick={() => {addWork()}}>{loading?<span className='btn_loading'/>:"Create"}</button>
                </div>

            </div>
          </div>
      </div>
    </div>
  )
}

export default AddWork