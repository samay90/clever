import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ClassroomAssignement from "../../pages/ClassroomAssignment";
import AssignmentSubmissions from "../../pages/AssignmentSubmissions";
import AssignmentEdit from "../../pages/AssignmentEdit";
import AssignmentTopBar from "../AssignmentTopBar";
import React from "react";

const AssignmentRouter = ({ classroom, class_id, token, api }) => {
  const { assignment_id } = useParams();
  const [assignment, setAssignment] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getAssignment = async () => {
      if (token && api) {
        const data = await fetch(
          api + `/classroom/${class_id}/assignment/${assignment_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "multipart/form-data",
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
  return (
    <Routes>
      <Route path="/" element={<AssignmentTopBar class_id={class_id} classroom={classroom}/>}>
        <Route
          path="/"
          element={
            <ClassroomAssignement
              api={api}
              classroom={classroom}
              class_id={class_id}
              token={token}
              assignment={assignment}
            />
          }
        ></Route>
        <Route
          path="/submissions/*"
          element={
            <AssignmentSubmissions
              api={api}
              classroom={classroom}
              class_id={class_id}
              token={token}
              assignment={assignment}
            />
          }
        >
        </Route>
      </Route>
      <Route
        path="/edit"
        element={
          <AssignmentEdit
            api={api}
            classroom={classroom}
            class_id={class_id}
            token={token}
          />
        }
      ></Route>
    </Routes>
  );
};

export default AssignmentRouter;
