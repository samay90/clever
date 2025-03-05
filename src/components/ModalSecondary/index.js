import React from "react";
import "./index.css";
const ModalSecondary = ({ heading, children ,open,setOpen}) => {
  const ref = React.useRef();
  const ref2 = React.useRef();
  React.useEffect(() => {
    if (open && ref) {
      ref.current.style.display = "flex";
      setTimeout(() => {
        ref.current.style.background = "#00000060";
        ref2.current.style.opacity = "1";
        ref2.current.style.transform = "scale(1)";
      }, 10);
    } else {
      ref2.current.style.opacity = "0";
      ref2.current.style.transform = "scale(0.9)";
      ref.current.style.background = "#00000000";
      setTimeout(() => {
        if (ref && ref.current){
          ref.current.style.display = "none";
        }
      }, 300);
    }
  }, [open]);
  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });
  }, [setOpen]);
  return (
    <div className="image_selector modal_secondary">
      <div className="overlay" ref={ref}>
        <div className="close_area" onClick={() => setOpen(false)}></div>
        <div className="selector" ref={ref2}>
          <div className="nav_tab">
            <div className="title">{heading}</div>
            <div
              className="close_button"
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="fa-regular fa-xmark"></i>
            </div>
          </div>
          <div className="content">
            {children}
          </div>
          </div>
      </div>
    </div>
  );
};

export default ModalSecondary;
