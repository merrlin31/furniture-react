import '../../styles/detailing.scss';

import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import { useEffect } from 'react';
import { DetailingTable } from './DetailingTable';
import { allService, Services } from '../../utils/services';
import { addMaterial, addToArr, fillArr } from '.././properties/detailingProperties';
import { detailingTable1Class, detailingTable2Class, detailingTable3Class, detailingTable4Class, 
   detailType1, detailType2, detailType3, detailType4, materialType1Height } from '../../utils/description';

export const DetailingContent = (props) => {
   const {sections, setSections, materials, setMaterials, servicesPrice} = useContext(MyContext)

   const [details, setDetails] = useState([])
   const [fronts, setFronts] = useState([])
   const [dvps, setDvps] = useState([])
   const [tabletop, setTabletop] = useState([])

   const trim = 31
   const maxDetailLength = materialType1Height - trim
   const maxTabletopLength = +servicesPrice.tabletopLength - trim

   const editSection = (section, index) => {
      let result = sections.map(item => 
         item.id !== index
         ? item
         : section)
      console.log(section)
      setSections(result)  
   }
   const [addedBodyDetail, setAddedBodyDetail] = useState([])
   const [addedFrontDetail, setAddedFrontDetail] = useState([])
   const [addedDvpDetail, setAddedDvpsDetail] = useState([])

   useEffect(() => {
      let arrDetails = []
      let arrFronts = []
      let arrDvps = []
      let arrPlinth = {
         leftPlinth: [],
         centralPlinth: [],
         rightPlinth: [],
      }
      let arrTabletops = []
      let arrService = []
      let tabletops = {
         leftTabletop: [],
         centralTabletop: [],
         rightTabletop: [],
      }
      let allMaterials = []
      let service = new Services()
      
      sections.forEach(section => {
         fillArr(arrDetails, section.details, section)
         fillArr(arrFronts, section.fronts, section)
         fillArr(arrDvps, section.dvps, section)
         addToArr(section.plinth.leftSection, arrPlinth.leftPlinth, maxDetailLength)
         addToArr(section.plinth.centralSection, arrPlinth.centralPlinth, maxDetailLength)
         addToArr(section.plinth.rightSection, arrPlinth.rightPlinth, maxDetailLength)
         addToArr(section.tabletops.leftSection, tabletops.leftTabletop, maxTabletopLength)
         addToArr(section.tabletops.centralSection, tabletops.centralTabletop, maxTabletopLength)
         addToArr(section.tabletops.rightSection, tabletops.rightTabletop, maxTabletopLength)
      })

      fillArr(arrDetails, arrPlinth.leftPlinth)
      fillArr(arrDetails, arrPlinth.centralPlinth)
      fillArr(arrDetails, arrPlinth.rightPlinth)
      fillArr(arrTabletops, tabletops.leftTabletop)
      fillArr(arrTabletops, tabletops.centralTabletop)
      fillArr(arrTabletops, tabletops.rightTabletop)

      arrDetails.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      addedBodyDetail.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      arrFronts.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      addedFrontDetail.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      arrDvps.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      addedDvpDetail.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      arrTabletops.forEach(detail => addMaterial(detail, allMaterials, service, materials))
      for (let key in allService) {
         if (service[key] !== 0) {
            allService[key].value = +service[key].toFixed(2)
            arrService.push(allService[key])
         }
      }
      
      setDetails(arrDetails)
      setFronts(arrFronts)
      setDvps(arrDvps)
      setTabletop(arrTabletops)
      setMaterials(allMaterials)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sections, addedBodyDetail, addedFrontDetail, addedDvpDetail])

   return (
      <> 
         {details.length !== 0 &&
            <DetailingTable className={props.class + detailingTable1Class} parent={props.class} addedDetails={addedBodyDetail} setAddedDetails={setAddedBodyDetail}
            title={props.title} details={details} editSection={editSection} sections={sections} type={detailType1} />   
         }
         {fronts.length !== 0 &&
            <DetailingTable className={props.class + detailingTable2Class} parent={props.class} addedDetails={addedFrontDetail} setAddedDetails={setAddedFrontDetail}
            title={props.title1} details={fronts} editSection={editSection} sections={sections} type={detailType2} />   
         }
         {dvps.length !== 0 &&
            <DetailingTable className={props.class + detailingTable3Class} parent={props.class} addedDetails={addedDvpDetail} setAddedDetails={setAddedDvpsDetail}
            title={props.title2} details={dvps} editSection={editSection} sections={sections} type={detailType3} edge />   
         }
         {tabletop.length !== 0 &&
            <DetailingTable className={props.class + detailingTable4Class} parent={props.class} 
            title={props.title3} details={tabletop} editSection={editSection} sections={sections} type={detailType4} />   
         }
      </>
   );
}