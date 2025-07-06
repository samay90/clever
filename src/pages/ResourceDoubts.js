import React, { useEffect } from 'react'
import Icon from '../components/icon';
import moment from 'moment';
import ModalSecondary from '../components/ModalSecondary';
import TextArea from '../components/TextArea';
import toast from 'react-hot-toast';
import { Empty } from '../components/Empty';
const ResourceDoubts = ({class_id,resource_id,token,api,classroom,user}) => {
  const [allQueries,setAllQueries] = React.useState([]);
  const [crrQuery,setCrrQuery] = React.useState(false); 
  const [queryModal,setQueryModal] = React.useState(false);
  const [value,setValue] = React.useState("");
  const [submitLoading,setSubmitLoading] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [refresh,setRefresh] = React.useState(0);
  const onSubmit = ()=>{
    setSubmitLoading(true);
    const data = fetch(api+`/classroom/${class_id}/resource/${resource_id}/query/${crrQuery.query_id}/solve`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":'application/json',
            "Authorization":"Bearer "+token
        },
        body:JSON.stringify({solution:value})
    })
    data.then((res)=>{
        const parsed = res.json();
        parsed.then((data)=>{
            if (!data.error){
                setRefresh(refresh+1);
                setSubmitLoading(false);
                setQueryModal(false);
            }else{
                toast.error(data.message,{iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},style:{borderRadius:"30px",background:"var(--primary-color)",color:"white",fontWeight:"100",fontSize:"12px"}})
            }
        })
    })
  }
  useEffect(()=>{
    if (class_id && resource_id && token && api && classroom && classroom?.role!=="student"){
         const getResourceQueries =async ()=>{
            setLoading(true);
            const data = await fetch(api+`/classroom/${class_id}/resource/${resource_id}/queries/all`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":'application/json',
                    "Authorization":"Bearer "+token
                }
            })
            const parsed =await data.json()
           if (!parsed.error){
                setLoading(false);
                setAllQueries(parsed.data)
            }else{
                setLoading(false);
            }
        }
        getResourceQueries();
    }
  },[class_id,resource_id,token,api,classroom,refresh])
  return (
    <>
    <ModalSecondary open={queryModal} setOpen={setQueryModal} heading={crrQuery?crrQuery.query_title?crrQuery.query_title:"Doubt":""}>
      {crrQuery?<div className='doubt_modal'>
        <div className='doubt_content'>
          {crrQuery.query_body}
        </div>
        <div className='student_info'>
          <div className='icon'>
            <Icon url={crrQuery.user_profile_image} height={18} chr={crrQuery.user_first_name.charAt(0)+crrQuery.user_last_name.charAt(0)}></Icon>
          </div>
          <div className='student_name'>
            {crrQuery.user_first_name+" "+crrQuery.user_last_name}
          </div>
          <div className='date'>
            {moment(parseInt(crrQuery.updated_at)).fromNow()}
          </div>
        </div>
        <div className='doubt_reply'>
          <TextArea key={crrQuery.query_id} secondary_placeholder={"Clever it."} maxLength={500} value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Solution' ></TextArea>
        </div>
        <div className='button_group btn_group' style={{width:"calc(100% - 40px)"}}>
          <button onClick={()=>{setQueryModal(false)}} className='btn_tertiary'>Cancel</button>
          <button style={{width:"80px"}} onClick={onSubmit} disabled={value===""||value===crrQuery.solution||submitLoading} className='btn_secondary'>{submitLoading?<span className='btn_loading'></span>:"Submit"}</button>
        </div>
      </div>:""}
    </ModalSecondary>
    <div className='page resource_doubts'>
      <div className='header'>
        <h3><i className="fa-regular fa-clipboard-question"></i>&nbsp; Resource Doubts</h3>
      </div>
      <div className='doubts'>
        {
          loading===false?allQueries.length>0?allQueries.map((item,key)=>{
            return <div className='doubt' onClick={()=>{setCrrQuery(item);setQueryModal(true);setValue(item.solution??"")}} key={key}>
              <div className='student_info'>
                <div className='student_icon'>
                  <Icon url={item.user_profile_image} height={20} chr={item.user_first_name.charAt(0)+item.user_last_name.charAt(0)}></Icon>
                </div>
                <div className='student_name'>
                  {item.user_first_name+" "+item.user_last_name}
                </div>
                <div className='doubt_date'>
                  {moment(parseInt(item.updated_at)).fromNow()}
                </div>
              </div>
              <div className='doubt_content'>
                <h4>{item.query_title}</h4>
                <p>{item.query_body}</p>
              </div>
              <div className='doubt_reply'>
                <div className='tag'>
                  {item.solution?<p className='active'>Solved</p>:<p>Unsolved</p>}
                </div>
                {item.solution?<div className='student_info solver_info'>
                  <div className='student_icon'>
                    <Icon url={item.solver_profile_image} height={18} chr={item.solver_first_name.charAt(0)+item.solver_last_name.charAt(0)}></Icon>
                  </div>
                  <div className='student_name'>
                    {item.solution_by===user.user_id?"You":item.solver_first_name+" "+item.solver_last_name}
                  </div>
                  <div className='doubt_date'>
                    {moment(parseInt(item.solved_at)).fromNow()}
                  </div>
                </div>:""}
              </div>
            </div>
          }):<Empty head={"No doubts yet!"} img={"empty_laptop_dog.svg"}  body={"Students haven't asked any doubts yet."} size={"220px"} margin="50px 0 0px 0"/>:<>
            {Array.from({length: 3}).map((item,key)=>{
              return <div className='skeleton_doubt doubt' key={key}>
              <div className='student_info'>
                <div className='student_icon'>
                </div>
                <div className='student_name'>
                </div>
                <div className='doubt_date'>
                </div>
              </div>
              <div className='doubt_content'>
                <h4>  </h4>
                <p></p>
                <p></p>
              </div>
              <div className='doubt_reply'>
                <div className='tag'>
                </div>
              </div>
            </div>
            })}
          </>
        }
      </div>
    </div>
    </>
  )
}

export default ResourceDoubts