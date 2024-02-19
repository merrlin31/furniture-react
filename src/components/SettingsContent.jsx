import '../styles/settings.scss';

import { settingsSection1, indentOptions } from './properties/settingsProperties';
import { SettingsForm } from './SettingsForm';
import { section1FormClass } from '../utils/description';
import { useSelector } from 'react-redux';

export const SettingsContent = (props) => {
   const translate = 'indent.'
   const indentValues = useSelector(state => state.setting.indentValues)

   return (
      <>
         <SettingsForm className={props.class + section1FormClass} parent={props.class} title={props.title} 
            optionsClass={settingsSection1} options={indentOptions} state={indentValues} translate={translate} hint={true}/>
      </>
   );
}