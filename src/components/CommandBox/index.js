import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
const CommandBox = ({classrooms}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const ref = React.useRef()
    const ref2 = React.useRef()
    const ref3 = React.useRef()
    const navigate = useNavigate()
    const [search,setSearch] = React.useState("")
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
    React.useMemo(()=>{
        document.addEventListener("keydown",(e)=>{
            if (isOpen&&e.key==="Enter"){
                e.preventDefault();
                const classroom = classrooms.find((classroom)=>classroom.class_name.toLowerCase().includes(search.toLowerCase()))
                setSearch("")
                setIsOpen(false)
                if (classroom){
                    navigate(`bypass/app/classroom/${classroom.class_id}`);
                }
            }
        })
    },[navigate,isOpen,classrooms,search])
    React.useEffect(()=>{
        if (isOpen){
            ref.current.style.display = "flex";
            ref3.current.focus()
            setTimeout(()=>{
                ref.current.style.background= "#00000048";
                ref2.current.background="red"
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
        <div className='command_content' ref={ref2}>
            <div className='command_input' autoFocus>
                <i className="fa-regular fa-magnifying-glass"></i>
                <input ref={ref3}  value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder='Search classrooms...' />
            </div>
            <div className='command_list'>
                {
                    classrooms.filter(ele => ele.class_name.toLowerCase().includes(search.toLowerCase())).length>0?classrooms.filter(ele => ele.class_name.toLowerCase().includes(search.toLowerCase())).map((classroom,key) => {
                        return <div className={'command_item' + (0===key?" active":"")} key={key}>
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