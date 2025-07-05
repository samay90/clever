import React from "react";
import "./index.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
const AssignmentTopBar = ({ classroom, class_id }) => {
  const { pathname } = useLocation();
  const { assignment_id } = useParams();
  return (
    <>
      {classroom?.role !== "student" ? (
        <div className="assignment_top_bar page">
          <div className="tabs">
            <Link
              to={"/app/classroom/" + class_id + "/assignment/" + assignment_id}
              className={
                pathname.split("/").length === 6 ? "tab active" : "tab"
              }
            >
              <i className="fa-regular fa-book"></i> Assignment
            </Link>
            <Link
              to={
                "/app/classroom/" +
                class_id +
                "/assignment/" +
                assignment_id +
                "/submissions"
              }
              className={
                pathname.split("/").length === 7 ? "tab active" : "tab"
              }
            >
              <i className="fa-regular fa-square-list"></i> Submissions
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

export default AssignmentTopBar;
