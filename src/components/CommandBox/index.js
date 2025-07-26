import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
const CommandBox = ({classrooms,isOpen,setIsOpen}) => {
    const ref = React.useRef()
    const ref2 = React.useRef()
    const ref3 = React.useRef()
    const navigate = useNavigate()
    const [filtered,setFiltered] = React.useState([])
    const [search,setSearch] = React.useState("")
    React.useEffect(()=>{
        setFiltered(classrooms)
    },[classrooms])
    React.useEffect(() => {
        document.addEventListener("keydown",(e)=>{
            if (e.key === "Escape" ){
                e.preventDefault();
                setIsOpen(false);
            }
            if (e.key === " " && e.ctrlKey  ){
                e.preventDefault();
                setIsOpen(true)
            }
        }) 
    },[])
    React.useEffect(()=>{
        document.addEventListener("keydown",(e)=>{
            if (e.key==="Enter" && isOpen){
                e.preventDefault();
                setFiltered((prev)=>{
                    if (prev.length>0){
                        navigate(`/app/classroom/${prev[0].class_id}`);
                        setIsOpen(false)
                        setSearch("")
                    }
                    return prev
                })
            }
        })
    },[isOpen,navigate,filtered])
    React.useEffect(()=>{
        if (isOpen){
            ref.current.style.display = "flex";
            ref3.current.focus()
            setTimeout(()=>{
                ref.current.style.background= "var(--black-bg)";
                ref2.current.background="var(--error)"
                ref2.current.style.transform = "scale(1)";
                ref2.current.style.opacity = "1";
            },[5])
        }else{
            ref.current.style.background= "#00000000";
            ref2.current.style.transform = "scale(0.9)";
            ref2.current.style.opacity = "0";
            setTimeout(()=>{
                ref.current.style.display = "none";
            },[300])
        }
    },[isOpen])
  return (
    <div className={'command_box' + (isOpen?" open":"")} ref={ref}>
        <div onClick={()=>{setIsOpen(false);setSearch("")}} className='command_overlay'>

        </div>
        <div className='command_content' ref={ref2}>
            <div className='command_input' autoFocus>
                <i className="fa-regular fa-magnifying-glass"></i>
                <input value={search} ref={ref3} onChange={(e)=>{setFiltered(classrooms.filter((classroom)=>classroom.class_name.toLowerCase().includes(e.target.value.toLowerCase())));setSearch(e.target.value)}} type="text" placeholder='Search classrooms...' />
            </div>
            <div className='command_list'>
                {
                    filtered.length>0?filtered.map((classroom,key) => {
                        return <div onClick={()=>{navigate(`/app/classroom/${classroom.class_id}`);setIsOpen(false);setSearch("")}} className={'command_item' + (0===key?" active":"")} key={key}>
                            <i className="fa-regular fa-magnifying-glass"></i><h2> {classroom.class_name}</h2>
                        </div>
                    }):<div className='not_found'>
                        <i className="fa-regular fa-ban"></i>
                        <h2>No results found</h2>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CommandBox