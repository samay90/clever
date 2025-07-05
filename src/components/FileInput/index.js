import React from "react";
import "./index.css";
import iconsMap from "../../static/iconsMap.json";
const FileInput = ({ label, onChange, files, setFiles }) => {
  return (
    <div className="file_input">
      <label htmlFor="file_input" className="file_input_label">{label}</label>
      <input id="file_input" onChange={onChange} type="file" multiple></input>
      <div className="files">
        {files.map((file, i) => (
          <div className='file_view' key={i}>
              <div className='preview'>
                  <i className={`fa-light ${iconsMap[file.name.split("/")[file.name.split("/").length-1].split(".")[1]]}`}></i>
              </div>
              <div className='file_name'>
                  <p>{file.name.split("/")[file.name.split("/").length-1]}</p>
                  <i onClick={() => setFiles(files.filter((f) => f.name !== file.name))} className="fa-regular fa-xmark"></i>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInput;
