import React, { useEffect } from "react";
import Icon from "../components/icon";
import colors from "../static/colors.json";
import conv from "../static/banner.json";
import { useNavigate } from "react-router-dom";
import InputSecondary from "../components/InputSecondary";
import TextArea from "../components/TextArea";
import FileInput from "../components/FileInput";
import Selector from "../components/Selector";
import axios from "axios";
import toast from "react-hot-toast";
const NewAssignment = ({
  api,
  token,
  class_id,
  classroom,
  setVisible,
  topics,
  refreshStream
}) => {
  useEffect(() => {
    setVisible(false);
  }, [setVisible]);
  const navigate = useNavigate();
  const [form, setForm] = React.useState({});
  const [files, setFiles] = React.useState([]);
  const [customTopic, setCustomTopic] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const addWork = async () => {
    const formData = new FormData();
    setLoading(true);
    formData.append("title", form.title ?? "");
    formData.append("body", form.body ?? "");
    formData.append("topic", form.topic ?? "");
    formData.append("due_date_time", form.due_date_time);
    formData.append("total_marks", form.total_marks);
    files.forEach((file) => {
      formData.append("attachments", file);
    });
    try {
      const raw = await axios.post(
        api + `/classroom/${class_id}/assignment/new`,
        formData,
        { headers: { authorization: "Bearer " + token } }
      );
      setLoading(false);
      refreshStream()
      toast.success(raw.data.message, {
        iconTheme: { primary: "#fff", secondary: "var(--primary-color)" },
        style: {
          borderRadius: "30px",
          background: "var(--primary-color)",
          color: "white",
          fontWeight: "100",
          fontSize: "12px",
        },
      });
      navigate(-1);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message, {
        iconTheme: { primary: "#fff", secondary: "var(--primary-color)" },
        style: {
          borderRadius: "30px",
          background: "var(--primary-color)",
          color: "white",
          fontWeight: "100",
          fontSize: "12px",
        },
      });
    }
  };
  return (
    <>
      <div
        className="new_nav page"
        style={{ "--bg": colors[conv[classroom?.banner_id]] }}
      >
        <div className="title">
          <div
            className="close"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fa-regular fa-xmark"></i>
          </div>
          <div className="icon">
            <Icon
              icon={<i className="fa-regular fa-bullseye-arrow"></i>}
              height={30}
              background={`rgba(${colors[conv[classroom?.banner_id]]},0.5)`}
            ></Icon>
          </div>
          <span>Assignment</span>
        </div>
        
          <button
            onClick={addWork}
            style={{ width: "80px" }}
            disabled={loading}
            className="btn_secondary"
          >
            {loading ? <span className="btn_loading"></span> : "Publish"}
          </button>
      </div>
      <div className="new_work page">
        <div className="form">
          <div className="inner_form">
            <InputSecondary
              maxLength={50}
              placeholder="Title"
              type="text"
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
              value={form.title}
              secondary_placeholder="Title"
              disabled={false}
            />
            <span>*Required</span>
            <TextArea
              maxLength={500}
              placeholder="Description"
              onChange={(e) => {
                setForm({ ...form, body: e.target.value });
              }}
              value={form.body}
              secondary_placeholder="Description"
              disabled={false}
            />
          </div>
          <div className="inner_form">
            <h3>Attach</h3>
            <FileInput
              key={1}
              label={<i className="fa-regular fa-upload"></i>}
              onChange={(e) => {
                setFiles([...e.target.files]);
              }}
              files={files}
              setFiles={setFiles}
            ></FileInput>
          </div>
        </div>
        <div className="options">
          <h3>Due date & time</h3>
          <InputSecondary
            placeholder="Assignment due date"
            secondary_placeholder="Assignment due date"
            type="datetime-local"
            onChange={(e) => {
              setForm({ ...form, due_date_time: e.target.value });
            }}
            value={form.due_date_time}
            disabled={false}
          ></InputSecondary>
          <h3>Max marks</h3>
          <InputSecondary
            placeholder={"Total marks"}
            secondary_placeholder="Total marks"
            type="number"
            onChange={(e) => {
              setForm({ ...form, total_marks: e.target.value });
            }}
            value={form.total_marks}
            disabled={false}
          />
          <h3>Topic</h3>
          <div className="topic_input">
            {customTopic === true ? (
              <div className="custom_topic">
                <InputSecondary
                  autoFocus={true}
                  placeholder={"Topic"}
                  secondary_placeholder={"Week 11"}
                  type={"text"}
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                />
                <span onClick={() => setCustomTopic(false)}>
                  <i className="fa-solid fa-close"></i>
                </span>
              </div>
            ) : (
              <Selector
                placeholder={"Topic"}
                option={["",...topics.map((opt) => opt.topic), "Add Topic"]}
                value={form.topic}
                onChange={(e) => {
                  if (e.target.value === "Add Topic") {
                    setForm({ ...form, topic: "" });
                    setCustomTopic(true);
                    return;
                  }
                  setForm({ ...form, topic: e.target.value });
                }}
              ></Selector>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAssignment;
