import { useEffect, useRef } from "react";
import { useState } from "react";
import { createFrontOpeningList, initialValues, initialCheckboxes, 
   initialHides, initialItemAmount, initialInputAtributes } from "../properties/inputProperties";
import { MyButton } from "../UI/MyButton/MyButton";
import { ItemTable } from "./ItemTable";
import { SectionDimensions } from "../../utils/SectionDimensions"
import { useContext } from "react";
import { MyContext } from '../../context';
import '../../styles/input.scss';
import { furniture } from "../../utils/furniture";
import { allService } from "../../utils/services";
import { addBtnColor, delBtnColor, frontOpeningType3, frontOpeningType4, levelType1, 
   levelType2, levelType3, localOption1, localOption2, localOption3, localOption4, 
   localOption6, localOption8, section1BtnClass, section1FormClass, sectionBottomType1, 
   sectionBottomType2, sectionBottomType3, sectionBottomType4, sectionUpperType1, sectionUpperType2, 
   sectionUpperType3, sectionUpperType4, sideType1, sideType2, skirtingHeight } from "../../utils/description";
import { GlobalOptions } from "./GlobalOptions";
import { LocalOptions } from "./LocalOptions";
import { ChangeableOptions } from "./ChangeableOptions";
import { LevelOptions } from "./LevelOptions";
import { SideOptions } from "./SideOptions";

export const InputContent = (props) => {
   const {indentValues, sections, setSections, setFurnitures, setServices} = useContext(MyContext)
   const [values, setValues] = useState(initialValues)
   const [checkboxes, setCheckboxes] = useState(initialCheckboxes)
   const [hides, setHides] = useState(initialHides)
   const [itemAmount, setItemAmount] = useState(initialItemAmount)
   const [inputAtributes] = useState(initialInputAtributes)

   const change = (e) => {
      setCheckboxes({...checkboxes, [e.target.id]: e.target.checked})
   }
   const changeDish = (e) => {
      setValues({...values, dishwasherSize: e.target.value, width: e.target.value})
   }

   useEffect(() => {     
      setCheckboxes(initialCheckboxes)
      if (values.level === levelType2 || values.level === levelType3) {
         inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList(frontOpeningType3, frontOpeningType3)
         inputAtributes.forEach(item => item.readOnly = false)
         values.upperType = sectionUpperType1
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
         setValues({...values, drawers: 0, shelves: 0, depth: 300, neighboringWidth: 300, side: sideType1})
         inputAtributes.find(obj => obj.id === localOption2).min = 200
      } else {
         inputAtributes.find(obj => obj.id === localOption8).options = createFrontOpeningList(frontOpeningType4, frontOpeningType4)
         values.bottomType = sectionBottomType1
         setHides(initialHides)
         setValues({...values, drawers: 0, shelves: 0, depth: 600, neighboringWidth: 600, side: sideType1})
         inputAtributes.find(obj => obj.id === localOption4).max = 6
         inputAtributes.find(obj => obj.id === localOption6).min = 0
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.level])

   function changeBottomType() {
      inputAtributes.forEach(item => item.readOnly = false)
      inputAtributes.find(obj => obj.id === localOption6).min = 0
      inputAtributes.find(obj => obj.id === localOption4).max = 6
      inputAtributes.find(obj => obj.id === localOption2).min = 200
      setValues({...values, drawers: 0, shelves: 0})
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
         setValues({...values, drawers: 0, shelves: 1, frontAmount: 1})
      }
   }
   useEffect(() => {
      changeBottomType()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.bottomType])

   useEffect(() => {
      setValues({...values, shelves: 0})
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
         setValues({...values, drawers: 0})
         inputAtributes.find(obj => obj.id === localOption4).readOnly = true
         setHides({...hides, kargo: true, dishwasher: true, oven: true})
      } else {
         if (values.level === levelType1) {
            if (values.bottomType === sectionBottomType1) {
               inputAtributes.find(obj => obj.id === localOption4).readOnly = false
               if (checkboxes.hob) {
                  if (!checkboxes.withoutFront) setHides({...hides, oven: false}) 
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
         setValues({...values, frontAmount: 1})
         if (values.bottomType !== sectionBottomType4) {
            inputAtributes.find(obj => obj.id === localOption6).readOnly = true
            setValues({...values, frontAmount: 1, shelves: 0})
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
         setValues({...values, drawers: 0, shelves: 0, frontAmount: 1})
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
         setValues({...values, width: 600})
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         if (values.bottomType !== sectionBottomType4) {
            setValues({...values, width: 600, depth: 600, drawers: 1, shelves: 0, frontAmount: 1})
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
            setValues({...values, drawers: 0})
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
         setValues({...values, width: 600})
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         setHides({...hides, fridge: true, simpleFridge: true,})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
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
         setValues({...values, depth: 600})
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
         setValues({...values, width: 600, drawers: 0, frontAmount: 1})
         setHides({...hides, oven: true, microwave: true, drawers: true, withoutFront: true, simpleFridge:true, lift: false,})
         inputAtributes.find(obj => obj.id === localOption2).min = 580
         inputAtributes.find(obj => obj.id === localOption1).readOnly = true
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
      } else if (checkboxes.simpleFridge) {
         setValues({...values, width: 650, drawers: 0, frontAmount: 2})
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
         setValues({...values, width: values.dishwasherSize, depth: 600, drawers: 0, shelves: 0, frontAmount: 1})
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
         setValues({...values, frontAmount: 0})
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
         setValues({...values, frontAmount: 1})
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
      setValues({...values, heightUpSection: values.heightKitchen - values.heightDownSection - skirtingHeight - values.heightMezzanineSection})
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.heightKitchen, values.heightDownSection, values.heightMezzanineSection])

   const prevDepth = useRef(600)

   const [sectionId, setSectionId] = useState(1)

   function addCount () {
      switch(values.side) {
         case sideType1 :
            if (values.level === levelType1) {
               setItemAmount(prev => prev = {...prev, leftBottomItem: prev.leftBottomItem + 1})
            } else if(values.level === levelType2) {
               setItemAmount(prev => prev = {...prev, leftCentralItem: prev.leftCentralItem + 1})
            } else {
               setItemAmount(prev => prev = {...prev, leftUpperItem: prev.leftUpperItem + 1})
            }
            break
         case sideType2 :
            if (values.level === levelType1) {
               setItemAmount(prev => prev = {...prev, centralBottomItem: prev.centralBottomItem + 1})
            } else if(values.level === levelType2) {
               setItemAmount(prev => prev = {...prev, centralCentralItem: prev.centralCentralItem + 1})
            } else {
               setItemAmount(prev => prev = {...prev, centralUpperItem: prev.centralUpperItem + 1})
            }
            break
         default:
            if (values.level === levelType1) {
               setItemAmount(prev => prev = {...prev, rightBottomItem: prev.rightBottomItem + 1})
            } else if(values.level === levelType2) {
               setItemAmount(prev => prev = {...prev, rightCentralItem: prev.rightCentralItem + 1})
            } else {
               setItemAmount(prev => prev = {...prev, rightUpperItem: prev.rightUpperItem + 1})
            }
            break
      } 
      setItemAmount(prev => prev = {...prev, allItem: prev.allItem + 1})
   }

   function subtractCount(section) {
      let value = section.initialValues
      switch (value.side) {
         case sideType1:
            if (value.level === levelType1) {
               setItemAmount(prev => prev = {...prev, leftBottomItem: prev.leftBottomItem - 1})
            } else if(value.level === levelType2) {
               setItemAmount(prev => prev = {...prev, leftCentralItem: prev.leftCentralItem - 1})
            } else {
               setItemAmount(prev => prev = {...prev, leftUpperItem: prev.leftUpperItem - 1})
            }
            break
         case sideType2:
            if (value.level === levelType1) {
               setItemAmount(prev => prev = {...prev, centralBottomItem: prev.centralBottomItem - 1})
            } else if(value.level === levelType2) {
               setItemAmount(prev => prev = {...prev, centralCentralItem: prev.centralCentralItem - 1})
            } else {
               setItemAmount(prev => prev = {...prev, centralUpperItem: prev.centralUpperItem - 1})
            }
            break
         default:
            if (value.level === levelType1) {
            setItemAmount(prev => prev = {...prev, rightBottomItem: prev.rightBottomItem - 1})
         } else if(value.level === levelType2) {
            setItemAmount(prev => prev = {...prev, rightCentralItem: prev.rightCentralItem - 1})
         } else {
            setItemAmount(prev => prev = {...prev, rightUpperItem: prev.rightUpperItem - 1})
         }
      }
      setItemAmount(prev => prev = {...prev, allItem: prev.allItem - 1})
   }

   const addSection = (e) => {
      e.preventDefault()
      let arrFurniture = []
      let arrService = []
      values.level === levelType1
         ? values.sectionType = values.bottomType
         : values.sectionType = values.upperType
      let sectionDimensions = new SectionDimensions(values, checkboxes, indentValues, prevDepth.current, sectionId)
      let section = sectionDimensions.createSection();
      setSections([...sections, section])

      for (let key in section.furnitures) {
         if (furniture[key]) {
            furniture[key].value += section.furnitures[key].value
         } else {
            furniture[key] = section.furnitures[key]
         }
      }
      for (let key in furniture) {
         arrFurniture.push(furniture[key])
      }
      setFurnitures(arrFurniture)

      for (let key in section.services) {
         allService[key].value += section.services[key].value
      }
      for (let key in allService) {
         arrService.push(allService[key])
      }
      setServices(arrService)
      
      prevDepth.current = values.depth
      setSectionId(sectionId + 1)
      values.level !== levelType1
         ? values.shelves = 0 
         : changeBottomType()
      
      addCount()
   }

   const deleteSection = (e) => {
      e.preventDefault()
      let arrFurniture = []
      let arrService = []
      let section = sections[sections.length - 1]
      
      for (let key in section.furnitures) {
            furniture[key].value -= section.furnitures[key].value
      }
      for (let key in furniture) {
         arrFurniture.push(furniture[key])
      }
      setFurnitures(arrFurniture)

      for (let key in section.services) {
         allService[key].value -= section.services[key].value
      }
      for (let key in allService) {
         arrService.push(allService[key])
      }
      setServices(arrService)

      setSections(sections.filter((_, i) => i !== (sections.length - 1)))
      setSectionId(sectionId - 1)

      subtractCount(section)
   }

   return (
      <div className={props.class + section1FormClass}>
         <GlobalOptions className={props.class} value={values} setValue={setValues} title={props.title} />
         <LevelOptions className={props.class} value={values} setValue={setValues} title={props.title1} />
         <LocalOptions className={props.class} value={values} setValue={setValues} inputAtributes={inputAtributes} hides={hides} checkboxes={checkboxes} />
         <ChangeableOptions className={props.class} value={values} setValue={setValues} hides={hides} checkboxes={checkboxes} onChange={change} selectChange={changeDish} />
         <SideOptions className={props.class} value={values} setValue={setValues} />
         <div className={props.class + section1BtnClass}>
            <MyButton color={addBtnColor} onClick={addSection}>Додати</MyButton>
            <MyButton color={delBtnColor} onClick={deleteSection}>Видалити</MyButton>
         </div>
         <ItemTable className={props.class} itemAmount={itemAmount} level={values.topLevel} title={props.title2} />
      </div>
   );
}