import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import "../styles/Classroom.css";
import ClassroomStream from "./ClassroomStream";
import ClassroomSettings from "./ClassroomSettings";
import ClassroomClass from "./ClassroomClass";
import ResourceRouter from "../components/ResourceRouting";
import AssignmentRouter from "../components/AssignmentRouting";
import { UiContext } from "../store/UiContext";
const Classroom = ({ token, setLoading, user, classrooms, api }) => {
  const { class_id } = useParams();
  const [data, setData] = React.useState([]);
  const [classroom, setClassroom] = React.useState({});
  const ref = React.useRef();
  const [current, setCurrent] = React.useState("stream");
  const location = useLocation();
  const { side_open } = React.useContext(UiContext);
  const loadingRef = useRef(false);
  const hasMore = useRef(true);
  const [loading2, setLoading2] = React.useState(false);
  const pageRef = useRef(1);
  const [initialLoaded, setInitialLoaded] = React.useState(false);
  const fetchPage = async (pageNumber) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading2(true);  
    try {
      const res = await fetch(
        `${api}/classroom/${class_id}?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.error) {
        toast.error(result.message);
        hasMore.current = false;
      } else {
        if (pageNumber === 1) {
          setData(result.data);
        } else {
          setData((prev) => [...prev, ...result.data]);
        }

        hasMore.current = result.data.length ===5;
        pageRef.current = pageNumber;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading2(false);
      loadingRef.current = false;
      setInitialLoaded(true);
    }
  };

  useEffect(() => {
    setData([]);
    pageRef.current = 1;
    hasMore.current = true;
    loadingRef.current = false;
    setInitialLoaded(false);

    if (token && class_id && api) {
      fetchPage(1);
    }
  }, [class_id, token, api]);

  useEffect(() => {
    const temp = classrooms.filter(
      (ele) => ele.class_id === parseInt(class_id)
    )[0];
    setClassroom(temp);
  }, [classrooms, class_id]);
  useEffect(() => {
    const temp = location.pathname.split("/");
    if (!temp[4]) {
      setCurrent("stream");
    } else {
      setCurrent(temp[4]);
    }
  }, [location.pathname]);
  useEffect(() => {
  const container = ref.current;
  if (!container || !initialLoaded) return;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = container;
    const ratio = (scrollTop + clientHeight) / scrollHeight;

    if (ratio > 0.8 && hasMore.current && !loadingRef.current) {
      fetchPage(pageRef.current + 1);
      
      
    }
  };

  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, [initialLoaded]);

  return (
    <>
        <div className={`navigation ${side_open ? "open" : ""}`}>
          <div className="tabs">
            <div className={`tab ${current === "stream" ? "active" : ""}`}>
              <Link to="" className="tab_link">
                <i className="fa-regular fa-airplay"></i>
                <span>Stream</span>
              </Link>
            </div>
            <div className={`tab ${current === "myclass" ? "active" : ""}`}>
              <Link to="myclass" className="tab_link">
                <i className="fa-regular fa-screen-users"></i>
                <span>My</span> Class
              </Link>
            </div>
            {classroom && classroom.role === "creator" ? (
              <div className={`tab ${current === "settings" ? "active" : ""}`}>
                <Link to="settings" className="tab_link">
                  <i className="fa-regular fa-sliders"></i>
                  <span>Settings</span>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      
        <Outlet />
        <Routes>
          <Route
            path="/"
            element={
              <div className="page classroom_page" ref={ref} style={{height:"100%"}}>
              <ClassroomStream
                loadingStream={loading2}
                hasMore={hasMore?.current}
                ref={ref}
                // loading={loading2}
                token={token}
                classroom={classroom}
                data={data}
                api={api}
              />
              </div>
            }
          />
          <Route
            path="/assignment/:assignment_id/*"
            element={
              <AssignmentRouter
                api={api}
                user={user}
                classroom={classroom}
                class_id={class_id}
                token={token}
              />
            }
          />
          <Route
            path="/resource/:resource_id/*"
            element={
            
              <ResourceRouter
                api={api}
                user={user}
                class_id={class_id}
                classroom={classroom}
                token={token}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <ClassroomSettings
                user={user}
                api={api}
                classroom={classroom}
                class_id={class_id}
                token={token}
              />
            }
          />
          <Route
            path="/myclass"
            element={
              <div className="page classroom_page">

              <ClassroomClass
                api={api}
                user={user}
                classroom={classroom}
                class_id={class_id}
                token={token}
              /></div>
            }
          ></Route>
        </Routes>
    </>
  );
};

export default Classroom;
