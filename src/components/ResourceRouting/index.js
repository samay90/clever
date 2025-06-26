import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ClassroomResource from "../../pages/ClassroomResource";
import ResourceDoubts from "../../pages/ResourceDoubts";
import ResourceEdit from "../../pages/ResourceEdit";
import ResourceTopBar from "../ResourceTopBar";
import React from "react";

const ResourceRouter = ({ classroom, class_id, token, api }) => {
  const { resource_id } = useParams();
  const [resource, setResource] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getResource = async () => {
      if (token && api) {
        const data = await fetch(
          api + `/classroom/${class_id}/resource/${resource_id}`,
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
          setResource(parsed.data);
        } else {
          navigate("/app/home");
        }
      }
    };
    getResource();
  }, [resource_id, api, class_id, token, navigate]);
  return (
    <Routes>
      <Route path="/" element={<ResourceTopBar class_id={class_id} classroom={classroom}/>}>
        <Route
          path="/"
          element={
            <ClassroomResource
              api={api}
              classroom={classroom}
              class_id={class_id}
              token={token}
              resource={resource}
            />
          }
        ></Route>
        <Route
          path="/doubts/*"
          element={
            <ResourceDoubts
              api={api}
              classroom={classroom}
              class_id={class_id}
              token={token}
              resource={resource}
            />
          }
        >
        </Route>
      </Route>
      <Route
        path="/edit"
        element={
          <ResourceEdit
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

export default ResourceRouter;
