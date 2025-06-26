import React, { useContext, useEffect, useRef } from 'react'
import './index.css'
import { UiContext } from '../../store/UiContext'
import iconsMap from './iconsMap.json';
import types from './types.json';
const FileViewer = () => {
    const {crr,setCrr,files,setFiles} = useContext(UiContext);
    const [fileName,setFileName] = React.useState("");
    const ref = useRef();
    const scrollRef = useRef();
    const [zoom,setZoom] = React.useState(100);    
    useEffect(()=>{
        if (crr>=0){
            setFileName(files[crr].split("/")[files[crr].split("/").length-1]);
            ref.current.style.display = "flex";
            setTimeout(()=>{
                ref.current.style.opacity =  "1";
            },[10])
        }else{
            ref.current.style.opacity = "0";
            setTimeout(()=>{
                ref.current.style.display = "none";
            },[300])
        }
    },[crr,files,setFiles])
    useEffect(()=>{
        let interval = document.addEventListener("keydown",(e)=>{
            if (e.key === "Escape"){
                setCrr(-1);
                setFiles([]);
            }
        })
        return ()=>{
            document.removeEventListener("keydown",interval);
        }
    },[setFiles,files.length,setCrr])
    useEffect(()=>{
        if (scrollRef && scrollRef.current){
            let interval = scrollRef.current.addEventListener("wheel",(e)=>{
                e.preventDefault();
                setZoom(prev=>Math.min(Math.max(prev+parseInt(e.deltaY/80),10),200));
            })
            return ()=>{
                scrollRef.current?.removeEventListener("wheel",interval);
            }
        }
    },[scrollRef,setZoom])

  return (
    <div ref={ref} className={`file_viewer ${crr>=0?"active":""}`}>
        <div className='view_navbar'>
            <div className='info'>
                <div className='icon'>
                    <i className={`fa-light ${iconsMap[fileName?.split(".")[1]]}`}></i>
                </div>
                <div className='file_name'>{fileName}</div>
            </div>
            <div className='options'>
                <a className='option' rel='noreferrer' href={crr>=0?files[crr]:"no"} target='_blank'>
                    <i className="fa-regular fa-arrow-down-to-line"></i>
                </a>
                <div className='option' onClick={()=>{setCrr(-1);setFiles([])}}>
                    <i className="fa-regular fa-close"></i>
                </div>
            </div>
        </div>
        <div className='preview'>
            {
                types[fileName?.split(".")[1]] === "img"?<div className='object' style={{transform:`scale(${zoom/100})`}}>
                    {crr>=0?<img className='file' alt={files[crr]} src={files[crr]}/>:""}
                </div>:<div className='no_preview'>
                    <p>No preview available.</p>
                    <button className='download_button' onClick={()=>window.open(files[crr],"_blank")}>
                        <i className="fa-regular fa-arrow-down-to-line"></i> Download
                    </button>
                </div>
            }
        </div>
        <div className='toolbar'>
            <div className='zoom'>Zoom <span ref={scrollRef}>{zoom}%</span></div>
            <div className='tools'>
                <div onClick={()=>setZoom(Math.min(zoom+10,200))}><i className="fa-regular fa-plus"></i></div>
                <div onClick={()=>setZoom(Math.max(zoom-10,10))}><i className="fa-regular fa-minus"></i></div>
            </div>
        </div>
        {
            crr>0?<div className='previous arrows' onClick={()=>{setCrr(crr-1);}}>
            <i className="fa-regular fa-chevron-left"></i>
        </div>:""
        }
        {
            crr<files.length-1?<div className='next arrows' onClick={()=>{setCrr(crr+1);}}>
            <i className="fa-regular fa-chevron-right"></i>
        </div>:""
        }
        <div className='close_area' onClick={()=>{setFiles([]);setCrr(-1);}}></div>
    </div>
  )
}

export default FileViewer