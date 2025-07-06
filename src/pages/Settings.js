import React from 'react'
import "../styles/Settings.css"
import { Link, Outlet, useLocation } from 'react-router-dom';
import { UiContext } from '../store/UiContext';
const Settings = () => {
    const {side_open} = React.useContext(UiContext);
    const location = useLocation(); 
    const [crr,setCrr] = React.useState(0);
    const ref2 = React.useRef();
    React.useEffect(() => {
        const temp = location.pathname.split("/");
        if (!temp[3]){
            setCrr(0);
        }else if (temp[3].toLowerCase()==="general"){
            setCrr(1);
        }else if (temp[3].toLowerCase()==="notifications"){
            setCrr(2); 
        }
    },[location])
  return (
    <>  
        <div className={`settings_page ${side_open?"active":""} page`}>
        <div className='settings_navigation'>
            <div className='nav_label'>
                Settings
            </div>
            <div className='tabs' ref={ref2}>
                <Link to="/app/settings/" className={`tab ${crr===0?"active":""}`}>
                <i className="fa-regular fa-id-card"></i>
                    Profile
                </Link>
                <Link to="/app/settings/general" className={`tab ${crr===1?"active":""}`}>
                <i className="fa-regular fa-toolbox"></i>
                    General
                </Link>
                <Link to="/app/settings/notifications" className={`tab ${crr===2?"active":""}`}>
                <i className="fa-regular fa-bell"></i>
                    Notifications
                </Link>
            </div>
        </div>
        <div className={`settings_content `}>
            <Outlet></Outlet>
        </div>
        </div>
    </>
  )
}

export default Settings