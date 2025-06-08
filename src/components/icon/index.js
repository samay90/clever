import "./index.css"
const Icon = ({url,chr,height,className}) => {
  if (!chr){chr=" "}
  return (
    <div className={'icon_image '+className}>
        {url?<img src={url} alt='icon_img'/>:""}
        <h2 style={{fontSize:((18/40)*height).toString()+"px"}}>{chr.toUpperCase()}</h2>
    </div>
  )
}

export default Icon