import React from "react";
import "../../styles/Classroom.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
const ResourceTopBar = ({ classroom, class_id }) => {
  const { pathname } = useLocation();
  const { resource_id } = useParams();
  return (
    <>
      {classroom?.role !== "student" ? (
        <div className="assignment_top_bar page">
          <div className="tabs">
            <Link
              to={"/app/classroom/" + class_id + "/resource/" + resource_id}
              className={
                pathname.split("/").length === 6 ? "tab active" : "tab"
              }
            >
              <i className="fa-regular fa-book"></i> Resource
            </Link>
            <Link
              to={
                "/app/classroom/" +
                class_id +
                "/resource/" +
                resource_id +
                "/doubts"
              }
              className={
                pathname.split("/").length === 7 ? "tab active" : "tab"
              }
            >
              <i className="fa-regular fa-clipboard-question"></i> Doubts
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="page classroom_page">
        <Outlet />
      </div>
    </>
  );
};

export default ResourceTopBar;
