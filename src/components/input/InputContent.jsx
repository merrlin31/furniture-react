import { useEffect, useRef } from "react";
import { useState } from "react";
import { createFrontOpeningList, initialCheckboxes, initialHides, initialInputAtributes, determineType } from "../properties/inputProperties";
import { MyButton } from "../UI/MyButton/MyButton";
import { ItemTable } from "./ItemTable";
import { SectionDimensions } from "../../utils/SectionDimensions"
import { furniture } from "../../utils/furniture";
import { allService } from "../../utils/services";
import { addBtnColor, delBtnColor, frontOpeningType3, frontOpeningType4, frontOpeningType5, levelType1, 
   levelType2, levelType3, localOption1, localOption2, localOption3, localOption4, 
   localOption6, localOption8, section1BtnClass, section1FormClass, sectionBottomType1, 
   sectionBottomType2, sectionBottomType3, sectionBottomType4, sectionUpperType1, sectionUpperType2, 
   sectionUpperType3, sectionUpperType4, sideType1, skirtingHeight } from "../../utils/description";
import { GlobalOptions } from "./GlobalOptions";
import { LocalOptions } from "./LocalOptions";
import { ChangeableOptions } from "./ChangeableOptions";
import { LevelOptions } from "./LevelOptions";
import { SideOptions } from "./SideOptions";
import { useDispatch, useSelector } from "react-redux";
import { addFurnitureItem, addSectionCount, addSectionObject, changeValues, deleteSectionObject, subtractSectionCount } from "../../reducers/productReducer";
import '../../styles/input.scss';

export const InputContent = (props) => {
   const [checkboxes, setCheckboxes] = useState(initialCheckboxes)
   const [hides, setHides] = useState(initialHides)
   const [inputAtributes] = useState(initialInputAtributes)

   const dispatch = useDispatch()
   const sectionAmount = useSelector(state => state.product.sectionAmount)
   const product = useSelector(state => state.product.product)
   const values = useSelector(state => state.product.initialValues)
   const indentValues = useSelector(state => state.setting.indentValues)

   useEffect(() => {     
      setCheckboxes(initialCheckboxes)
      if (values.level === levelType2 || values.level === levelType3) {
         if (values.level === levelType2) inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList([
            {value:frontOpeningType3, name:frontOpeningType3}, {value:frontOpeningType5, name:frontOpeningType5}]);
         if (values.level === levelType3) inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList([
            {value:frontOpeningType3, name:frontOpeningType3}]);
         inputAtributes.forEach(item => item.readOnly = false)
         inputAtributes.find(obj => obj.id === localOption2).min = 200
         dispatch(changeValues({drawers: 0, shelves: 0, depth: 300, neighboringWidth: 300, side: sideType1, upperType: sectionUpperType1}))
         if (values.level === levelType2) {
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
         inputAtributes.find(obj => obj.id === localOption6).min = 0
         dispatch(changeValues({drawers: 0, shelves: 0, depth: 600, neighboringWidth: 600, side: sideType1, bottomType: sectionBottomType1}))
         setHides(initialHides)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.level])

   function changeBottomType() {
      inputAtributes.forEach(item => item.readOnly = false)
      inputAtributes.find(obj => obj.id === localOption6).min = 0
      inputAtributes.find(obj => obj.id === localOption4).max = 6
      inputAtributes.find(obj => obj.id === localOption2).min = 200
      dispatch(changeValues({drawers: 0, shelves: 0}))
      setCheckboxes(initialCheckboxes)
      if (values.bottomType === sectionBottomType1) {
         setHides(initialHides)
      } else if (values.bottomType === sectionBottomType2 || values.bottomType === sectionBottomType3) {
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
         inputAtributes.find(obj => obj.id === localOption6).min = 1
         dispatch(changeValues({drawers: 0, shelves: 1, frontAmount: 1}))
      }
   }
   useEffect(() => {
      changeBottomType()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.bottomType])

   useEffect(() => {
      dispatch(changeValues({shelves: 0}))
      inputAtributes.find(obj => obj.id === localOption6).min = 0
      setCheckboxes({...checkboxes, dish: false, withoutFront: false, lift: false})
      if (values.upperType === sectionUpperType1 || values.upperType === sectionUpperType4) {
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
      } else if (values.upperType === sectionUpperType3) {
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
   }, [values.upperType])

   useEffect(() => {
      setCheckboxes({...checkboxes, kargo: false})
      if (values.shelves > 0 && values.bottomType !== sectionBottomType4) {
         dispatch(changeValues({drawers: 0}))
         inputAtributes.find(obj => obj.id === localOption4).readOnly = true
         setHides({...hides, kargo: true, dishwasher: true, oven: true})
      } else {
         if (values.level === levelType1) {
            if (values.bottomType === sectionBottomType1) {
               inputAtributes.find(obj => obj.id === localOption4).readOnly = false
               if (checkboxes.hob) {
                  if (!checkboxes.withoutFront) setHides({...hides, oven: false}); 
               } else if (!checkboxes.hob && !checkboxes.withoutFront && !checkboxes.sink) {
                  setHides({...hides, kargo: false, dishwasher: false, oven: false})
               }
            } else if (values.bottomType === sectionBottomType2 || values.bottomType === sectionBottomType3) {
               inputAtributes.find(obj => obj.id === localOption4).readOnly = false
            }
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.shelves])

   useEffect(() => {
      if (values.drawers > 0) {
         setHides({...hides, drawersType: false, shelves: true,})
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
         dispatch(changeValues({frontAmount: 1}))
         if (values.bottomType !== sectionBottomType4) {
            inputAtributes.find(obj => obj.id === localOption6).readOnly = true
            dispatch(changeValues({shelves: 0, frontAmount: 1}))
            if (values.drawers > 1) {
               setCheckboxes({...checkboxes, oven: false})
               setHides({...hides, kargo: true, dishwasher: true, oven: true, withoutFront: true, drawersType: false, shelves: true,})
            } else {
               setHides({...hides, kargo: true, dishwasher: true, oven: false, withoutFront: true, drawersType: false, shelves: true,})
            }
         }
      } else {
            if (values.bottomType === sectionBottomType1) {
               if (!checkboxes.oven && !checkboxes.hob) {
                  inputAtributes.find(obj => obj.id === localOption3).readOnly = false
                  inputAtributes.find(obj => obj.id === localOption6).readOnly = false
                  setHides({...hides, kargo: false, dishwasher: false, withoutFront: false, drawersType: true, shelves: false,})
               } else if (checkboxes.hob && !checkboxes.oven) {
                  inputAtributes.find(obj => obj.id === localOption3).readOnly = false
                  inputAtributes.find(obj => obj.id === localOption6).readOnly = false
                  setHides({...hides, drawersType: true, shelves: false, withoutFront: false,})
               } else {
                  setHides({...hides, drawersType: true, shelves: false,})
               }
            } 
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.drawers])
   
   useEffect(() => {
      if (checkboxes.sink) {
         setHides({...hides, oven: true, kargo: true, dishwasher: true, hob: true, withoutFront: true,})
      } else {
         values.bottomType === sectionBottomType1
         ? values.drawers === 0 
            ? values.shelves === 0
               ? setHides({...hides, oven: false, kargo: false, dishwasher: false, hob: false, withoutFront: false,})
               : setHides({...hides, hob: false, withoutFront: false,})
            : values.drawers === 1
               ? setHides({...hides, oven: false, hob: false,})
               : setHides({...hides, hob: false,})
         : setHides({...hides, hob: false, withoutFront: false,})
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.sink])

   useEffect(() => {
      if (checkboxes.kargo) {
         dispatch(changeValues({drawers: 0, shelves: 0, frontAmount: 1}))
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
         dispatch(changeValues({width: 600}))
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         if (values.bottomType !== sectionBottomType4) {
            dispatch(changeValues({width: 600, depth: 600, drawers: 1, shelves: 0, frontAmount: 1}))
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
         if (values.bottomType !== sectionBottomType4) {
            inputAtributes.find(obj => obj.id === localOption1).readOnly = false
            dispatch(changeValues({drawers: 0}))
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
         dispatch(changeValues({width: 600}))
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
         setHides({...hides, sink: true, kargo: true, dishwasher:true})
         dispatch(changeValues({depth: 600}))
         inputAtributes.find(obj => obj.id === localOption2).readOnly = true
      } else {
         if (!checkboxes.oven) {
            inputAtributes.find(obj => obj.id === localOption2).readOnly = false
            if (!checkboxes.withoutFront) {
               setHides({...hides, sink: false})
               if (values.bottomType === sectionBottomType1) {
                  values.drawers === 0 && values.shelves === 0
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
         dispatch(changeValues({width: 600, drawers: 0, frontAmount: 1}))
         setHides({...hides, oven: true, microwave: true, drawers: true, withoutFront: true, simpleFridge:true, lift: false,})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
      } else if (checkboxes.simpleFridge) {
         dispatch(changeValues({width: 650, drawers: 0, frontAmount: 2}))
         setHides({...hides, oven: true, microwave: true, drawers: true, withoutFront: false, fridge:true, lift: false})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         inputAtributes.find(obj => obj.id === localOption1).min = 650
      } else {
         inputAtributes.find(obj => obj.id === localOption2).min = 200
         inputAtributes.find(obj => obj.id === localOption1).readOnly = false
         inputAtributes.find(obj => obj.id === localOption1).min = 0
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
         dispatch(changeValues({width: values.dishwasherSize, depth: 600, drawers: 0, shelves: 0, frontAmount: 1}))
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
         dispatch(changeValues({frontAmount: 0}))
         if (values.level === levelType2 || values.level === levelType3) {
            setHides({...hides, lift: true})
         } else {
            if (values.bottomType === sectionBottomType1) {
               setHides({...hides, kargo: true, sink: true, dishwasher: true, oven:true})
            } else if (values.bottomType === sectionBottomType4) {
               setHides({...hides, fridge:true, lift: true})
            } else if (values.bottomType === sectionBottomType2 || values.bottomType === sectionBottomType3) {
               setHides({...hides, sink: true})
            }
         }        
      } else {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         inputAtributes.find(obj => obj.id === localOption3).min = 1
         inputAtributes.find(obj => obj.id === localOption3).max = 2
         dispatch(changeValues({frontAmount: 1}))
         if (values.level === levelType1) {
            if (!checkboxes.hob) {
               if (values.bottomType === sectionBottomType1) {
                  values.shelves === 0
                     ? setHides({...hides, kargo: false, sink: false, dishwasher: false, oven:false})
                     : setHides({...hides, sink: false})
               } else if (values.bottomType === sectionBottomType4) {
                  if (!checkboxes.oven && !checkboxes.microwave && !checkboxes.simpleFridge) {
                     setHides({...hides, fridge:false})
                  } else if (checkboxes.simpleFridge) {
                     setHides({...hides, lift:false})
                  }
               } else if (values.bottomType === sectionBottomType2 || values.bottomType === sectionBottomType3) {
                  setHides({...hides, sink: false})
               }
            } else {
               if (values.bottomType === sectionBottomType1 && values.shelves === 0) setHides({...hides, oven:false})
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
         if (values.upperType !== sectionUpperType2) {
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
      dispatch(changeValues({heightUpSection: values.heightKitchen - values.heightDownSection - skirtingHeight - values.heightMezzanineSection}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.heightKitchen, values.heightDownSection, values.heightMezzanineSection])

   const prevDepth = useRef(600)

   const [sectionId, setSectionId] = useState(1)

   const addSection = (e) => {
      e.preventDefault()
      values.level === levelType1
         ? values.sectionType = values.bottomType
         : values.sectionType = values.upperType
      let sectionDimensions = new SectionDimensions(values, checkboxes, indentValues, prevDepth.current, sectionId)
      let section = sectionDimensions.createSection();
      dispatch(addSectionObject(section))

      for (let key in section.furnitures) {
         if (furniture[key]) {
            furniture[key].value += section.furnitures[key].value
         } else {
            furniture[key] = section.furnitures[key]
         }
      }
      for (let key in section.services) {
         allService[key].value += section.services[key].value
      }

      for (let key in furniture) {
         if (furniture[key].value > 0) dispatch(addFurnitureItem(furniture[key]));
      }
      prevDepth.current = values.depth
      setSectionId(sectionId + 1)
      values.level !== levelType1
         ? dispatch(changeValues({shelves: 0}))
         : changeBottomType()
      let sectionType = determineType(values.level, values.side)
      dispatch(addSectionCount(sectionType))
   }

   const deleteLastSection = (e) => {
      e.preventDefault()
      let section = product[product.length - 1]
      
      for (let key in section.furnitures) {
            furniture[key].value -= section.furnitures[key].value
      }
      for (let key in section.services) {
         allService[key].value -= section.services[key].value
      }

      for (let key in furniture) {
         if (furniture[key].value > 0) dispatch(addFurnitureItem(furniture[key]));
      }
      let sectionType = determineType(section.initialValues.level, section.initialValues.side)
      dispatch(subtractSectionCount(sectionType))
      dispatch(deleteSectionObject(section.id))
   }

   return (
      <div className={props.class + section1FormClass}>
         <GlobalOptions className={props.class} value={values} title={props.title} />
         <LevelOptions className={props.class} value={values} title={props.title1} />
         <LocalOptions className={props.class} value={values} inputAtributes={inputAtributes} hides={hides} checkboxes={checkboxes} />
         <ChangeableOptions className={props.class} value={values} hides={hides} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
         <SideOptions className={props.class} value={values} dispatch={dispatch} />
         <div className={props.class + section1BtnClass}>
            <MyButton color={addBtnColor} onClick={addSection}>Додати</MyButton>
            <MyButton color={delBtnColor} onClick={deleteLastSection}>Видалити</MyButton>
         </div>
         <ItemTable className={props.class} itemAmount={sectionAmount} level={values.topLevel} title={props.title2} />
      </div>
   );
}