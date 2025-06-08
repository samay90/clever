import React, { useContext, useEffect, useRef } from 'react'
import './index.css'
import { UiContext } from '../../store/UiContext'
import iconsMap from './iconsMap.json';
import types from './types.json';
const FileViewer = () => {
    const {filePath,setFilePath,files,setFiles} = useContext(UiContext);
    const [fileName,setFileName] = React.useState("");
    const [crr,setCrr] = React.useState(0);
    const ref = useRef();
    const scrollRef = useRef();
    const [zoom,setZoom] = React.useState(100);    
    useEffect(()=>{
        if (filePath){
            setCrr(files.indexOf(filePath));
            setFileName(filePath.split("/")[filePath.split("/").length-1]);
            ref.current.style.display = "flex";
            setTimeout(()=>{
                ref.current.style.opacity = "1";
            },[10])
        }else{
            ref.current.style.opacity = "0";
            setTimeout(()=>{
                ref.current.style.display = "none";
            },[300])
        }
    },[filePath,files,setFilePath,setFiles])
    useEffect(()=>{
        document.addEventListener("keydown",(e)=>{
            if (e.key === "Escape"){
                setFilePath("");
                setFiles([]);
            }else if (e.key === "ArrowRight"){
                setCrr((prev)=>{
                    if (prev<files.length-1){
                        return prev+1;
                    }return prev;
                })
            }else if (e.key === "ArrowLeft"){
                setCrr((prev)=>{
                    if (prev>0){
                        return prev-1;
                    }return prev;
                })
            }
        })
    },[setFilePath,setFiles,files])
    useEffect(()=>{
        if (crr<files.length){
            setFilePath(files[crr]);
        }
    },[crr,setFilePath,files])
    useEffect(()=>{
        if (scrollRef && scrollRef.current){
            scrollRef.current.addEventListener("wheel",(e)=>{
                e.preventDefault();
                setZoom(Math.min(Math.max(zoom+parseInt(e.deltaY/80),10),200));
            })
        }
    })

  return (
    <div ref={ref} className={`file_viewer ${filePath?"active":""}`}>
        <div className='view_navbar'>
            <div className='info'>
                <div className='icon'>
                    <i className={`fa-light ${iconsMap[fileName?.split(".")[1]]}`}></i>
                </div>
                <div className='file_name'>{fileName}</div>
            </div>
            <div className='options'>
                <a className='option' rel='noreferrer' href={filePath} target='_blank'>
                    <i className="fa-regular fa-arrow-down-to-line"></i>
                </a>
                <div className='option' onClick={()=>{setFilePath("");setFiles([])}}>
                    <i className="fa-regular fa-close"></i>
                </div>
            </div>
        </div>
        <div className='preview'>
            {
                types[fileName?.split(".")[1]] === "img"?<div className='object' style={{transform:`scale(${zoom/100})`}}>
                    {filePath?<img className='file' alt={filePath} src={filePath}/>:""}
                </div>:<div className='no_preview'>
                    <p>No preview available.</p>
                    <button className='download_button' onClick={()=>window.open(filePath,"_blank")}>
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
            crr>0?<div className='previous arrows' onClick={()=>{setCrr(crr-1);setFilePath(files[crr-1])}}>
            <i className="fa-regular fa-chevron-left"></i>
        </div>:""
        }
        {
            crr<files.length-1?<div className='next arrows' onClick={()=>{setCrr(crr+1);setFilePath(files[crr+1])}}>
            <i className="fa-regular fa-chevron-right"></i>
        </div>:""
        }
        <div className='close_area' onClick={()=>{setFilePath("");setFiles([])}}></div>
    </div>
  )
}

export default FileViewer