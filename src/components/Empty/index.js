import "./index.css"
import Box from "../../static/images/box.png";

export const Empty = ({head,body,size}) => {
    return (
        <div className="empty">
            <img style={{width:size}} src={Box} alt="box" />
            <h3>{head}</h3>
            <p>{body}</p>
        </div>
    )
}