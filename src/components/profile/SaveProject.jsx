import { t } from "i18next"
import { useDebounce } from "use-debounce";
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { getCustomers, getProjects, saveProject } from "../../actions/user"
import { saveStore } from "../../reducers/utils"
import { CUSTOMER_NOT_EXISTS, MAX_LENGTH, MAX_LENGTH_60, menuBtnType, menuLabelColor, MIN_LENGTH, networkError, registrationBtnColor, REQUIRED_CUSTOMER, REQUIRED_NAME } from "../../utils/description"
import { Title } from "../Title"
import MyAutocomplete from "../UI/Autocomplete/Autocomplete"
import { MyButton1 } from "../UI/MyButton/MyButton"
import { MyProfileInput } from "../UI/MyInput/MyInput"

const SaveProject = (props) => {
   const title = 'saveProject'
   const field1 = 'customer'
   const field2 = 'projectName'
   const field3 = 'adress'
   const customerField = 'fullName'
   const ADD_ITEM = 'addItem'
   const totalSum = useSelector(state => state.product.totalSum)
   const codes = useSelector(state => state.setting.codes)
   const form = useForm({mode: "onBlur", })
   const {register, handleSubmit, watch, formState, setValue} = form
   const {errors, isValid, isSubmitting} = formState
   const [customerId, setCustomerId] = useState('')
   const [customers, setCustomers] = useState([])
   const [projects, setProjects] = useState([])
   const field1Value = watch(field1)
   const field2Value = watch(field2)
   const [debouncedField1] = useDebounce(field1Value, 500);
   const [debouncedField2] = useDebounce(field2Value, 500);
   useEffect(() => {
      const getCustomersData = async () => {
         try {
            let customer = customers.find(customer => customer.fullName === field1Value)
            if (customer) {
               setCustomerId(customer._id)
            } else  {
               setCustomerId('')
            }
            const response = await getCustomers(props.user, field1Value)
            if (!response) throw new Error(networkError)
            setCustomers(response)
         } catch(e) {
            console.log(e.message)
         }
      }
      getCustomersData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedField1])

   useEffect(() => {
      const getProjectsData = async () => {
         try {
            const response = await getProjects(props.user, customerId, field2Value)
            if (!response) throw new Error(networkError)
            setProjects(response.projects)
         } catch(e) {
            console.log(e.message)
         }
      }
      getProjectsData()
      let existingProject = projects.find(project => project[field2] === field2Value)
      if (existingProject) {
         let customer = customers.find(customer => customer._id === existingProject.customerId)
         if (customer) setValue(field1, customer[customerField])
         setValue(field3, existingProject[field3])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedField2, customerId])

   const autocompleteFields = [
      {name: field1, searchField: customerField, items: customers, validate: {
         required: REQUIRED_CUSTOMER, 
         validate: {
            customerAvaliable: (fieldValue) => {
               return !!customers.find(item => item.fullName === fieldValue) || CUSTOMER_NOT_EXISTS}
         },
         maxLength: {value: 30, message: MAX_LENGTH}
      }},
      {name: field2, searchField: field2, items: projects, validate: {
         required: REQUIRED_NAME, 
         minLength: {value: 3, message: MIN_LENGTH},
         maxLength: {value: 30, message: MAX_LENGTH}
      }}
   ]
   const fields = [{name: field3, validate: {
      minLength: {value: 3, message: MIN_LENGTH},
      maxLength: {value: 60, message: MAX_LENGTH_60}
   }}]

   const saveProjectHandler = (data) => {
      const store = saveStore()
      let customer = customers.find(customer => customer[customerField] === data[field1])
      saveProject(props.user, customer._id, data[field2], totalSum, codes, store, data[field3])
      props.setModal(false)
   }

   return (
      <div>
         <Title className={props.style.title} title={title} ></Title>
         <form className={props.style.customerContainer} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(saveProjectHandler)} noValidate>
            {autocompleteFields.map(field => {
               return <MyAutocomplete key={field.name} option={field} style={props.style} value={watch(field.name)} setValue={setValue}
                  register={register} errors={errors[field.name]} items={field.items}  field={field.searchField} />
            })}
            
            {fields.map((field) => 
               <MyProfileInput key={field.name} labelColor={menuLabelColor}  
               option={field} register={register} errors={errors[field.name]} />
            )}
            <MyButton1 color={registrationBtnColor} btnType={menuBtnType} disabled={isSubmitting || !isValid} >{t(ADD_ITEM)}</MyButton1>
         </form>
      </div>
   )
}

export default SaveProject
