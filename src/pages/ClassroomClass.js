import React, { useEffect } from 'react'
import Icon from "../components/icon"
import ModalSecondary from '../components/ModalSecondary';
import moment from 'moment';
import Dropdown from '../components/Dropdown';
import toast from 'react-hot-toast';
import {Empty} from '../components/Empty';
const ClassroomClass = ({api,class_id,token,classroom,user,setVisible}) => {
    const [classmates,setClassmates] = React.useState([]);
    const [teachers,setTeachers] = React.useState([]);
    const [students,setStudents] = React.useState([]);
    const [open,setOpen] = React.useState(false);
    const [crrUser,setCrrUser] = React.useState({});
    useEffect(()=>{
        setTeachers(classmates.filter((item)=>{return item.role === "teacher"}));
        setStudents(classmates.filter((item)=>{return item.role === "student"}));
    },[classmates])
    useEffect(()=>{
        setVisible(true)
        const getClassMates = async () => {
            const raw =await fetch(api+`/classroom/${class_id}/class`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Accept":"application/json",
                    "Authorization":"Bearer "+token
                }
            })
            const parsed = await raw.json();
            setClassmates(parsed.data);
        }
        if (token){
            getClassMates()
        }
    },[token,api,class_id,setVisible])
    const getUserData =async (user_id) =>{
        const raw = await fetch(api+`/classroom/${class_id}/class/${user_id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+token
            }
        })
        const parsed = await raw.json();
        setCrrUser(parsed.data);
    }
    useEffect(()=>{
        if (!open){setTimeout(()=>{setCrrUser({})},300)}
    },[open])
    const manageUser = async (action,user_id,action_type) =>{
        const raw = await fetch(api+`/classroom/${class_id}/manage`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+token
            },
            body:JSON.stringify({
                action:action,
                action_type:action_type,
                user_id:user_id
            })
        })
        const parsed = await raw.json();
        if (!parsed.error){
            getUserData(user_id);
            toast.success("Class Updated",{
                iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
                style:{
                  borderRadius:"30px",
                  background:"var(--primary-color)",
                  color:"white",
                  fontWeight:"100",
                  fontSize:"12px"
                }
              })
        }else{
            toast.error(parsed.message,{
                iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
                style:{
                  borderRadius:"30px",
                  background:"var(--primary-color)",
                  color:"white",
                  fontWeight:"100",
                  fontSize:"12px"
                }
              })
        }
    }
  return (
    <div className='page classroom_class_content'>
        <ModalSecondary heading={crrUser?.first_name?crrUser.first_name+" "+crrUser.last_name:"Loading..."} open={open} setOpen={setOpen}>
            {crrUser?.first_name?<div className='user_profile_modal'>
                <div className='user_avatar'>
                    <div className='user_icon'>
                        <Icon url={crrUser.url} chr={crrUser.first_name[0]+crrUser.last_name[0]} height={60}></Icon>
                    </div>
                </div>
                {crrUser.bio?<div className='user_info_content'>
                    <p className='tag'>Biography</p>
                    <p>{crrUser.bio}</p>
                </div>:""}
                <div className='user_info_content'>
                    <p className='tag'>{crrUser.role}</p>
                    <p>Joined on {moment(parseInt(crrUser.created_at)).format('ll')}</p>
                    {crrUser.created_at!==crrUser.updated_at?<p>Updated on {moment(parseInt(crrUser.updated_at)).format('ll')}</p>:''}
                </div>
                <div className='user_info_content'>
                    <p><i className ="fa-regular fa-inbox"></i> <span>{crrUser.email}</span></p>
                    <p><i className ="fa-regular fa-phone"></i> <span>{crrUser.phone_no}</span></p>
                    {crrUser.country?<><p><i className="fa-regular fa-location-dot"></i> <span>{crrUser.country}{crrUser.state?", "+crrUser.state:""}{crrUser.city?", "+crrUser.city:""}</span></p></>:""}
                    {crrUser.dob?<p><i className="fa-regular fa-cake-candles"></i> <span>{moment(parseInt(crrUser.dob)).format('ll')}</span></p>:""}
                </div>
            </div>:""}
        </ModalSecondary>
        {classmates.length>0?<>
            <div className='class_division'>
            <h2>Creator</h2>
            <div className='persons'>
                    {classmates.filter(i=>i.role==="creator").map((i,k)=>{
                        return <div key={k} className='card' onClick={()=>{getUserData(i.user_id);setOpen(true)}}>
                            <div className='part'>
                                <div className='profile_icon'>
                                    <Icon url={i.url} chr={i.first_name[0]+i.last_name[0]} height={35}></Icon>
                                </div>
                                <div className='name'>{i.first_name} {i.last_name}</div>
                            </div>
                            <div className='view_button'><i className="fa-regular fa-eye"></i></div>
                        </div>
                    })}
            </div>
        </div>
        {teachers.length>0?<div className='class_division'>
            <h2>Teachers</h2>
            <div className='persons'>
                    {teachers.map((i,k)=>{
                        return <div key={k} className='card'  >
                            <div className='part'>
                                <div className='profile_icon'>
                                    <Icon url={i.url} chr={i.first_name[0]+i.last_name[0]} height={35}></Icon>
                                </div>
                                <div className='name'>{i.first_name} {i.last_name}</div>
                            </div>
                            <div className='buttons'>
                                <div className='view_button' onClick={()=>{getUserData(i.user_id);setOpen(true)}}><i className="fa-regular fa-eye"></i></div>
                                {classroom&&classroom.role==="creator"?<Dropdown opener={<div className='view_button'><i className="fa-regular fa-ellipsis-vertical"></i></div>}>
                                    <div className='profile_dropdown'>
                                        <div className='dropdown_item' onClick={()=>{manageUser("S",i.user_id,"M")}}><i className="fa-regular fa-arrow-down"></i> Make Student</div>
                                        <div className='dropdown_item' onClick={()=>{manageUser("S",i.user_id,"R")}}><i className="fa-regular fa-trash-can"></i> Remove</div>
                                    </div>
                                </Dropdown>:""}
                            </div>
                        </div>
                    })}
            </div>
        </div>:""}
        
        <div className='class_division'>
            <h2>Classmates</h2>
            <div className='persons'>
                    {students.length>0?students.map((i,k)=>{
                        return <div key={k} className='card'  >
                            <div className='part'>
                                <div className='profile_icon'>
                                    <Icon url={i.url} chr={i.first_name[0]+i.last_name[0]} height={35}></Icon>
                                </div>
                                <div className='name'>{i.first_name} {i.last_name}</div>
                            </div>
                            <div className='buttons'>
                                <div className='view_button' onClick={()=>{getUserData(i.user_id);setOpen(true)}}><i className="fa-regular fa-eye"></i></div>
                                {classroom&&classroom.role==="creator"?<Dropdown opener={<div className='view_button'><i className="fa-regular fa-ellipsis-vertical"></i></div>}>
                                    <div className='profile_dropdown'>
                                        <div className='dropdown_item' onClick={()=>{manageUser("T",i.user_id,"M")}}><i className="fa-regular fa-arrow-up"></i> Make Teacher</div>
                                        <div className='dropdown_item' onClick={()=>{manageUser("S",i.user_id,"R")}}><i className="fa-regular fa-trash-can"></i> Remove</div>
                                    </div>
                                </Dropdown>:""}
                            </div>
                        </div>
                    }):<Empty head={"You have no classmates"}  body={"Add classmates to your classroom"} img={"empty_cat_book.svg"} size={"150px"} margin={"40px 0 10px 0"}></Empty>}
            </div>
        </div>
        </>:<>
        <div className='class_division skeleton'>
            <h2>Creator</h2>
            <div className='persons'>
                <div className='card'>
                    <div className='part'>
                        <div className='profile_icon '>
                            <span></span>
                        </div>
                        <div className='name'></div>
                        </div>
                        <div className='view_button ske'></div>
                </div>
            </div>
        </div> 
        <div className='class_division skeleton'>
            <h2>Teachers</h2>
            <div className='persons'>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
            </div>
        </div>  
        <div className='class_division skeleton'>
            <h2>Classmates</h2>
            <div className='persons'>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
                <div className='card'><div className='part'><div className='profile_icon '><span></span></div><div className='name'></div></div><div className='view_button ske'></div></div>
            </div>
        </div>   
        </>}
    </div>
  )
}

export default ClassroomClass