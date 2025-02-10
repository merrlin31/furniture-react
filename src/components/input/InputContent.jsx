import { useEffect, useRef } from "react";
import { useState } from "react";
import { createFrontOpeningList, initialCheckboxes, initialHides, initialInputAtributes, determineType, initialValues, 
   levelBottomOptions, levelTopOptions, productLimits } from "../properties/inputProperties";
import { MyButton, MyButton1 } from "../UI/MyButton/MyButton";
import { ItemTable } from "./ItemTable";
import { SectionDimensions } from "../../utils/SectionDimensions"
import { furniture } from "../../utils/furniture";
import { allService } from "../../utils/services";
import { addBtnColor, delBtnColor, frontMaxWidth, frontMinWidth, frontOpeningType3, frontOpeningType4, frontOpeningType5, levelType1, 
   levelType2, levelType3, localOption1, localOption2, localOption3, localOption4, 
   localOption6, localOption8, maxSectionDepth, maxSectionWidth, minSectionDepth, minSectionWidth, section1BtnClass, section1FormClass, sectionBottomType1, 
   sectionBottomType2, sectionBottomType3, sectionBottomType4, sectionUpperType1, sectionUpperType2, 
   sectionUpperType3, sectionUpperType4, sideType1, sideType2, sideType3, skirtingHeight } from "../../utils/description";
import { GlobalOptions } from "./GlobalOptions";
import { LocalOptions } from "./LocalOptions";
import { ChangeableOptions } from "./ChangeableOptions";
import { LevelOptions } from "./LevelOptions";
import { SideOptions } from "./SideOptions";
import { useDispatch, useSelector } from "react-redux";
import { addFurnitureItem, addSectionCount, addSectionObject, changeProductLimits, deleteSectionObject, 
   subtractSectionCount, updateSectionId } from "../../reducers/productReducer";
import '../../styles/input.scss';
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const InputContent = (props) => {
   const ADD_ITEM = 'addItem'
   const DELETE_ITEM = 'deleteItem'
   const [checkboxes, setCheckboxes] = useState(initialCheckboxes)
   const [hides, setHides] = useState(initialHides)
   const [bottomLevelList, setBottomLevelList] = useState(levelBottomOptions)
   const [topLevelList, setTopLevelList] = useState(levelTopOptions)
   const [inputAtributes] = useState(initialInputAtributes)
   
   const {t} = useTranslation()
   const dispatch = useDispatch()
   const sectionAmount = useSelector(state => state.product.sectionAmount)
   const product = useSelector(state => state.product.product)
   const indentValues = useSelector(state => state.setting.indentValues)
   const limits = useSelector(state => state.product.productLimits)
   const form = useForm({defaultValues: initialValues, mode: "onBlur"})
   const {handleSubmit, watch, setValue, formState} = form
   const {isValid, isSubmitting} = formState
   const allValues = watch()
   const prevDepth = useRef(600)

   const SECTION = 'Section'
   const TOP_SECTION = 'TopSection'
   const MEZZANINE_SECTION = 'MezzanineSection'
   const CORNER_SECTION = 'CornerSection'
   const TOP_CORNER_SECTION = 'TopCornerSection'
   const MEZZANINE_CORNER_SECTION = 'MezzanineCornerSection'
   const CUPBOARD = 'Cupboard'
   const LAST = 'Last'
   const LAST_SECTION = 'LastSection'
   const LAST_TOP_SECTION = 'LastTopSection'
   const LAST_MEZZANINE_SECTION = 'LastMezzanineSection'

   const changeFormValues = (values) => {
      Object.keys(values).forEach(field => setValue(field, values[field]))
   }

   const changeType = (newOption, values, setValues) => {
      setValues({...values, options: newOption})
   }

   function changeBottomType() {
      inputAtributes.forEach(item => item.readOnly = false)
      inputAtributes.find(obj => obj.id === localOption4).max = 6
      inputAtributes.find(obj => obj.id === localOption2).min = minSectionDepth
      inputAtributes.find(obj => obj.id === localOption2).max = maxSectionDepth
      inputAtributes.find(obj => obj.id === localOption1).min = minSectionWidth
      inputAtributes.find(obj => obj.id === localOption1).max = maxSectionWidth
      changeFormValues({drawers: 0, shelves: 0})
      setCheckboxes(initialCheckboxes)
      if (allValues.bottomType === sectionBottomType1) {
         setHides(initialHides)
      } else if (allValues.bottomType === sectionBottomType2 || allValues.bottomType === sectionBottomType3) {
         inputAtributes.find(obj => obj.id === localOption1).min = allValues.neighboringWidth + frontMinWidth
         inputAtributes.find(obj => obj.id === localOption1).max = allValues.neighboringWidth + frontMaxWidth
         setHides({
            sink: false,
            visibleSide: false,
            kargo: true,
            oven: true,
            microwave: true,
            hob: false,
            fridge: true,
            simpleFridge: true,
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: false,
            drawers: true,
            drawersType: true,
            withoutFront: false,
            lift: true,
            liftType:true,
            shelves: false,
         })
         if (allValues.bottomType === sectionBottomType3) {
            inputAtributes.find(obj => obj.id === localOption2).min = prevDepth.current + minSectionDepth
            inputAtributes.find(obj => obj.id === localOption2).max = prevDepth.current + frontMaxWidth
         }
      } else {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: false,
            microwave: false,
            hob: true,
            fridge: false,
            simpleFridge: false,
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: true,
            drawers: false,
            drawersType: true,
            withoutFront: false,
            lift: true,
            liftType:true,
            shelves: false,
         })
         changeFormValues({drawers: 0, shelves: 0, frontAmount: 1, width: 600})
      }
   }
   
   useEffect(() => {
      let previousSide
      let side = allValues.side
      let level = allValues.level
      let topCornerType = TOP_CORNER_SECTION
      let topSectionType = TOP_SECTION
      let previousLastTopSectionType = LAST_TOP_SECTION
      if (level === levelType3) {
         topCornerType = MEZZANINE_CORNER_SECTION
         topSectionType = MEZZANINE_SECTION
         previousLastTopSectionType = LAST_MEZZANINE_SECTION
      }
      changeType(levelBottomOptions.options, bottomLevelList, setBottomLevelList)
      changeType(levelTopOptions.options, topLevelList, setTopLevelList)
      changeFormValues({bottomType: sectionBottomType1, upperType: sectionUpperType1})
      if (side === sideType1) {
         if (limits[`${side}${CORNER_SECTION}`]) {
            changeType([], bottomLevelList, setBottomLevelList)
            changeFormValues({bottomType: ''})
         } else if (limits[`${side}${CUPBOARD}`]) {
            if (limits[`${side}${SECTION}`] && limits[`${side}${LAST_SECTION}`] === sectionBottomType4) {
               changeType([{value: sectionBottomType4, name: sectionBottomType4}], bottomLevelList, setBottomLevelList)
               changeFormValues({bottomType: sectionBottomType4})
            }
         }
         if (limits[`${side}${topCornerType}`]) {
            changeType([], topLevelList, setTopLevelList)
            changeFormValues({upperType: ''})
         }
      } else if (side === sideType2) {
         previousSide = sideType1
         if (level === levelType1) {
            if (limits[`${previousSide}${LAST_SECTION}`]) {
               if (limits[`${side}${CUPBOARD}`]) {
                  changeType([{value: sectionBottomType4, name: sectionBottomType4}], bottomLevelList, setBottomLevelList)
                  changeFormValues({bottomType: sectionBottomType4})
               } else if (limits[`${side}${CORNER_SECTION}`]) {
                  const allowedTypes = [sectionBottomType2, sectionBottomType3]
                  let amountCornerSection = product
                     .filter(section => allowedTypes.includes(section.initialValues.values.sectionType) && section.initialValues.values.side === sideType2).length;
                  if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType1 && amountCornerSection === 2) {
                     changeType([], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: ''})
                  }
               } else if (!limits[`${side}${CORNER_SECTION}`] && !limits[`${side}${CUPBOARD}`] && !limits[`${side}${SECTION}`]) {
                  if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType4) {
                     changeType([], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: ''})
                  } else if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType1) {
                     changeType([
                        {value: sectionBottomType2, name: sectionBottomType2}, 
                        {value: sectionBottomType3, name: sectionBottomType3}
                     ], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: sectionBottomType2})
                  } else {
                     changeType([
                        {value: sectionBottomType1, name: sectionBottomType1}, 
                        {value: sectionBottomType4, name: sectionBottomType4}
                     ], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: sectionBottomType1})
                  }
               }
            } else {
               changeType([], bottomLevelList, setBottomLevelList)
               changeFormValues({bottomType: ''})
            }  
         } else {
            if (limits[`${previousSide}${previousLastTopSectionType}`]) {
               if (limits[`${side}${topCornerType}`]) {
                  const allowedTypes = [sectionUpperType3, sectionUpperType4]
                  let amountCornerSection = product
                     .filter(section => allowedTypes.includes(section.initialValues.values.sectionType) && section.initialValues.values.side === sideType2).length
                  if (allowedTypes.includes(limits[`${previousSide}${previousLastTopSectionType}`]) && amountCornerSection === 2) {
                     changeType([], topLevelList, setTopLevelList)
                     changeFormValues({upperType: ''})
                  } 
               } else if (!limits[`${side}${topSectionType}`] && !limits[`${side}${topCornerType}`]) {
                  if (limits[`${previousSide}${previousLastTopSectionType}`] === sectionUpperType3) {
                     changeType([{value: sectionUpperType4, name: sectionUpperType4}], topLevelList, setTopLevelList)
                     changeFormValues({upperType: sectionUpperType4})
                  } else if (limits[`${previousSide}${previousLastTopSectionType}`] === sectionUpperType4) {
                     changeType([{value: sectionUpperType3, name: sectionUpperType3}], topLevelList, setTopLevelList)
                     changeFormValues({upperType: sectionUpperType3})
                  }
               }
            } 
         }
      } else {
         previousSide = sideType2
         if (level === levelType1) {
            if (limits[`${previousSide}${LAST_SECTION}`]) {
               if (limits[`${side}${CUPBOARD}`]) {
                  changeType([{value: sectionBottomType4, name: sectionBottomType4}], bottomLevelList, setBottomLevelList)
                  changeFormValues({bottomType: sectionBottomType4})
               } else if (limits[`${side}${CORNER_SECTION}`]) {
                  const allowedTypes = [sectionBottomType2, sectionBottomType3]
                  let amountCornerSection = product.filter(section => allowedTypes.includes(section.initialValues.values.sectionType) && section.initialValues.values.side === sideType3).length
                  if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType1 && amountCornerSection === 1) {
                     changeType([
                        {value: sectionBottomType1, name: sectionBottomType1}, 
                        {value: sectionBottomType4, name: sectionBottomType4}
                     ], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: sectionBottomType1})
                  }
               } else if (!limits[`${side}${CORNER_SECTION}`] && !limits[`${side}${CUPBOARD}`] && !limits[`${side}${SECTION}`]) {
                  if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType4) {
                     changeType([], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: ''})
                  } else if (limits[`${previousSide}${LAST_SECTION}`] === sectionBottomType1) {
                     changeType([
                        {value: sectionBottomType2, name: sectionBottomType2}, 
                        {value: sectionBottomType3, name: sectionBottomType3}
                     ], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: sectionBottomType2})
                  } else {
                     changeType([
                        {value: sectionBottomType1, name: sectionBottomType1}, 
                        {value: sectionBottomType4, name: sectionBottomType4}
                     ], bottomLevelList, setBottomLevelList)
                     changeFormValues({bottomType: sectionBottomType1})
                  }
               }
            } else {
               changeType([], bottomLevelList, setBottomLevelList)
               changeFormValues({bottomType: ''})
            }  
         } else {
            if (limits[`${previousSide}${previousLastTopSectionType}`]) {
               if (limits[`${side}${topCornerType}`]) {
                  const allowedTypes = [sectionUpperType3, sectionUpperType4]
                  let amountCornerSection = product.filter(section => allowedTypes.includes(section.initialValues.values.sectionType) && section.initialValues.values.side === sideType3).length
                  if (allowedTypes.includes(limits[`${previousSide}${previousLastTopSectionType}`]) && amountCornerSection === 1) {
                     changeType([
                        {value: sectionUpperType1, name: sectionUpperType1}, 
                        {value: sectionUpperType2, name: sectionUpperType2}
                     ], topLevelList, setTopLevelList)
                     changeFormValues({upperType: sectionUpperType1})
                  } 
               } else if (!limits[`${side}${topSectionType}`] && !limits[`${side}${topCornerType}`]) {
                  if (limits[`${previousSide}${previousLastTopSectionType}`] === sectionUpperType3) {
                     changeType([{value: sectionUpperType4, name: sectionUpperType4}], topLevelList, setTopLevelList)
                     changeFormValues({upperType: sectionUpperType4})
                  } else if (limits[`${previousSide}${previousLastTopSectionType}`] === sectionUpperType4) {
                     changeType([{value: sectionUpperType3, name: sectionUpperType3}], topLevelList, setTopLevelList)
                     changeFormValues({upperType: sectionUpperType3})
                  }
               }
            } 
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [limits, allValues.side, allValues.level, setValue])

   useEffect(() => {
      if (allValues.bottomType === sectionBottomType2 || allValues.bottomType === sectionBottomType3) {
         inputAtributes.find(obj => obj.id === localOption1).min = allValues.neighboringWidth + frontMinWidth
         inputAtributes.find(obj => obj.id === localOption1).max = allValues.neighboringWidth + frontMaxWidth
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.neighboringWidth])

   useEffect(() => {
      if (allValues.bottomType === sectionBottomType3) {
         inputAtributes.find(obj => obj.id === localOption2).min = prevDepth.current + minSectionDepth
         inputAtributes.find(obj => obj.id === localOption2).max = prevDepth.current + frontMaxWidth
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [prevDepth.current])

   useEffect(() => {  
      setCheckboxes(initialCheckboxes)
      if (allValues.level === levelType2 || allValues.level === levelType3) {
         if (allValues.level === levelType2) inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList([
            {value:frontOpeningType3, name:frontOpeningType3}, {value:frontOpeningType5, name:frontOpeningType5}]);
         if (allValues.level === levelType3) inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList([
            {value:frontOpeningType3, name:frontOpeningType3}]);
         inputAtributes.forEach(item => item.readOnly = false)
         inputAtributes.find(obj => obj.id === localOption2).min = 200
         changeFormValues({drawers: 0, shelves: 0, depth: 300, neighboringWidth: 300, side: sideType1, upperType: sectionUpperType1})
         if (allValues.level === levelType2) {
            setHides({
               sink: true,
               visibleSide: true,
               kargo: true,
               oven: true,
               microwave: true,
               hob: true,
               fridge: true,
               simpleFridge: true,
               dish: false,
               dishwasher: true,
               backlight: false,
               neighboringWidth: true,
               drawers: true,
               drawersType: true,
               withoutFront: false,
               lift: false,
               liftType:true,
               shelves: false,
            })
         } else {
            setHides({
               sink: true,
               visibleSide: true,
               kargo: true,
               oven: true,
               microwave: true,
               hob: true,
               fridge: true,
               simpleFridge: true,
               dish: false,
               dishwasher: true,
               backlight: true,
               neighboringWidth: true,
               drawers: true,
               drawersType: true,
               withoutFront: false,
               lift: false,
               liftType:true,
               shelves: false,
            })
         }
      } else {
         inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList([{value:frontOpeningType4, name:frontOpeningType4}])
         inputAtributes.find(obj => obj.id === localOption4).max = 6
         changeFormValues({drawers: 0, shelves: 0, depth: 600, neighboringWidth: 600, side: sideType1, bottomType: sectionBottomType1})
         setHides(initialHides)
      }
      changeFormValues({frontOpening: inputAtributes.find(obj => obj.id === localOption8).options[0].value})
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.level])

   useEffect(() => {
      changeBottomType()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.bottomType, allValues.side])

   useEffect(() => {
      changeFormValues({shelves: 0})
      setCheckboxes({...checkboxes, dish: false, withoutFront: false, lift: false})
      if (allValues.upperType === sectionUpperType1 || allValues.upperType === sectionUpperType4) {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: true,
            microwave: true,
            hob: true,
            fridge: true,
            simpleFridge: true,
            dish: false,
            dishwasher: true,
            backlight: false,
            neighboringWidth: true,
            drawers: true,
            drawersType: true,
            withoutFront: false,
            lift: false,
            liftType:true,
            shelves: false,
         })
      } else if (allValues.upperType === sectionUpperType3) {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: true,
            microwave: true,
            hob: true,
            fridge: true,
            simpleFridge: true,
            dish: false,
            dishwasher: true,
            backlight: false,
            neighboringWidth: false,
            drawers: true,
            drawersType: true,
            withoutFront: false,
            lift: false,
            liftType:true,
            shelves: false,
         })
      } else {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: true,
            microwave: true,
            hob: true,
            fridge: true,
            simpleFridge: true,
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: true,
            drawers: true,
            drawersType: true,
            withoutFront: true,
            lift: false,
            liftType:true,
            shelves: false,
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.upperType, allValues.side])

   useEffect(() => {
      setCheckboxes({...checkboxes, kargo: false})
      if (allValues.shelves > 0 && allValues.bottomType !== sectionBottomType4) {
         changeFormValues({drawers: 0})
         inputAtributes.find(obj => obj.id === localOption4).readOnly = true
         setHides({...hides, kargo: true, dishwasher: true, oven: true})
      } else {
         if (allValues.level === levelType1) {
            if (allValues.bottomType === sectionBottomType1) {
               inputAtributes.find(obj => obj.id === localOption4).readOnly = false
               if (checkboxes.hob) {
                  if (!checkboxes.withoutFront) setHides({...hides, oven: false}); 
               } else if (!checkboxes.hob && !checkboxes.withoutFront && !checkboxes.sink) {
                  setHides({...hides, kargo: false, dishwasher: false, oven: false})
               }
            } else if (allValues.bottomType === sectionBottomType2 || allValues.bottomType === sectionBottomType3) {
               inputAtributes.find(obj => obj.id === localOption4).readOnly = false
            }
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.shelves])

   useEffect(() => {
      if (allValues.drawers > 0) {
         setHides({...hides, drawersType: false})
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
         changeFormValues({frontAmount: 1})
         if (allValues.bottomType !== sectionBottomType4) {
            inputAtributes.find(obj => obj.id === localOption6).readOnly = true
            changeFormValues({shelves: 0})
            if (allValues.drawers > 1) {
               if (!checkboxes.oven) {
                  setCheckboxes({...checkboxes, oven: false})
                  setHides({...hides, kargo: true, dishwasher: true, oven: true, withoutFront: true, drawersType: false, shelves: true})
               }
            } else {
               setHides({...hides, kargo: true, dishwasher: true, oven: false, withoutFront: true, drawersType: false, shelves: true})
            }
         }
      } else {
         if (allValues.bottomType === sectionBottomType1) {
            if (!checkboxes.oven && !checkboxes.hob) {
               inputAtributes.find(obj => obj.id === localOption3).readOnly = false
               inputAtributes.find(obj => obj.id === localOption6).readOnly = false
               setHides({...hides, kargo: false, dishwasher: false, withoutFront: false, drawersType: true, shelves: false,})
            } else if (checkboxes.hob && !checkboxes.oven) {
               inputAtributes.find(obj => obj.id === localOption3).readOnly = false
               inputAtributes.find(obj => obj.id === localOption6).readOnly = false
               setHides({...hides, drawersType: true, shelves: false, withoutFront: false})
            } else {
               setHides({...hides, drawersType: true, shelves: false})
            }
         } else if (allValues.bottomType === sectionBottomType4) {
            setHides({...hides, drawersType: true, shelves: false})
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.drawers])
   
   useEffect(() => {
      if (checkboxes.sink) {
         setHides({...hides, oven: true, kargo: true, dishwasher: true, hob: true, withoutFront: true,})
      } else {
         allValues.bottomType === sectionBottomType1
         ? allValues.drawers === 0 
            ? allValues.shelves === 0
               ? setHides({...hides, oven: false, kargo: false, dishwasher: false, hob: false, withoutFront: false,})
               : setHides({...hides, hob: false, withoutFront: false,})
            : allValues.drawers === 1
               ? setHides({...hides, oven: false, hob: false,})
               : setHides({...hides, hob: false,})
         : setHides({...hides, hob: false, withoutFront: false,})
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.sink])

   useEffect(() => {
      if (checkboxes.kargo) {
         changeFormValues({drawers: 0, shelves: 0, frontAmount: 1})
         setHides({...hides, oven: true, sink: true, drawers: true, dishwasher: true, withoutFront: true, hob: true})
         inputAtributes.find(obj => obj.id === localOption6).readOnly = true
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
      } else {
         setHides({...hides, oven: false, sink: false, drawers: false, dishwasher: false, withoutFront: false, hob: false})
         inputAtributes.find(obj => obj.id === localOption6).readOnly = false
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.kargo])

   useEffect(() => {
      if (checkboxes.oven) {
         changeFormValues({width: 600})
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         if (allValues.bottomType !== sectionBottomType4) {
            changeFormValues({width: 600, depth: 600, drawers: 1, shelves: 0, frontAmount: 1})
            inputAtributes.find(obj => obj.id === localOption2).readOnly = true
            inputAtributes.find(obj => obj.id === localOption3).readOnly = true
            inputAtributes.find(obj => obj.id === localOption6).readOnly = true
            inputAtributes.find(obj => obj.id === localOption4).readOnly = false
            inputAtributes.find(obj => obj.id === localOption4).max = 1
            setHides({...hides, sink: true, kargo: true, dishwasher: true, withoutFront: true,})
         } else {
            setHides({...hides, fridge: true, simpleFridge: true})
            inputAtributes.find(obj => obj.id === localOption2).min = 580
         }
      } else {
         inputAtributes.find(obj => obj.id === localOption4).max = 6
         if (allValues.bottomType !== sectionBottomType4) {
            inputAtributes.find(obj => obj.id === localOption1).readOnly = false
            changeFormValues({drawers: 0})
            if (!checkboxes.hob) {
               inputAtributes.find(obj => obj.id === localOption2).readOnly = false
               setHides({...hides, sink: false, kargo: false, dishwasher: false, withoutFront: false,})
            } else {
               setHides({...hides, withoutFront: false,})
            }
         } else {
            if (!checkboxes.microwave) {
               inputAtributes.find(obj => obj.id === localOption2).min = 200
               inputAtributes.find(obj => obj.id === localOption1).readOnly = false
               if (!checkboxes.withoutFront)  {
                  setHides({...hides, fridge: false, simpleFridge: false,})
               } else {
                  setHides({...hides, simpleFridge: false,})
               }
            }
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.oven])

   useEffect(() => {
      if (checkboxes.microwave) {
         changeFormValues({width: 600})
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         setHides({...hides, fridge: true, simpleFridge: true,})
      } else {
         if (!checkboxes.oven) {
            inputAtributes.find(obj => obj.id === localOption2).min = 200
            inputAtributes.find(obj => obj.id === localOption1).readOnly = false
            if (!checkboxes.withoutFront) {
               setHides({...hides, fridge: false, simpleFridge: false,})
            } else {
               setHides({...hides, fridge: false})
            }
         }
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.microwave])

   useEffect(() => {
      if (checkboxes.hob) {
         setHides({...hides, sink: true, kargo: true, dishwasher:true});
         (allValues.bottomType !== sectionBottomType3) ? changeFormValues({depth: 600}) : prevDepth.current = 600;
         inputAtributes.find(obj => obj.id === localOption2).readOnly = true
      } else {
         if (!checkboxes.oven) {
            inputAtributes.find(obj => obj.id === localOption2).readOnly = false
            if (!checkboxes.withoutFront) {
               setHides({...hides, sink: false})
               if (allValues.bottomType === sectionBottomType1) {
                  allValues.drawers === 0 && allValues.shelves === 0
                     ? setHides({...hides, sink: false, kargo: false, dishwasher: false})
                     : setHides({...hides, sink: false})
               }
            }  
         } 
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.hob])
   
   useEffect(() => {
      if (checkboxes.fridge) {
         changeFormValues({width: 600, drawers: 0, frontAmount: 1})
         setHides({...hides, oven: true, microwave: true, drawers: true, withoutFront: true, simpleFridge:true, lift: false,})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
      } else if (checkboxes.simpleFridge) {
         changeFormValues({width: 650, drawers: 0, frontAmount: 2})
         setHides({...hides, oven: true, microwave: true, drawers: true, withoutFront: false, fridge:true, lift: false})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         inputAtributes.find(obj => obj.id === localOption1).min = 650
      } else {
         inputAtributes.find(obj => obj.id === localOption2).min = 200
         inputAtributes.find(obj => obj.id === localOption1).readOnly = false
         inputAtributes.find(obj => obj.id === localOption1).min = 100
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         if (!checkboxes.withoutFront) {
            setHides({...hides, oven: false, microwave: false, drawers: false, withoutFront: false, fridge: false, simpleFridge: false, lift: true})
            setCheckboxes({...checkboxes, lift: false})
         } else {
            setHides({...hides, oven: false, microwave: false, drawers: false, withoutFront: false, fridge: true, simpleFridge: false})
         }
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.fridge, checkboxes.simpleFridge])

   useEffect(() => {
      if (checkboxes.dishwasher) {
         inputAtributes.forEach(item => item.readOnly = true)
         changeFormValues({width: allValues.dishwasherSize, depth: 600, drawers: 0, shelves: 0, frontAmount: 1})
         setHides({...hides, oven: true, sink: true, kargo: true, drawers: true, hob: true, withoutFront: true,})
      } else {
         inputAtributes.forEach(item => item.readOnly = false)
         setHides({...hides, oven: false, sink: false, kargo: false, drawers: false, hob: false, withoutFront: false,})
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.dishwasher])

   useEffect(() => {
      if (checkboxes.withoutFront) {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
         inputAtributes.find(obj => obj.id === localOption3).min = 0
         inputAtributes.find(obj => obj.id === localOption3).max = 0
         changeFormValues({frontAmount: 0})
         if (allValues.level === levelType2 || allValues.level === levelType3) {
            setHides({...hides, lift: true})
         } else {
            if (allValues.bottomType === sectionBottomType1) {
               setHides({...hides, kargo: true, sink: true, dishwasher: true, oven:true})
            } else if (allValues.bottomType === sectionBottomType4) {
               setHides({...hides, fridge:true, lift: true})
            } else if (allValues.bottomType === sectionBottomType2 || allValues.bottomType === sectionBottomType3) {
               setHides({...hides, sink: true})
            }
         }        
      } else {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         inputAtributes.find(obj => obj.id === localOption3).min = 1
         inputAtributes.find(obj => obj.id === localOption3).max = 2
         changeFormValues({frontAmount: 1})
         if (allValues.level === levelType1) {
            if (!checkboxes.hob) {
               if (allValues.bottomType === sectionBottomType1) {
                  allValues.shelves === 0
                     ? setHides({...hides, kargo: false, sink: false, dishwasher: false, oven:false})
                     : setHides({...hides, sink: false})
               } else if (allValues.bottomType === sectionBottomType4) {
                  if (!checkboxes.oven && !checkboxes.microwave && !checkboxes.simpleFridge) {
                     setHides({...hides, fridge:false})
                  } else if (checkboxes.simpleFridge) {
                     setHides({...hides, lift:false})
                  }
               } else if (allValues.bottomType === sectionBottomType2 || allValues.bottomType === sectionBottomType3) {
                  setHides({...hides, sink: false})
               }
            } else {
               if (allValues.bottomType === sectionBottomType1 && allValues.shelves === 0) setHides({...hides, oven:false})
            }
         } else {
            setHides({...hides, lift: false})
         }
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.withoutFront])

   useEffect(() => {
      if (checkboxes.lift) {
         if (!checkboxes.simpleFridge || !checkboxes.fridge) {
         }
         setHides({...hides, liftType: false, withoutFront: true})
      } else {
         if (!checkboxes.fridge) inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         if (allValues.upperType !== sectionUpperType2) {
            !checkboxes.fridge
            ? setHides({...hides, liftType: true, withoutFront: false})
            : setHides({...hides, liftType: true, withoutFront: true})
         } else {
            setHides({...hides, liftType: true, withoutFront: true})
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.lift])

   useEffect(() => {
      const height = allValues.heightKitchen - allValues.heightDownSection - skirtingHeight - allValues.heightMezzanineSection
      changeFormValues({heightUpSection: height})
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allValues.heightKitchen, allValues.heightDownSection, allValues.heightMezzanineSection])

   const checkLimits = (product) => {
      const updatedLimits = { ...productLimits };
      const sectionsBySide = { left: [], central: [], right: [] };
      if (!product.length) return updatedLimits
      product.forEach((section) => {
         sectionsBySide[section.initialValues.values.side].push({ level: section.initialValues.values.level, type: section.initialValues.values.sectionType });
         const key = `${section.initialValues.values.side}${
            section.initialValues.values.level === levelType1 ? SECTION :
            section.initialValues.values.level === levelType2 ? TOP_SECTION :
            MEZZANINE_SECTION}`;
         if ([sectionBottomType2, sectionBottomType3, sectionUpperType3, sectionUpperType4].includes(section.initialValues.values.sectionType)) {
            updatedLimits[key.replace(SECTION, CORNER_SECTION)] = true;
         } else if (section.initialValues.values.sectionType === sectionBottomType4) {
            updatedLimits[key.replace(SECTION, CUPBOARD)] = true;
         } else {
            updatedLimits[key] = true;
         }
      });
      Object.keys(sectionsBySide).forEach(side => {
         const sortedSections = sectionsBySide[side].sort((a, b) => {
            const order = { [levelType1]: 1, [levelType2]: 2, [levelType3]: 3 };
            return order[a.level] - order[b.level];
         });
         sortedSections.forEach(({ level, type }) => {
            const lastKey = `${side}${LAST}${
               level === levelType1 ? SECTION :
               level === levelType2 ? TOP_SECTION :
               MEZZANINE_SECTION}`;
            updatedLimits[lastKey] = type;
         });
      });
      return updatedLimits;
   }
   
   const addSection = (data) => {
      let sectionType = determineType(data.level, data.side)
      dispatch(addSectionCount(sectionType))
      let sectionId = sectionAmount.allItem
      data.level === levelType1
         ? data.sectionType = data.bottomType
         : data.sectionType = data.upperType
      let sectionDimensions = new SectionDimensions(data, checkboxes, indentValues, prevDepth.current, sectionId)
      let section = sectionDimensions.createSection();
      dispatch(changeProductLimits(checkLimits([...product, section])))
      dispatch(addSectionObject(section))
      dispatch(updateSectionId())
      section.furnitures.forEach(item => {
         furniture[item.name]
            ? furniture[item.name].value += item.value
            : furniture[item.name] = item;
      })
      section.services.forEach(item => allService[item.name].value += item.value)

      for (let key in furniture) {
         if (furniture[key].value > 0) dispatch(addFurnitureItem(furniture[key]));
      }
      prevDepth.current = data.depth
      data.level !== levelType1
         ? changeFormValues({shelves: 0})
         : changeBottomType()
   }

   const deleteLastSection = (e) => {
      e.preventDefault()
      dispatch(changeProductLimits(checkLimits(product.slice(0, -1))))
      let section = product[product.length - 1]
      section.furnitures.forEach(item => furniture[item.name].value -= item.value)
      section.services.forEach(item => allService[item.name].value -= item.value)
      for (let key in furniture) {
         if (furniture[key].value > 0) dispatch(addFurnitureItem(furniture[key]));
      }
      let sectionType = determineType(section.initialValues.values.level, section.initialValues.values.side)
      dispatch(subtractSectionCount(sectionType))
      dispatch(deleteSectionObject(section.id))
   }

   return (
      <FormProvider {...form}>
         <form className={props.class + section1FormClass} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(addSection)} noValidate>
            <GlobalOptions className={props.class} title={props.title} value={allValues} />
            <LevelOptions className={props.class} value={allValues} title={props.title1} levelBottomOptions={bottomLevelList} levelTopOptions={topLevelList} />
            <LocalOptions className={props.class} value={allValues} inputAtributes={inputAtributes} hides={hides} checkboxes={checkboxes} />
            <ChangeableOptions className={props.class} value={allValues} hides={hides} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
            <SideOptions className={props.class} />
            <div className={props.class + section1BtnClass}>
               <MyButton1 color={addBtnColor} disabled={isSubmitting || !isValid} >{t(ADD_ITEM)}</MyButton1>
               <MyButton color={delBtnColor} onClick={deleteLastSection}>{t(DELETE_ITEM)}</MyButton>
            </div>
            <ItemTable className={props.class} itemAmount={sectionAmount} level={allValues.topLevel} title={props.title2} />
         </form>
      </FormProvider>
   );
}