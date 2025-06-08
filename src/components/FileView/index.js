import "./index.css";
import iconsMap from "./iconsMap.json"
import { UiContext } from "../../store/UiContext";
import { useContext } from "react";
const FileView = ({path,fileName,files}) => {
  const {setFilePath,setFiles} = useContext(UiContext);

  return (
    <div className='file_view' onClick={()=>{setFilePath(path);setFiles(files);}}>
        <div className='preview'>
            <i className={`fa-light ${iconsMap[fileName.split(".")[1]]}`}></i>
        </div>
        <div className='file_name'>
            <p>{fileName}</p>
        </div>
    </div>
  )
}

export default FileView