import React from "react";
import "./index.css";
const ImageSelector = ({ placeholder, heading, data, current, setCurrent }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  const ref2 = React.useRef();
  React.useEffect(() => {
    if (open) {
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
        ref.current.style.display = "none";
      }, 300);
    }
  }, [open]);
  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });
  }, []);
  return (
    <div className="image_selector">
      <div
        className="input_box"
        onClick={() => {
          setOpen(true);
        }}
      >
        {placeholder}
      </div>
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
          <div className="current_image">
            <h3>Current Banner</h3>
            <img
              src={
                data.find((item) => {
                  return parseInt(item.key) === current;
                })?.url
              }
              alt="current_image"
            />
          </div>
          <div className="images">
            {data.map((item, key) => (
              <div
                className={"image" + (parseInt(item.key) === current ? " selected" : "")}
                key={key}
                style={{
                  backgroundImage: `url(${item.url})`}}
                onClick={() => {
                  setCurrent(parseInt(item.key));
                }}
              >
                    <i className="fa-regular fa-circle-check"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
