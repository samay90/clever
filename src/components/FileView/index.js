import "./index.css";
import iconsMap from "./iconsMap.json"
import { UiContext } from "../../store/UiContext";
import { useContext } from "react";
const FileView = ({path,fileName,files}) => {
  
  const {setCrr,setFiles} = useContext(UiContext);
  return (
    <div className='file_view' onClick={()=>{setCrr(files.indexOf(path));setFiles(files);}}>
        <div className='preview'>
            <i className={`fa-light ${iconsMap[path.split("/")[path.split("/").length-1].split(".")[1]]}`}></i>
        </div>
        <div className='file_name'>
            <p>{path.split("/")[path.split("/").length-1]}</p>
        </div>
    </div>
  )
}

export default FileView