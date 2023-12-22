import '../styles/settings.scss';

import { settingsSection1, indentOptions } from './properties/settingsProperties';
import { SettingsForm } from './SettingsForm';
import { useContext } from 'react';
import { MyContext } from '../context';
import { section1FormClass } from '../utils/description';

export const SettingsContent = (props) => {
   const {indentValues, setIndentValues} = useContext(MyContext)
   const translate = 'indent.'

   return (
      <>
         <SettingsForm className={props.class + section1FormClass} parent={props.class} title={props.title} 
            optionsClass={settingsSection1} options={indentOptions} state={indentValues} setState={setIndentValues} translate={translate}/>
      </>
   );
}