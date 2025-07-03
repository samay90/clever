import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import conv from "../static/banner.json";
import colors from "../static/colors.json";
import EditorTextArea from "../components/EditorTextArea";
import EditorInput from "../components/EditorInput";
import InputSecondary from "../components/InputSecondary";
import FileInput from "../components/FileInput";
import axios from "axios";
import toast from "react-hot-toast";
const AssignmentEdit = ({ api, class_id, token, classroom }) => {
  const { assignment_id } = useParams();
  const [assignment, setAssignment] = React.useState(null);
  const navigate = useNavigate();
  const [deleteIds, setDeleteIds] = React.useState([]);
  const [newAttachments, setNewAttachments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const getAssignment = async () => {
      if (token && api) {
        const data = await fetch(
          api + `/classroom/${class_id}/assignment/${assignment_id}`,
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
          setAssignment(parsed.data);
        } else {
          navigate("/app/home");
        }
      }
    };
    getAssignment();
}, [assignment_id, api, class_id, token, navigate]);
  const editAssignment = async () => {
    const formData = new FormData() ;
    setLoading(true);
    formData.append("title", assignment.title);
    formData.append("body", assignment.body);
    newAttachments.forEach((file) => {
      formData.append("attachments", file);
    });
    formData.append("due_date_time", new Date(assignment.due_date_time));
    formData.append("total_marks", assignment.total_marks);
    formData.append("delete_attachments", JSON.stringify(deleteIds));
    try {
      const raw = await axios.post(
        api + `/classroom/${class_id}/assignment/${assignment_id}/edit`,
        formData,
        { headers: { authorization: "Bearer " + token } }
      );
      setLoading(false);
      toast.success(raw.data.message, {
        iconTheme: { primary: "#fff", secondary: "#5C60F5" },
        style: {
          borderRadius: "30px",
          background: "#5C60F5",
          color: "white",
          fontWeight: "100",
          fontSize: "12px",
        },
      });
      navigate("/app/classroom/" + class_id + "/assignment/" + assignment_id);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message, {
        iconTheme: { primary: "#fff", secondary: "#5C60F5" },
        style: {
          borderRadius: "30px",
          background: "#5C60F5",
          color: "white",
          fontWeight: "100",
          fontSize: "12px",
        },
      });
    }
  };
  return (
    <>
      <div className="page ra_page modal_page_content">
        {assignment ? (
          <div className="main_content">
            {classroom?.role !== "student" ? (
              <div className="ra_bottom_bar">
                <button
                  className="btn_tertiary"
                  onClick={() => {
                    navigate(
                      "/app/classroom/" +
                        class_id +
                        "/assignment/" +
                        assignment_id
                    );
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  style={{ width: "101px" }}
                  className="btn_secondary"
                  onClick={editAssignment}
                >
                  {loading ? (
                    <span className="btn_loading"></span>
                  ) : (
                    <>
                      <i className="fa-regular fa-pen"></i> &nbsp; Submit
                    </>
                  )}
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
                      placeholder="Untitled Assignment"
                      fontSize="25px"
                      color={"#000"}
                      value={assignment?.title}
                      setValue={(value) => {
                        setAssignment({
                          ...assignment,
                          title: value.target.value,
                        });
                      }}
                    ></EditorInput>
                  </div>
                </div>
              </div>
            </div>
            <hr />
              <div className="mid_content">
                <div className="attachments">
                    <h3><i className="fa-regular fa-list-check"></i> Assignment Details</h3>
                </div>
                <div className="inputs">
                    <InputSecondary
                    placeholder="Total Marks"
                    type="number"
                    onChange={(value) => {
                      setAssignment({
                        ...assignment,
                        total_marks: value.target.value,
                      });
                    }}
                    value={assignment?.total_marks}
                    
                ></InputSecondary>
                <InputSecondary
                  placeholder="Due date and time"
                  type="datetime-local"
                  onChange={(value) => {
                    setAssignment({
                      ...assignment,
                      due_date_time: value.target.value,
                    });
                  }}
                  value={assignment.due_date_time}
                ></InputSecondary>
                </div>
              </div>
            <hr/>
            <div className="mid_content">
              <div className="body">
                <EditorTextArea
                  maxLength={500}
                  placeholder="Body here..."
                  fontSize="0.9025rem"
                  color={"#3c4043"}
                  value={assignment?.body}
                  setValue={(value) => {
                    setAssignment({ ...assignment, body: value.target.value });
                  }}
                ></EditorTextArea>
              </div>
              {assignment?.attachments.length > 0 ? (
                <div className="attachments">
                  <h3>
                    <i className="fa-regular fa-paperclip"></i> Attachments
                  </h3>
                  <div className="data">
                    {assignment.attachments.map((item, key) => {
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
                              setAssignment({
                                ...assignment,
                                attachments: assignment.attachments.filter(
                                  (_, i) => i !== key
                                ),
                              });
                            }}
                          >
                            <i className="fa-regular fa-trash"></i>
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

export default AssignmentEdit;
