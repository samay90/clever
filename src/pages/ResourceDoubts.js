import React, { useEffect } from 'react'

const ResourceDoubts = ({class_id,resource_id,token,api,classroom}) => {
  const [allQueries,setAllQueries] = React.useState([]);
  useEffect(()=>{
    if (class_id && resource_id && token && api && classroom && classroom?.role!=="student"){
         const getResourceQueries =async ()=>{
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
                setAllQueries(parsed.data)
            }
        }
        getResourceQueries();
    }
  },[class_id,resource_id,token,api,classroom])
  return (
    <div className='page resource_doubts'>
      <div className='header'>
        <h2><i className="fa-regular fa-clipboard-question"></i>&nbsp; Resource Doubts</h2>
      </div>
    </div>
  )
}

export default ResourceDoubts