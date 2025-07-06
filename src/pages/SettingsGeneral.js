import { useContext } from 'react'
import { UiContext } from '../store/UiContext'
import Radio from '../components/Radio'

const SettingsGeneral = ({}) => {
    const {theme,setTheme} = useContext(UiContext)

  return (
    <div className='settings_form settings_general page'>
      <div className='form_header'>
        <h3>General</h3>
      </div>
        <div className='form_field' onClick={()=>{setTheme(theme==="light"?"dark":"light")}}>
            <div className='label'><h3>Theme</h3><p>Choose your preferred theme for the app interface.</p></div>
            <div className='button' ><Radio value={theme==="light"?0:1} onChange={(e)=>setTheme(e.target.value)}></Radio></div>
        </div>
    </div>
  )
}

export default SettingsGeneral