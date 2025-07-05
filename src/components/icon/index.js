import "./index.css"
const Icon = ({url,chr,height,className,icon,background}) => {
  if (!chr){chr=" "}
  return (
    <div className={'icon_image '+className} style={{background:background}}>
        {url?<img src={url} alt='icon_img'/>:""}
        {icon?icon:<h2 style={{fontSize:((18/40)*height).toString()+"px"}}>{chr.toUpperCase()}</h2>}
    </div>
  )
}

export default Icon