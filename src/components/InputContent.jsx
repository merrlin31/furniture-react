import { useEffect } from "react";
import { useState } from "react";
import { MyInput } from "./UI/MyInput/MyInput";
import { MySelect } from "./UI/MySelect/MySelect";
import { globalOptions, global, local, tier, option, items, tierBottomOptions, 
   tierTopOptions, tierAmount, createFrontOpeningList } from "./properties/inputProperties";
import { MyButton } from "./UI/MyButton/MyButton";
import { ItemTable } from "./ItemTable";

export const InputContent = (props) => {
   const [values, setValues] = useState({
      body: 27050,
      front: 27050,
      dvp: 28887,
      tabletop: 148271,
      tabletopThickness: 38,
      heightKitchen: 2500,
      heightDownSection: 900,
      heightMiddleSection: 0,
      heightUpSection: '',
      plinth: 100,
      length: 3050,
      material: 'dsp',
      topLevel: '1',
      level: 'downSection',
      bottomType: 'originalBottomSection',
      upperType: 'originalTopSection',
      width: 600,
      depth: 600,
      frontAmount: 1,
      shelves: 0,
      neighboringWidth: 600,
      drawers: 0,
      frontOpening: 'handle',
      dishwasherSize: 600,
      side: 'left'
   })

   const [itemAmount, setItemAmount] = useState({
      allItem: 0,
      leftBottomItem: 0,
      leftCentralItem: 0,
      leftUpperItem: 0,
      centralBottomItem: 0,
      centralCentralItem: 0,
      centralUpperItem: 0,
      rightBottomItem: 0,
      rightCentralItem: 0,
      rightUpperItem: 0,
   })

   const [checkboxes, setCheckboxes] = useState({
      sink: false,
      visibleSide: false,
      kargo: false,
      oven: false,
      microwave: false,
      hob: false,
      fridge: false,
      dish: false,
      dishwasher: false,
      backlight:false
   })

   const [inputAtributes] = useState([
      {id: 'width', max: 1200, min: 0, readOnly:false},
      {id: 'depth', max: 600, min: 0, readOnly:false},
      {id: 'frontAmount', max: 2, min: 1, readOnly:false},
      {id: 'shelves', max: 6, min: 1, step: 1, readOnly:false},
      {id: 'neighboringWidth', max: 600, readOnly:false},
      {id: 'drawers', max: 6, min: 0, step: 1, readOnly:false},
      {id: 'frontOpening', options: createFrontOpeningList('gola', 'Gola')}
   ])

   const findObj = (id, attribute) => { 
      let target = inputAtributes.find(obj => obj.id === id)[attribute]
      return target
   }

   const [hides, setHides] = useState({
      sink: false,
      visibleSide: false,
      kargo: false,
      oven: false,
      microwave: true,
      hob: false,
      fridge: true,
      dish: true,
      dishwasher: false,
      backlight: true,
      neighboringWidth: true,
      drawers: false
   })

   const localOptions = [
      {name: 'Ширина секції', type: 'number', id: 'width', attribute: {max: findObj('width', 'max'), min: findObj('width', 'min'), readOnly: findObj('width', 'readOnly')}, className: local + '__item'},
      {name: 'Глибина секції', type: 'number', id: 'depth', attribute: {max: findObj('depth', 'max'), min: findObj('depth', 'min'), readOnly: findObj('depth', 'readOnly')}, className: local + '__item'},
      {name: 'Кіл-ть розпашних фасадів', type: 'number', id: 'frontAmount', attribute: {max: findObj('frontAmount', 'max'), min: findObj('frontAmount', 'min'), readOnly: findObj('frontAmount', 'readOnly')}, className: local + '__item'},
      {name: 'Кіл-ть поличок', type: 'number', id: 'shelves', attribute: {max: findObj('shelves', 'max'), min: findObj('shelves', 'min'), step: findObj('shelves', 'step'), readOnly: findObj('shelves', 'readOnly')}, className: local + '__item'},
      {name: 'Глибина сусідньої секції', type: 'number', id: 'neighboringWidth', attribute: {max: findObj('neighboringWidth', 'max'), readOnly: findObj('neighboringWidth', 'readOnly')}, className: option + '__item', hide: hides.neighboringWidth},
      {name: 'Кіл-ть висувних ящиків', type: 'number', id: 'drawers', attribute: {max: findObj('drawers', 'max'), min: findObj('drawers', 'min'), step: findObj('drawers', 'step'), readOnly: findObj('drawers', 'readOnly')}, className: option + '__item', hide: hides.drawers},
      {name: 'Відкривання фасадів', select: 'frontOpening', options: findObj('frontOpening', 'options'), defaulValue: 'Оберіть кіл-ть ярусів', className: local + '__item'},
   ]

   const side = {
      name: 'Стіна', select: 'side', id: 'side', options: [
         {value: 'left', name: 'Ліва'},
         {value: 'center', name: 'Центральна'},
         {value: 'right', name: 'Права'},
      ], defaulValue: 'Оберіть стіну', className: `${props.class}__side`
   }

   const change = (e) => setCheckboxes({...checkboxes, [e.target.id]: e.target.checked})

   useEffect(() => {
      values.bottomType = 'originalBottomSection'
      values.upperType = 'originalTopSection'
      setCheckboxes({
         sink: false,
         visibleSide: false,
         kargo: false,
         oven: false,
         microwave: false,
         hob: false,
         fridge: false,
         dish: false,
         dishwasher: false,
         backlight:false
      })
      if (values.level === 'upSection' || values.level === 'centralSection') {
         inputAtributes.find(obj => obj.id === 'frontOpening').options = createFrontOpeningList('longerFront', 'Довший фасад')
         inputAtributes.forEach(item => item.readOnly = false)
         setHides({...hides, sink: true, visibleSide: true, kargo: true, oven: true, microwave: true,
            hob: true, fridge: true, dishwasher: true, neighboringWidth: true, drawers: true, dish: false, backlight:false
         })
         setValues({...values, drawers: 0, shelves: 0, depth: 300, neighboringWidth: 300, side: 'left'})
         inputAtributes.find(obj => obj.id === 'depth').min = 200
      } else {
         inputAtributes.find(obj => obj.id === 'frontOpening').options = createFrontOpeningList('gola', 'Gola')
         setHides({...hides, microwave: true, fridge: true, dish: true, backlight: true, neighboringWidth: true, 
            sink: false, visibleSide: false, kargo: false, oven: false, hob: false, dishwasher: false, drawers: false,
         })
         setValues({...values, drawers: 0, shelves: 0, depth: 600, neighboringWidth: 600, side: 'left'})
         inputAtributes.find(obj => obj.id === 'drawers').max = 6
         inputAtributes.find(obj => obj.id === 'shelves').min = 0
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.level])

   useEffect(() => {
      inputAtributes.forEach(item => item.readOnly = false)
      inputAtributes.find(obj => obj.id === 'shelves').min = 0
      inputAtributes.find(obj => obj.id === 'drawers').max = 6
      inputAtributes.find(obj => obj.id === 'depth').min = 200
      setValues({...values, drawers: 0, shelves: 0})
      setCheckboxes({
         sink: false,
         visibleSide: false,
         kargo: false,
         oven: false,
         microwave: false,
         hob: false,
         fridge: false,
         dish: false,
         dishwasher: false,
         backlight:false
      })
      if (values.bottomType === 'originalBottomSection') {
         setHides({
         sink: false,
         visibleSide: false,
         kargo: false,
         oven: false,
         microwave: true,
         hob: false,
         fridge: true,
         dish: true,
         dishwasher: false,
         backlight: true,
         neighboringWidth: true,
         drawers: false
         })
      } else if (values.bottomType === 'cornerBottomSection') {
         setHides({
            sink: false,
            visibleSide: false,
            kargo: true,
            oven: true,
            microwave: true,
            hob: false,
            fridge: true,
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: false,
            drawers: true
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
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: true,
            drawers: false
         })
         inputAtributes.find(obj => obj.id === 'shelves').min = 1
         inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = true
         setValues({...values, drawers: 0, shelves: 1, frontAmount: 1})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.bottomType])

   useEffect(() => {
      setValues({...values, shelves: 0})
      inputAtributes.find(obj => obj.id === 'shelves').min = 0
      setCheckboxes({...checkboxes, dish: false})
      if (values.upperType === 'originalTopSection' || values.upperType === 'cornerJoinSection') {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: true,
            microwave: true,
            hob: true,
            fridge: true,
            dish: false,
            dishwasher: true,
            backlight: false,
            neighboringWidth: true,
            drawers: true
         })
      } else if (values.upperType === 'cornerTopSection') {
         setHides({
            sink: true,
            visibleSide: true,
            kargo: true,
            oven: true,
            microwave: true,
            hob: true,
            fridge: true,
            dish: false,
            dishwasher: true,
            backlight: false,
            neighboringWidth: false,
            drawers: true
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
            dish: true,
            dishwasher: true,
            backlight: true,
            neighboringWidth: true,
            drawers: true
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.upperType])

   useEffect(() => {
      setCheckboxes({...checkboxes, kargo: false})
      if (values.shelves > 0 && values.bottomType !== 'cupboardSection') {
         setValues({...values, drawers: 0})
         inputAtributes.find(obj => obj.id === 'drawers').readOnly = true
         setHides({...hides, kargo: true})
      } else {
         if (values.bottomType !== 'cupboardSection') {
            inputAtributes.find(obj => obj.id === 'drawers').readOnly = false
            setHides({...hides, kargo: false})
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.shelves])

   useEffect(() => {
      if (values.drawers > 0) {
         inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = true
         setValues({...values, frontAmount: 1})
         if (values.bottomType !== 'cupboardSection') {
            inputAtributes.find(obj => obj.id === 'shelves').readOnly = true
            setValues({...values, frontAmount: 1, shelves: 0})
            if (values.drawers > 1) {
               setCheckboxes({...checkboxes, oven: false})
               setHides({...hides, kargo: true, dishwasher: true, oven: true})
            } else {
               setHides({...hides, kargo: true, dishwasher: true, oven: false})
            }
         }
      } else {
            if (values.bottomType !== 'cupboardSection') {
               inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = false
               inputAtributes.find(obj => obj.id === 'shelves').readOnly = false
               setHides({...hides, kargo: false, dishwasher: false})
            }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.drawers])
   
   useEffect(() => {
      if (checkboxes.sink) {
         setHides({...hides, oven: true, kargo: true, dishwasher: true, hob: true})
      } else {
         values.bottomType === 'originalBottomSection'
         ? setHides({...hides, oven: false, kargo: false, dishwasher: false, hob: false})
         : setHides({...hides, hob: false})
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.sink])

   useEffect(() => {
      if (checkboxes.kargo) {
         setValues({...values, drawers: 0, shelves: 0, frontAmount: 1})
         setHides({...hides, oven: true, sink: true, drawers: true, dishwasher: true})
         inputAtributes.find(obj => obj.id === 'shelves').readOnly = true
         inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = true
      } else {
         setHides({...hides, oven: false, sink: false, drawers: false, dishwasher: false})
         inputAtributes.find(obj => obj.id === 'shelves').readOnly = false
         inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = false
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.kargo])

   useEffect(() => {
      if (checkboxes.oven) {
         setValues({...values, width: 600})
         inputAtributes.find(obj => obj.id === 'width').readOnly = true
         if (values.bottomType !== 'cupboardSection') {
            setValues({...values, width: 600, depth: 600, drawers: 1, shelves: 0, frontAmount: 1})
            inputAtributes.find(obj => obj.id === 'depth').readOnly = true
            inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = true
            inputAtributes.find(obj => obj.id === 'shelves').readOnly = true
            inputAtributes.find(obj => obj.id === 'drawers').readOnly = false
            inputAtributes.find(obj => obj.id === 'drawers').max = 1
            setHides({...hides, sink: true, kargo: true, dishwasher: true})
         } else {
            setHides({...hides, fridge: true})
            inputAtributes.find(obj => obj.id === 'depth').min = 580
         }
      } else {
         inputAtributes.find(obj => obj.id === 'drawers').max = 6
         if (values.bottomType !== 'cupboardSection') {
            inputAtributes.find(obj => obj.id === 'width').readOnly = false
            inputAtributes.find(obj => obj.id === 'depth').readOnly = false
            inputAtributes.find(obj => obj.id === 'frontAmount').readOnly = false
            inputAtributes.find(obj => obj.id === 'shelves').readOnly = false
            setHides({...hides, sink: false, kargo: false, dishwasher: false})
         } else {
            if (!checkboxes.microwave) {
               inputAtributes.find(obj => obj.id === 'depth').min = 200
               inputAtributes.find(obj => obj.id === 'width').readOnly = false
               setHides({...hides, fridge: false})
            }
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.oven])

   useEffect(() => {
      if (checkboxes.microwave) {
         setValues({...values, width: 600})
         inputAtributes.find(obj => obj.id === 'width').readOnly = true
         setHides({...hides, fridge: true})
         inputAtributes.find(obj => obj.id === 'depth').min = 580
      } else {
         if (!checkboxes.oven) {
            inputAtributes.find(obj => obj.id === 'depth').min = 200
            inputAtributes.find(obj => obj.id === 'width').readOnly = false
            setHides({...hides, fridge: false})
         }
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.microwave])

   useEffect(() => {
      if (checkboxes.hob) {
         setHides({...hides, microwave: true, sink: true})
         setValues({...values, depth: 600})
         inputAtributes.find(obj => obj.id === 'depth').readOnly = true
      } else {
         setHides({...hides, sink: false})
         inputAtributes.find(obj => obj.id === 'depth').readOnly = false
         if (values.bottomType === 'originalBottomSection') {
            setHides({...hides, microwave: false, sink: false})
         }
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.hob])

   useEffect(() => {
      if (checkboxes.fridge) {
         setValues({...values, width: 600, drawers: 0})
         setHides({...hides, oven: true, microwave: true, drawers: true})
         inputAtributes.find(obj => obj.id === 'depth').min = 580
         inputAtributes.find(obj => obj.id === 'width').readOnly = true
      } else {
         setHides({...hides, oven: false, microwave: false, drawers: false})
         inputAtributes.find(obj => obj.id === 'depth').min = 200
         inputAtributes.find(obj => obj.id === 'width').readOnly = false
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.fridge])

   useEffect(() => {
      if (checkboxes.dishwasher) {
         inputAtributes.forEach(item => item.readOnly = true)
         setValues({...values, width: values.dishwasherSize, depth: 600, drawers: 0, shelves: 0, frontAmount: 1})
         setHides({...hides, oven: true, sink: true, kargo: true, drawers: true, hob: true})
      } else {
         inputAtributes.forEach(item => item.readOnly = false)
         setHides({...hides, oven: false, sink: false, kargo: false, drawers: false, hob: false})
      }  
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkboxes.dishwasher])

   const changeableOptions = [
      {name: 'Мийка', type: 'checkbox', id: 'sink', className: option + '__item', hide: hides.sink, attribute: {checked: checkboxes.sink}},
      {name: 'Видима боковина', type: 'checkbox', id: 'visibleSide', className: option + '__item', hide: hides.visibleSide, attribute: {checked: checkboxes.visibleSide}},
      {name: 'Карго', type: 'checkbox', id: 'kargo', className: option + '__item', hide: hides.kargo, attribute: {checked: checkboxes.kargo}},
      {name: 'Вбудована духова шафа', type: 'checkbox', id: 'oven', className: option + '__item', hide: hides.oven, attribute: {checked: checkboxes.oven}},
      {name: 'Вбудована мікрохвильова пічь', type: 'checkbox', id: 'microwave', className: option + '__item', hide: hides.microwave, attribute: {checked: checkboxes.microwave}},
      {name: 'Варильна поверхня', type: 'checkbox', id: 'hob', className: option + '__item', hide: hides.hob, attribute: {checked: checkboxes.hob}},
      {name: 'Вбудований холодильник', type: 'checkbox', id: 'fridge', className: option + '__item', hide: hides.fridge, attribute: {checked: checkboxes.fridge}},
      {name: 'Сушка', type: 'checkbox', id: 'dish', className: option + '__item', hide: hides.dish, attribute: {checked: checkboxes.dish}},
      {name: 'Підсвічування', type: 'checkbox', id: 'backlight', className: option + '__item', hide: hides.backlight, attribute: {checked: checkboxes.backlight}},
      {name: 'Посудомийка', type: 'checkbox', id: 'dishwasher', className: option + '__item', hide: hides.dishwasher, attribute: {checked: checkboxes.dishwasher}, 
         bind: {select: 'dishwasherSize', options: [
            {value: 600, name: 600},
            {value: 450, name: 450},
         ], defaulValue: 'ширина посудомийки', className: local + '__item', hide: false} },
   ]

   const [tierOptions, setTierOptions] = useState({defaulValue: 'Оберіть ярус',
      className: `${props.class}__${tier} ${tier}`,
      options: []
   })

   useEffect(() => {
      if (values.topLevel === '1') {
         setTierOptions({...tierOptions, options: [
            {value: 'downSection', name: 'Нижня шафа'},
            {value: 'upSection', name: 'Верхня шафа'},
         ]})
         values.heightMiddleSection = 0
      } else {
         setTierOptions({...tierOptions, options: [
            {value: 'downSection', name: 'Нижня шафа'},
            {value: 'centralSection', name: 'Середня шафа'},
            {value: 'upSection', name: 'Верхня шафа'},
         ]})
         values.heightMiddleSection = 600
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.topLevel])

   useEffect(() => {
      setValues({...values, heightUpSection: values.heightKitchen - values.heightDownSection - 600 - values.heightMiddleSection})
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [values.heightKitchen, values.heightDownSection, values.heightMiddleSection])

   return (
      <div className={`${props.class}__form`}>
         <h2 className={`${props.class}__title`}>{props.title}</h2>
         <div className={`${props.class}__dimensions ${global}`}>
            {globalOptions.map((option, index) => 
               option.hasOwnProperty('type') 
               ? <MyInput option={option}  
                  key={index} value={values[option.id]} onChange={e => setValues({...values, [option.id]: +e.target.value})} />
               : <MySelect options={option} 
                  key={index} value={values[option.select]} onChange={(value) => setValues({...values, [option.select]: value})} />   
            )}
         </div>
         <h2 className={`${props.class}__title`}>{props.title1}</h2>
         <MySelect className ={`${props.class}__${tier} ${tier}`} options={tierAmount} 
            value={values.topLevel} onChange={(value) => setValues({...values, topLevel: value})} />
         <MySelect className ={`${props.class}__${tier} ${tier}`} options={tierOptions} 
            value={values.level} onChange={(value) => setValues({...values, level: value})} />
         {values.level === 'downSection'
            ? <MySelect className ={`${tier}__bottom`} options={tierBottomOptions} 
            value={values.bottomType} onChange={(value) => setValues({...values, bottomType: value})} />
            : <MySelect className ={`${tier}__top`} options={tierTopOptions} 
            value={values.upperType} onChange={(value) => setValues({...values, upperType: value})} />
         }
         <div className={`${props.class}__dimensions ${local}`}>
            {localOptions.map((option, index) => 
               option.hasOwnProperty('type') 
               ? option.hide
                  ? ''
                  : <MyInput option={option}  
                     key={index} value={values[option.id]} onChange={e => setValues({...values, [option.id]: +e.target.value})} />
               : <MySelect options={option} 
                  key={index} value={values[option.select]} onChange={(value) => setValues({...values, [option.select]: value})} />   
            )}
         </div>
         <div className={`${props.class}__${option}`}>
            {changeableOptions.map((option) => 
               option.bind 
               ? option.hide
                  ? ''
                  : <MyInput option={option} key={option.id} onChange={change}>
                        <select className="dishwasher-select" value={values.dishwasherSize} 
                        onChange={e => setValues({...values, dishwasherSize: e.target.value, width: e.target.value})}>
                           <option disabled value='value1'>{option.bind.defaulValue}</option>
                           {option.bind.options.map(option =>
                              <option key={option.value} value={option.value}>
                                 {option.name}
                              </option>
                           )}
                        </select>
                     </MyInput>
               : option.hide
                  ? ''
                  : <MyInput option={option} key={option.id} onChange={change} />   
            )}
         </div>
         <MySelect options={side} value={values.side} onChange={(value) => setValues({...values, side: value})} />
         <div className={`${props.class}__button`}>
            <MyButton color={'green'}>Додати</MyButton>
            <MyButton color={'brown'}>Видалити</MyButton>
         </div>
         <div className={`${props.class}__${items} ${items}`}>
            <h2 className={`${props.class}__title`}>{props.title2}</h2>
            <ItemTable className={items} itemAmount={itemAmount} />
         </div>
      </div>
   );
}