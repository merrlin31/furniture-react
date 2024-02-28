import { MyInput } from './UI/MyInput/MyInput';
import { MySelect } from './UI/MySelect/MySelect';
import { ReactComponent as RightChevron } from "../img/chevron-right-solid.svg";
import { ReactComponent as DownChevron } from "../img/chevron-down-solid.svg";
import { useState } from 'react';
import { headClass, inputClass, itemClass, listClass, titleClass } from '../utils/description';
import { Title } from './Title';
import { useDispatch } from 'react-redux';
import { editValue, setKey } from '../reducers/settingReducer';

export const SettingsForm = ({className, title, parent, optionsClass, options, state, translate, hint}) => {
   const [visibleList, setVisibleList] = useState(false)
   const dispatch = useDispatch()
   let key = setKey(state.id)

   return (
      <div className={className}>
         <div className={parent + headClass}>
            <Title className={parent + titleClass} title={title} />
            {visibleList 
               ? <DownChevron className={parent + listClass} onClick={() => setVisibleList(!visibleList)} />
               : <RightChevron className={parent + listClass} onClick={() => setVisibleList(!visibleList)} />
            }
         </div>
         {visibleList && <div className={`${parent}${inputClass} ${optionsClass}`}>
            {options.map((option) => 
               !option.select
               ? <MyInput option={option}  key={option.id} className ={optionsClass + itemClass}
                     value={state[option.id]} onChange={e => dispatch(editValue(key, option.id, +e.target.value))} translate={translate} hint={hint} />
               : <MySelect options={option} className ={optionsClass + itemClass}
                  key={option.id} value={state[option.select]} onChange={(value) => dispatch(editValue(key, option.select, value))} translate={translate} />
            )}
         </div>
         }
      </div>
   );
}

