export const global = 'global'
export const local = 'local'
export const tier = 'tier'
export const option = 'option'
export const items = 'items'

export const globalOptions = [
   {name: 'Матеріал корпуса', type: 'number', id: 'body', className: global + '__item'},
   {name: 'Матеріал фасаду', type: 'number', id: 'front', className: global + '__item'},
   {name: 'Матеріал ДВП', type: 'number', id: 'dvp', className: global + '__item'},
   {name: 'Матеріал фасаду', select: 'material', options: [
      {value: 'dsp', name: 'ДСП'},
      {value: 'mdf', name: 'МДФ'},
   ], defaulValue: 'Оберіть матеріал', className: global + '__item'},
   {name: 'Матеріал стільниці', type: 'number', id: 'tabletop', className: global + '__item'},
   {name: 'Товщина стільниці', type: 'number', id: 'tabletopThickness', className: global + '__item'},
   {name: 'Довжина стільниці', select: 'lenght', options: [
      {value: 3050, name: 3050},
      {value: 4100, name: 4100},
   ], defaulValue: 'Оберіть довжину', className: global + '__item'},
   {name: 'Висота кухні', type: 'number', id: 'heightKitchen', className: global + '__item'},
   {name: 'Висота нихніх шаф', type: 'number', id: 'heightDownSection', className: global + '__item'},
   {name: 'Висота середніх шаф', type: 'number', id: 'heightMiddleSection', className: global + '__item'},
   {name: 'Висота верхніх шаф', type: 'number', id: 'heightUpSection', attribute: {readOnly: true}, className: global + '__item'},
   {name: 'Висота цоколя', type: 'number', id: 'plinth', className: global + '__item'},
   
]

export const tierTopOptions = {defaulValue: 'Оберіть тип',
   className: `${tier}__top`,
   options: [
      {value: 'originalTopSection', name: 'Звичайна шафа'},
      {value: 'hoodSection', name: 'Шафа з витяжкою'},
      {value: 'cornerTopSection', name: 'Кутова шафа'},
      {value: 'cornerJoinSection', name: 'Кутова шафа з фальш-панелю'},
   ]
}

export const tierBottomOptions = {defaulValue: 'Оберіть тип',
   className: `${tier}__bottom`,
   options: [
      {value: 'originalBottomSection', name: 'Звичайна шафа'},
      {value: 'cornerBottomSection', name: 'Кутова шафа'},
      {value: 'cupboardSection', name: 'Велика шафа'},
   ]
}

export const tierAmount = {defaulValue: 'Оберіть кіл-ть ярусів',
className: tier + '__amount', name: 'Кіл-ть верхніх ярусів',
options: [
   {value: 1, name: 1},
   {value: 2, name: 2},
   ]
}

export function createFrontOpeningList(value, item) {
   let opening = [
      {value: 'handle', name: 'Ручка'},
      {value: 'push', name: 'Push to open'},
      {value: value, name: item}
   ]
   return opening
}