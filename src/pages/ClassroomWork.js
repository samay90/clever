import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Empty } from "../components/Empty";
import moment from "moment";
import colors from "../static/colors.json";
import conv from "../static/banner.json";
const ClassroomWork = ({
  token,
  classroom,
  user,
  api,
  setVisible,
  topics,
  class_id,
}) => {
  const navigate = useNavigate();
  const [classwork, setClasswork] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (class_id && api && token) {
      const getClasswork = async () => {
        setLoading(true);
        const data = await fetch(api + `/classroom/${class_id}/classwork`, {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        const parsed = await data.json();
        if (!parsed.error) {
          setLoading(false);
          setClasswork(parsed.data);
        } else {
          setLoading(false);
        }
      };
      getClasswork();
    }
  }, [class_id, api, token]);
  return (
    <div
      className="class_work page"
      style={{ "--bg": colors[conv[classroom?.banner_id]] }}
    >
      {classroom?.role !== "student" ? (
        <div className="header">
          <h2>Create Work</h2>
          <div className="btn_group-2">
            <button
              className="btn_tertiary"
              onClick={() => {
                navigate(
                  "/app/classroom/" + classroom.class_id + "/new/assignment"
                );
              }}
            >
              New assignment
            </button>
            <button
              className="btn_tertiary"
              onClick={() => {
                navigate(
                  "/app/classroom/" + classroom.class_id + "/new/resource"
                );
              }}
            >
              New resource
            </button>
          </div>
          <hr />
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div>
          {Array(2)
            .fill(0)
            .map((_, key) => {
              return (
                <div className="topic_container skeleton" key={key}>
                  <div className="topic_title">&nbsp;</div>
                  <div className="topic_cards">
                    {Array(3)
                      .fill(0)
                      .map((_, key) => <div className="topic_card">
                      <div className="icon"></div>
                      <div className="info">
                        <h3>&nbsp;</h3>
                        <div className="date">&nbsp;</div>
                      </div>
                    </div>)}
                  </div>
                </div>
              );
            })}
        </div>
      ) : classwork.length === 0 ? (
        <Empty
          img="empty_states_classwork.svg"
          head="No classwork!"
          body="You have no classwork todo."
          size="180px"
          margin="50px 0 15px 0"
        ></Empty>
      ) : (
        topics.map((topic, key) => {
          return (
            <div className="topic_container" key={key}>
              <div className="topic_title">{topic.topic}</div>
              <div className="topic_cards">
                {classwork
                  .filter((item) => item.topic === topic.topic)
                  .map((item, key) => {
                    return (
                      <div
                        className="topic_card"
                        key={key}
                        onClick={() => {
                          navigate(
                            `/app/classroom/${classroom.class_id}/${
                              item.assignment_id ? "assignment" : "resource"
                            }/${item.assignment_id || item.resource_id}`
                          );
                        }}
                      >
                        <div className="icon">
                          {item.assignment_id ? (
                            <i className="fa-regular fa-book"></i>
                          ) : (
                            <i className="fa-regular fa-bullseye-arrow"></i>
                          )}
                        </div>
                        <div className="info">
                          <h3>{item.title}</h3>
                          <div className="date">
                            {item.created_at !== item.updated_at
                              ? `Updated ${moment(
                                  parseInt(item.updated_at)
                                ).format("ll")}`
                              : `Posted ${moment(
                                  parseInt(item.created_at)
                                ).format("ll")}`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ClassroomWork;
