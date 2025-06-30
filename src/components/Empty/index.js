import "./index.css"

export const Empty = ({head,body,size,img,margin}) => {
    return (
        <div className="empty">
            <img style={{width:size,margin}} src={"/empty/"+img}  alt="box" />
            <h3>{head}</h3>
            <p>{body}</p>
        </div>
    )
}