import { Title } from '../Title';
import { MyProfileInput } from "../UI/MyInput/MyInput";
import { t } from "i18next";
import { createCustomer } from "../../actions/user";
import { useForm } from "react-hook-form";
import { CUSTOMER_EXISTS, MAX_LENGTH, menuBtnType, menuLabelColor, MIN_LENGTH, registrationBtnColor, REQUIRED_USERNAME } from "../../utils/description";
import { MyButton1 } from "../UI/MyButton/MyButton";

const AddCustomer = (props) => {
   const title = 'addCustomer'
   const ADD_ITEM = 'addItem'
   const field1 = 'fullName'
   const field2 = 'telephone'
   const field3 = 'adress'

   const fields = [
      {name: field1, validate: {
         required: REQUIRED_USERNAME, 
         validate: {
            nameAvaliable: (fieldValue) => !props.customers.find(item => item.fullName === fieldValue) || CUSTOMER_EXISTS
         },
         minLength: {value: 3, message: MIN_LENGTH},
         maxLength: {value: 30, message: MAX_LENGTH}
      }}, 
      {name: field2, validate: {
         minLength: {value: 3, message: MIN_LENGTH},
         maxLength: {value: 30, message: MAX_LENGTH}
      }}, 
      {name: field3, validate: {
         minLength: {value: 3, message: MIN_LENGTH},
         maxLength: {value: 30, message: MAX_LENGTH}
      }}
   ]

   const form = useForm({mode: "onBlur"})
   const {register, handleSubmit, formState} = form
   const {errors, isValid, isDirty, isSubmitting} = formState

   const createCustomerHandler = async (data) => {
      createCustomer(props.user, data.fullName, data.telephone, data.adress)
      props.setModal(false)
   }

   return (
      <div>
         <Title className={props.style.title} title={title} ></Title>
         <form className={props.style.customerContainer} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(createCustomerHandler)} noValidate>
            {fields.map((field) => 
               <MyProfileInput key={field.name} labelColor={menuLabelColor}  
                  option={field} register={register} errors={errors[field.name]} />
            )}
            <MyButton1 color={registrationBtnColor} btnType={menuBtnType} disabled={isSubmitting || !isDirty || !isValid} >{t(ADD_ITEM)}</MyButton1>
         </form>
      </div>
   )
}

export default AddCustomer
