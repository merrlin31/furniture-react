import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getCustomer } from "../../actions/user"
import { formatDate } from "../properties/profileProperties"
import style from './profile.module.scss'

const ProjectInfo = ({project, setProject}) => {
   const [customer, setCustomer] = useState('')
   const {t} = useTranslation()
   const CUSTOMER = 'customer'
   const ADRESS = 'adress'
   const TOTAL_PRICE = 'total price'
   const MODIFY_DATE = 'modify date'
   const GRN = 'grn'
   const date = (project.modifyDate) ? project.modifyDate : project.createDate
   const modifyDate = formatDate(date.slice(0,10))
   useEffect(() => {
      const fetchData = async () => {
         let currentCustomer = await getCustomer(project.userId, project.customerId)
         setCustomer(currentCustomer.fullName) 
      }
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const setProjectHandler = () => {
      setProject(project._id)
   }

   const projectItems = [
      {class: style.customerName, textKey: t(CUSTOMER) + ': ', textValue: customer, id: CUSTOMER},
      {class: style.projectAdress, textKey: t(ADRESS) + ': ', textValue: project.adress, id: ADRESS},
      {class: style.projectSum, textKey: t(TOTAL_PRICE) + ': ', textValue: Math.round(project.totalPrice) + ' ' + t(GRN), id: TOTAL_PRICE},
      {class: style.projectDate, textKey: t(MODIFY_DATE) + ': ', textValue: modifyDate, id: MODIFY_DATE}
   ]

   return (
      <div className={style.projectInfo}>
         <div className={style.projectName} onClick={setProjectHandler}>{project.projectName}</div>
         {projectItems.map((item) => <div key={item.id} className={item.class}><span>{item.textKey}</span>{item.textValue}</div>)
         }
      </div>
   )
}

export default ProjectInfo
