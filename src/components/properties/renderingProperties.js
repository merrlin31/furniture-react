import { frontOpeningType1, frontOpeningType4, levelType1, levelType2, sectionBottomType1, sectionBottomType2, sectionBottomType3, sideType1, sideType2, sideType3 } from "../../utils/description"

const hobColor = 'black'
const sinkColor = 'grey'
const tabletopColor = 'yellow'
const golaColor = '#000'
const frontColor = '#fff'
const golaIndent = 30
const hobWidth = 560
const hobDepth = 490
const sinkWidth = 520
const sinkDepth = 490
const handleLength = 128

const startX = 4000
const startY = 3000
const coords = {
   start: {x: 0, y: 0},
   lB: {x: startX, y: startY},
   lU: {x: startX, y: startY},
   lM: {x: startX, y: startY},
   cB: {x: startX, y: startY},
   cU: {x: startX, y: startY},
   cM: {x: startX, y: startY},
   rB: {x: startX, y: startY},
   rU: {x: startX, y: startY},
   rM: {x: startX, y: startY},
}
const scale = {x: 1/10, y: 1/10}
const inclinationAngle = Math.PI / 6
const isSimpleBottomSection = false

let ctx
const level = {
   leftBottomSections: [],
   leftUpperSections: [],
   leftMezzanineSections: [],
   centralBottomSections: [],
   centralUpperSections: [],
   centralMezzanineSections: [],
   rightBottomSections: [],
   rightUpperSections: [],
   rightMezzanineSections: [],
}

export function draw(sections, context) {
   sortLevels(sections)
   ctx = context
   ctx.translate(coords.start.x, coords.start.y)
   ctx.lineWidth = 5
   ctx.strokeStyle = 'black'
   ctx.scale(scale.x, scale.y)
   ctx.save()
   if (level.leftBottomSections.length > 0) drawLeftBottomLevel(level.leftBottomSections)
}

function sortLevels(sections) {
   for (let key in level) {
      level[key] = []
   }
   sections.forEach(section => {
      switch (section.initialValues.values.level) {
         case levelType1:
            if (section.initialValues.values.side === sideType1) level.leftBottomSections.push(section)
            if (section.initialValues.values.side === sideType2) level.centralBottomSections.push(section)
            if (section.initialValues.values.side === sideType3) level.rightBottomSections.push(section)
            break;
         case levelType2:
            if (section.initialValues.values.side === sideType1) level.leftUpperSections.push(section)
            if (section.initialValues.values.side === sideType2) level.centralUpperSections.push(section)
            if (section.initialValues.values.side === sideType3) level.rightUpperSections.push(section)
            break;
         default:
            if (section.initialValues.values.side === sideType1) level.leftMezzanineSections.push(section)
            if (section.initialValues.values.side === sideType2) level.centralMezzanineSections.push(section)
            if (section.initialValues.values.side === sideType3) level.rightMezzanineSections.push(section)
            break;
      }
   });
}

function drawLeftBottomLevel(sections) {
   let depth = 0
   // let leftBottomWidth = 0
   sections.forEach(section => {
      if (section.initialValues.values.depth > depth) depth = section.initialValues.values.depth
      // leftBottomWidth += section.initialValues.values.width
   })
   coords.lB.x += depth
   // coords.lB.x -= leftBottomWidth
   // coords.lB.y += leftBottomWidth * Math.tan(inclinationAngle)

   ctx.translate(coords.lB.x, coords.lB.y)
   sections.slice().reverse().forEach(section => {
      const values = section.initialValues
      switch (values.values.sectionType) {
         case sectionBottomType1:
               drawOriginalSection(values)
            break;
         case sectionBottomType2:
               drawCornerJoinSection(values, depth)
            break;
         case sectionBottomType3:
               drawCornerSection(values, depth)
            break;
         default:
               drawCupboardSection(values, depth)
            break;
      }
   });
   coords.lB = {x: startX, y: startY}
   ctx.restore()
}

function drawOriginalSection(values) {
   let gola = (values.values.frontOpening === frontOpeningType4) ? golaIndent : 0
   drawLeftSide(values.values)
   drawPlinth(values.values)
   drawBottom(values.values)
   if (values.checkboxes.withoutFront) {
      drawingShelves(values.values)
   } else {
      values.values.drawers > 0 
      ? drawingDrawerFronts(values.values, gola, values.checkboxes.oven)
      : drawingFronts(values.values, gola)
   }
   drawTabletop(values.values)
   ctx.translate(-values.values.width, values.values.width * Math.tan(inclinationAngle))
   drawLeftSide(values.values)
   if (values.checkboxes.hob) drawHob(values.values)
   if (values.checkboxes.sink) drawSink(values.values)
}

function drawCornerJoinSection(values) {
   let gola = (values.values.frontOpening === frontOpeningType4) ? golaIndent : 0
   let falseWidth = values.values.neighboringWidth - values.constants.indentFrontBody + 
      values.constants.indentBotFalseFront
   drawLeftSide(values.values)
   drawPlinth(values.values)
   drawBottom(values.values)
   if (values.checkboxes.withoutFront) {
      drawingShelves(values.values)
   } else {
      ctx.translate(-falseWidth, falseWidth * Math.tan(inclinationAngle))
      drawingFronts(values.values, gola, falseWidth)
      ctx.translate(falseWidth, -falseWidth * Math.tan(inclinationAngle))
   }
   drawFalse(values.values, falseWidth)
   drawTabletop(values.values)
   ctx.translate(-values.values.width, values.values.width * Math.tan(inclinationAngle))
   drawLeftSide(values.values)
   if (values.checkboxes.hob) drawHob(values.values)
   if (values.checkboxes.sink) drawSink(values.values)
}

function drawCornerSection(values) {
   // switch (values.side) {
   //    case sideType1:
   //       break;
   //    case sideType2:
   //       break;
   //    default:
   //       break;
   // }
   let gola = (values.values.frontOpening === frontOpeningType4) ? golaIndent : 0
   let falseWidth = values.values.neighboringWidth
   let secondFalseWidth = values.values.depth - values.prevDepth   
   drawLeftSide(values.values, values.prevDepth)
   drawPlinth(values.values)
   ctx.translate(secondFalseWidth - values.prevDepth, values.prevDepth * Math.tan(inclinationAngle))
   drawCornerBottom(values.values, secondFalseWidth)
   drawSecondPlinth(values.values, secondFalseWidth)
   if (values.checkboxes.withoutFront) {
      drawingShelves(values.values, secondFalseWidth)
   } else {
      ctx.translate(-secondFalseWidth, 0)
      drawingFronts(values.values, gola, falseWidth, secondFalseWidth)
      ctx.translate(secondFalseWidth, 0)
   }
   drawCentralSide(values.values, values.prevDepth)

   ctx.translate(-secondFalseWidth + falseWidth, -falseWidth * Math.tan(inclinationAngle))
   drawTabletop(values.values, values.prevDepth)
   ctx.translate(secondFalseWidth, 0)
   drawTabletop(values.values, secondFalseWidth, falseWidth)

   ctx.translate(-secondFalseWidth - values.values.width, values.values.width * Math.tan(inclinationAngle))
   drawLeftSide(values.values, values.prevDepth)
   if (values.checkboxes.hob) drawHob(values.values, values.prevDepth)
   if (values.checkboxes.sink) drawSink(values.values, values.prevDepth)
}
function drawCupboardSection(values) {
   let gola = (values.values.frontOpening === frontOpeningType4) ? golaIndent : 0
   drawLeftSide(values.values, values.values.depth, values.values.heightKitchen)
   drawPlinth(values.values)
   drawBottom(values.values)
   drawBottom(values.values, values.values.heightKitchen - values.values.plinth)
   

   if (values.checkboxes.withoutFront) {
      drawingShelves(values.values)
   } else {
      values.values.drawers > 0 
      ? drawingDrawerFronts(values.values, gola, values.checkboxes.oven)
      : drawingFronts(values.values, gola)
   }

   drawBottom(values.values, values.values.heightDownSection - values.values.tabletopThickness - values.values.plinth)
   ctx.translate(-values.values.width, values.values.width * Math.tan(inclinationAngle))
   drawLeftSide(values.values, values.values.depth, values.values.heightKitchen)
}


function drawLeftSide(values, depth = values.depth, height=(values.heightDownSection - values.tabletopThickness)) {
   ctx.fillStyle = '#FF5733'
   ctx.fillRect(0, 0, -depth, -(height))
   ctx.strokeRect(0, 0, -depth, -(height))
}
function drawCentralSide(values, depth = values.depth) {
   ctx.fillStyle = '#FF5733'
   ctx.beginPath()
   ctx.moveTo(0, 0)
   ctx.lineTo(depth, -depth * Math.tan(inclinationAngle))
   ctx.lineTo(depth, -(values.heightDownSection - values.tabletopThickness) - depth * Math.tan(inclinationAngle))
   ctx.lineTo(0, -(values.heightDownSection - values.tabletopThickness))
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}
function drawPlinth(values) {
   ctx.fillStyle = '#FF5733'
   ctx.beginPath()
   ctx.moveTo(0, 0)
   ctx.lineTo(0, -(values.plinth));
   ctx.lineTo(-values.width, values.width * Math.tan(inclinationAngle) - (values.plinth));
   ctx.lineTo(-values.width, values.width * Math.tan(inclinationAngle));
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}
function drawSecondPlinth(values, width=values.width) {
   ctx.fillStyle = '#FF5733'
   ctx.beginPath()
   ctx.moveTo(0, 0)
   ctx.lineTo(0, -values.plinth);
   ctx.lineTo(-width, -values.plinth);
   ctx.lineTo(-width, 0);
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}
function drawBottom(values, distance=0) {
   ctx.fillStyle = '#FF5733'
   ctx.translate(0, -distance)
   ctx.beginPath()
   ctx.moveTo(0, -values.plinth)
   ctx.lineTo(-values.width, values.width * Math.tan(inclinationAngle) - values.plinth)
   ctx.lineTo(-values.width - values.depth, values.width * Math.tan(inclinationAngle) - values.plinth)
   ctx.lineTo(-values.depth, -values.plinth)
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
   ctx.translate(0, distance)
}
function drawCornerBottom(values, secondFalseWidth, distance=0) {
   ctx.fillStyle = '#FF5733'
   ctx.translate(0, -distance)
   ctx.beginPath()
   ctx.moveTo(0, -values.plinth)
   ctx.lineTo(values.neighboringWidth, -values.neighboringWidth * Math.tan(inclinationAngle) - values.plinth)
   ctx.lineTo(values.neighboringWidth - values.depth, -values.neighboringWidth * Math.tan(inclinationAngle) - values.plinth)
   ctx.lineTo(values.neighboringWidth - values.depth - values.width, -values.neighboringWidth * Math.tan(inclinationAngle) - values.plinth + values.width * Math.tan(inclinationAngle))
   ctx.lineTo(values.neighboringWidth - secondFalseWidth - values.width, -values.neighboringWidth * Math.tan(inclinationAngle) - values.plinth + values.width * Math.tan(inclinationAngle))
   ctx.lineTo(-secondFalseWidth, -values.plinth)
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
   ctx.translate(0, distance)
}
function drawFalse(values, falseWidth) {
   ctx.fillStyle = '#FF5733'
   ctx.beginPath()
   ctx.moveTo(0, -(values.plinth))
   ctx.lineTo(0, -(values.heightDownSection - values.tabletopThickness))
   ctx.lineTo(-falseWidth, -(values.heightDownSection - values.tabletopThickness) + falseWidth * Math.tan(inclinationAngle))
   ctx.lineTo(-falseWidth, falseWidth * Math.tan(inclinationAngle) - (values.plinth))
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}

function drawingShelves(values, secondFalseWidth) {
   let distance = (values.heightDownSection - values.tabletopThickness - values.plinth) / (values.shelves + 1)
   let step = distance
   for (let i = 0; i < values.shelves; i++) {
      secondFalseWidth 
      ? drawCornerBottom(values, secondFalseWidth, step)
      : drawBottom(values, step)
      step += distance
   }
}

function drawingDrawerFronts(values, gola, oven) {
   let distance
   if (oven) {
      distance = (values.heightDownSection - values.tabletopThickness - values.plinth - 600)
      drawBottom(values, distance)
      if (values.drawers > 0) {
         drawFront(values.width, values, distance)
         if (values.frontOpening === frontOpeningType1) drawHandle(values.width, values, distance, true)
      }
   } else {
      distance = (values.heightDownSection - values.tabletopThickness - values.plinth) / (values.drawers)
      let step = 0
      let frontHeight = distance - gola
      for (let i = 0; i < values.drawers; i++) {
         drawFront(values.width, values, frontHeight, step)
         if (values.frontOpening === frontOpeningType1) drawHandle(values.width, values, frontHeight, true, step)
         step += distance
         if (values.frontOpening === frontOpeningType4) drawGola(values, step, gola)
         
      }
   }
}
function drawingFronts(values, gola, falseWidth=0, secondFalseWidth=0) {
   let width = values.width - falseWidth
   let frontHeight = values.heightDownSection - values.tabletopThickness - values.plinth
   if (values.frontOpening === frontOpeningType4) drawGola(values, frontHeight, gola)
   drawFront(width, values, frontHeight - gola)
   if (values.frontOpening === frontOpeningType1) drawHandle(width, values, frontHeight, false)
   if (values.frontAmount > 1) {
      ctx.translate(-(values.width - falseWidth)/ 2, +(values.width - falseWidth) / 2 * Math.tan(inclinationAngle));
      drawFront(width, values, frontHeight - gola)
      if (values.frontOpening === frontOpeningType1) drawHandle(width, values, frontHeight, false)
      ctx.translate((values.width - falseWidth)/ 2, -(values.width - falseWidth) / 2 * Math.tan(inclinationAngle));
   }
   if (values.sectionType === sectionBottomType3) {
      if (values.frontOpening === frontOpeningType4) drawCentralGola(values, frontHeight, gola, secondFalseWidth)
      drawCentralFront(secondFalseWidth, values, frontHeight - gola)
      if (values.frontOpening === frontOpeningType1) drawCentralHandle(secondFalseWidth, values, frontHeight, false)
   }
}
function drawFront(width, values, frontHeight, distance=0) {
   ctx.fillStyle = frontColor
   ctx.beginPath()
   ctx.moveTo(0, -(values.plinth + distance))
   ctx.lineTo(-width / values.frontAmount, width / values.frontAmount * Math.tan(inclinationAngle) - (values.plinth + distance))
   ctx.lineTo(-width / values.frontAmount, width / values.frontAmount * Math.tan(inclinationAngle) - (values.plinth + distance + frontHeight))
   ctx.lineTo(0, -(values.plinth + distance + frontHeight))
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}

function drawingCentralFront(values, gola, falseWidth=0) {
   let width = values.width - falseWidth
   let frontHeight = values.heightDownSection - values.tabletopThickness - values.plinth
   if (values.frontOpening === frontOpeningType4) drawCentralGola(values, frontHeight, gola)
   drawCentralFront(width, values, frontHeight - gola)
   if (values.frontOpening === frontOpeningType1) drawHandle(width, values, frontHeight, false)
}

function drawCentralFront(width, values, frontHeight, distance=0) {
   ctx.fillStyle = frontColor
   ctx.beginPath()
   ctx.moveTo(0, -(values.plinth + distance))
   ctx.lineTo(width / values.frontAmount, -(values.plinth + distance))
   ctx.lineTo(width / values.frontAmount, -(values.plinth + distance + frontHeight))
   ctx.lineTo(0, -(values.plinth + distance + frontHeight))
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}

function drawGola(values, distance, gola) {
   ctx.fillStyle = golaColor
   ctx.beginPath()
   ctx.moveTo(0, -(values.plinth + distance))
   ctx.lineTo(-values.width, values.width * Math.tan(inclinationAngle) - (values.plinth + distance))
   ctx.lineTo(-values.width, values.width * Math.tan(inclinationAngle) - (values.plinth + distance) + gola)
   ctx.lineTo(0, -(values.plinth + distance) + gola)
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}
function drawCentralGola(values, distance, gola, width=0) {
   ctx.fillStyle = golaColor
   let golaWidth = (width === 0) ? values.width : width
   ctx.beginPath()
   ctx.moveTo(0, -(values.plinth + distance))
   ctx.lineTo(golaWidth, -(values.plinth + distance))
   ctx.lineTo(golaWidth, -(values.plinth + distance) + gola)
   ctx.lineTo(0, -(values.plinth + distance) + gola)
   ctx.fill()
   ctx.closePath()
   ctx.stroke()
}
function drawHandle(width, values, frontHeight, drawers, distance=0) {
   let indent = (drawers) ? frontHeight / 2 : frontHeight - 50
   ctx.translate(-width / (2 * values.frontAmount), (width / (2 * values.frontAmount)) * Math.tan(inclinationAngle) - (values.plinth + distance + indent))
   ctx.beginPath();
   ctx.moveTo(handleLength / 2, -(handleLength / 2) * Math.tan(inclinationAngle))
   ctx.lineTo(-handleLength / 2, (handleLength / 2) * Math.tan(inclinationAngle))
   ctx.stroke()
   ctx.translate(width / (2 * values.frontAmount), -(width / (2 * values.frontAmount)) * Math.tan(inclinationAngle) + (values.plinth + distance + indent))
}
function drawCentralHandle(width, values, frontHeight, drawers, distance=0) {
   let indent = (drawers) ? frontHeight / 2 : frontHeight - 50
   ctx.translate(width / (2 * values.frontAmount), -(values.plinth + distance + indent))
   ctx.beginPath();
   ctx.moveTo(handleLength / 2, 0)
   ctx.lineTo(-handleLength / 2, 0)
   ctx.stroke()
   ctx.translate(-width / (2 * values.frontAmount), (values.plinth + distance + indent))
}
function drawTabletop(values, depth = values.depth, width=values.width) {
   ctx.beginPath()
   ctx.fillStyle = tabletopColor
   ctx.moveTo(0, -(values.heightDownSection - values.tabletopThickness))
   ctx.lineTo(-width, width * Math.tan(inclinationAngle) - (values.heightDownSection - values.tabletopThickness));
   ctx.lineTo(-width - depth, width * Math.tan(inclinationAngle) - (values.heightDownSection - values.tabletopThickness));
   ctx.lineTo(-width - depth, width * Math.tan(inclinationAngle) - (values.heightDownSection));
   ctx.lineTo(-depth, -(values.heightDownSection));
   ctx.lineTo(0, -(values.heightDownSection));
   ctx.fill()
   ctx.closePath()
   ctx.moveTo(0, -(values.heightDownSection));
   ctx.lineTo(-width, width * Math.tan(inclinationAngle) - (values.heightDownSection));
   ctx.lineTo(-width - depth, width * Math.tan(inclinationAngle) - (values.heightDownSection));
   ctx.moveTo(-width, width * Math.tan(inclinationAngle) - (values.heightDownSection));
   ctx.lineTo(-width, width * Math.tan(inclinationAngle) - (values.heightDownSection - values.tabletopThickness));
   ctx.closePath()
   ctx.stroke()
}

function drawElement(values, color, indentX, indentY, depth) {
   ctx.beginPath()
   ctx.fillStyle = color
   ctx.moveTo(indentX - indentY, -indentX * Math.tan(inclinationAngle) - (values.heightDownSection))
   ctx.lineTo(values.width - indentX - indentY, -(values.width - indentX) * Math.tan(inclinationAngle) - (values.heightDownSection))
   ctx.lineTo(values.width - indentX - depth + indentY, -(values.width - indentX) * Math.tan(inclinationAngle) - (values.heightDownSection))
   ctx.lineTo(indentX - depth + indentY, -indentX * Math.tan(inclinationAngle) - (values.heightDownSection))
   ctx.fill()
   ctx.closePath()
}
function drawHob(values, depth=values.depth) {
   let indentX = (values.width - hobWidth) / 2
   let indentY = (depth - hobDepth) / 2
   drawElement(values, hobColor, indentX, indentY, depth)
   ctx.stroke()
}
function drawSink(values, depth=values.depth) {
   let indentX = (values.width - sinkWidth) / 2
   let indentY = (depth - sinkDepth) / 2
   drawElement(values, sinkColor, indentX, indentY, depth)
   ctx.stroke()
}
