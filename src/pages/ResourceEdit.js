import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import conv from "../static/banner.json";
import colors from "../static/colors.json";
import EditorTextArea from "../components/EditorTextArea";
import EditorInput from "../components/EditorInput";
import FileInput from "../components/FileInput";
import axios from "axios";
import toast from "react-hot-toast";
const ResourceEdit = ({ api, class_id, token, classroom }) => {
  const { resource_id } = useParams();
  const [resource, setResource] = React.useState(null);
  const navigate = useNavigate();
  const [deleteIds, setDeleteIds] = React.useState([]);
  const [newAttachments, setNewAttachments] = React.useState([]);
  const [loading,setLoading] = React.useState(false);
  React.useEffect(() => {
    const getResource = async () => {
      if (token && api) {
        const data = await fetch(
          api + `/classroom/${class_id}/resource/${resource_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const parsed = await data.json();
        if (!parsed.error) {
          setResource(parsed.data);
        } else {
          navigate("/app/home");
        }
      }
    };
    getResource();
  }, [resource_id, api, class_id, token, navigate]);
  const editResource = async () =>{
      const formData = new FormData()
      setLoading(true)
      formData.append("title",resource.title)
      formData.append("body",resource.body)
      newAttachments.forEach((file)=>{
        formData.append("attachments",file)
      })
      formData.append("delete_attachments",JSON.stringify(deleteIds))
      try{
        const raw = await axios.post(api+`/classroom/${class_id}/resource/${resource_id}/edit`,formData,{headers:{authorization:"Bearer "+token}})
        setLoading(false)
        toast.success(raw.data.message, {
          iconTheme:{primary:"#fff",secondary:"#5C60F5"},
          style:{
            borderRadius:"30px",
            background:"#5C60F5",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
        navigate("/app/classroom/"+class_id+"/resource/"+resource_id);        
      }catch (e){
        setLoading(false)
        toast.error(e.response.data.message, {
          iconTheme:{primary:"#fff",secondary:"#5C60F5"},
          style:{
            borderRadius:"30px",
            background:"#5C60F5",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
      }
    }
  return (
    <>
      <div className="page ra_page modal_page_content">
        {resource ? (
          <div className="main_content">
            {classroom?.role !== "student" ? (
              <div className="ra_bottom_bar">
                <button
                  className="btn_tertiary"
                  onClick={() => {
                    navigate(
                      "/app/classroom/" + class_id + "/resource/" + resource_id
                    );
                  }}
                >
                  Cancel
                </button>
                <button disabled={loading} style={{width:"101px"}} className="btn_secondary" onClick={editResource}>
                  {loading?<span className="btn_loading"></span>:<><i className="fa-regular fa-pen"></i> &nbsp; Submit</>}
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="top_content">
              <div className="header">
                {classroom ? (
                  <div className="icon">
                    {classroom.banner_id ? (
                      <i
                        className="fa-regular fa-book "
                        style={{
                          "--bg":colors[conv[classroom?.banner_id]]
                        }}
                      ></i>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="info">
                  <div className="title" style={{ width: "calc(100% - 35px)" }}>
                    <EditorInput
                      maxLength={50}
                      placeholder="Title here..."
                      fontSize="25px"
                      color={"#000"}
                      value={resource?.title}
                      setValue={(value) => {
                        setResource({ ...resource, title: value.target.value });
                      }}
                    ></EditorInput>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="mid_content">
              <div className="body">
                <EditorTextArea
                  maxLength={500}
                  placeholder="Body here..."
                  fontSize="0.9025rem"
                  color={"#3c4043"}
                  value={resource?.body}
                  setValue={(value) => {
                    setResource({ ...resource, body: value.target.value });
                  }}
                ></EditorTextArea>
              </div>
              {resource?.attachments.length > 0 ? (
                <div className="attachments">
                  <h3>
                    <i className="fa-regular fa-paperclip"></i> Attachments
                  </h3>
                  <div className="data">
                    {resource.attachments.map((item, key) => {
                      return (
                        <div className="attachment_item">
                          <div
                            className="attachment"
                            onClick={() => {
                              window.open(
                                item.url,
                                "",
                                "height:auto;width:auto"
                              );
                            }}
                            key={key}
                          >
                            <div className="icon"></div>
                            <div className="filename">
                              <i className="fa-regular fa-file"></i>
                              {item.url.split("/").pop()}
                            </div>
                          </div>
                          <div
                            className="delete_btn"
                            onClick={() => {
                              setDeleteIds((prev) => [...prev, item.cd_id]);
                              setResource({
                                ...resource,
                                attachments: resource.attachments.filter(
                                  (_, i) => i !== key
                                ),
                              });
                            }}
                          >
                            <i class="fa-regular fa-trash"></i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              {
                <div className="attachments">
                  <h3>
                    <i className="fa-regular fa-plus"></i> Add Attachments
                  </h3>
                  <div className="data">
                    <FileInput
                      label="Add attachments"
                      onChange={(e) => {
                        setNewAttachments([
                          ...newAttachments,
                          ...e.target.files,
                        ]);
                      }}
                      setFiles={setNewAttachments}
                      files={newAttachments}
                    ></FileInput>
                  </div>
                </div>
              }
            </div>
          </div>
        ) : (
          <div className="main_content skeleton">
            <div className="top_content">
              <div className="header">
                <div className="icon"></div>
                <div className="info">
                  <div className="title"></div>
                </div>
              </div>
            </div>
            <hr />
            <div className="mid_content">
              <div className="body">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResourceEdit;
