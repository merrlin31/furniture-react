import { useTranslation } from 'react-i18next'
import { searchValue1, searchValue2, searchValue3, searchValue4 } from '../../utils/description'
import { MySearchSelect } from '../UI/MySelect/MySelect'
import style from './profile.module.scss'

const SearchBar = ({searchTerm, setSearchTerm}) => {
   const TERM = 'term'
   const TYPE = 'type'
   const TERM_TYPE = 'text'
   const BY_NAME = 'by name'
   const BY_CUSTOMER = 'by customer'
   const BY_ADRESS = 'by adress'
   const BY_CODE = 'by code'
   const SEARCH = 'search by'
   const translate = 'search.'
   const {t} = useTranslation()
   const termOption = {id: TERM, type: TERM_TYPE}
   const typeOption = {id: TYPE, defaultValue: SEARCH, select: TYPE,
      options: [
         {value: searchValue1, name: BY_NAME},
         {value: searchValue2, name: BY_CUSTOMER},
         {value: searchValue3, name: BY_ADRESS},
         {value: searchValue4, name: BY_CODE},
      ]
   }

   const onChange = (e) => {
      setSearchTerm({...searchTerm, [e.target.id]: e.target.value})
   }
   const onChange1 = (value) => {
      setSearchTerm({...searchTerm, [TYPE]: value})
   }

   return (
      <div className={style.searchBar}>
         <input className={style.searcInput} value={searchTerm[TERM]} onChange={onChange} type={termOption.type} 
            id={termOption.id} maxLength="20" placeholder={t(translate + SEARCH)} autoFocus />
         <MySearchSelect options={typeOption} value={searchTerm.type} onChange={onChange1} className={style.searchType} translate={translate} />
      </div>
   )
}

export default SearchBar
