import '../../styles/detailing.scss';
import { useEffect } from 'react';
import { DetailingTable } from './DetailingTable';
import { allService, Services } from '../../utils/services';
import { addMaterial, addToArr, fillArr } from '.././properties/detailingProperties';
import { detailingTable1Class, detailingTable2Class, detailingTable3Class, detailingTable4Class, 
   detailType1, detailType2, detailType3, detailType4, materialType1Height } from '../../utils/description';
import { useDispatch, useSelector } from 'react-redux';
import { addServiceItem } from '../../reducers/productReducer';
import { addDetail, addMaterials } from '../../reducers/detailReducer';

export const DetailingContent = (props) => {
   const dispatch = useDispatch()
   const product = useSelector(state => state.product.product)
   const details = useSelector(state => state.detail)
   const tabletopLength = useSelector(state => state.setting.servicePrices.tabletopLength)
   
   const DETAILS = 'details'
   const ADDED_DETAILS = 'addedDetails'
   const FRONTS = 'fronts'
   const ADDED_FRONTS = 'addedFronts'
   const DVPS = 'dvps'
   const ADDED_DVPS = 'addedDvps'
   const TABLETOP = 'tabletop'
   const trim = 31
   const maxDetailLength = materialType1Height - trim
   const maxTabletopLength = +tabletopLength - trim

   useEffect(() => {
      let arrDetails = []
      let arrFronts = []
      let arrDvps = []
      let arrTabletops = []
      let arrPlinth = {
         leftPlinth: [],
         centralPlinth: [],
         rightPlinth: [],
      }
      let tabletops = {
         leftTabletop: [],
         centralTabletop: [],
         rightTabletop: [],
      }
      let allMaterials = []
      let service = new Services()
      
      product.forEach(section => {
         fillArr(arrDetails, section[DETAILS], section)
         fillArr(arrFronts, section[FRONTS], section)
         fillArr(arrDvps, section[DVPS], section)
         addToArr(section.plinth[0], arrPlinth.leftPlinth, maxDetailLength)
         addToArr(section.plinth[1], arrPlinth.centralPlinth, maxDetailLength)
         addToArr(section.plinth[2], arrPlinth.rightPlinth, maxDetailLength)
         addToArr(section.tabletops[0], tabletops.leftTabletop, maxTabletopLength)
         addToArr(section.tabletops[1], tabletops.centralTabletop, maxTabletopLength)
         addToArr(section.tabletops[2], tabletops.rightTabletop, maxTabletopLength)
      })
      fillArr(arrDetails, arrPlinth.leftPlinth)
      fillArr(arrDetails, arrPlinth.centralPlinth)
      fillArr(arrDetails, arrPlinth.rightPlinth)
      fillArr(arrTabletops, tabletops.leftTabletop)
      fillArr(arrTabletops, tabletops.centralTabletop)
      fillArr(arrTabletops, tabletops.rightTabletop)

      let result = [arrDetails, details[ADDED_DETAILS], arrFronts, details[ADDED_FRONTS], arrDvps, details[ADDED_DVPS], arrTabletops]
      for (let arr of result) {
         arr.forEach(detail => addMaterial(detail, allMaterials, service, details.materials))
      }

      for (let key in allService) {
         if (service[key] !== 0) allService[key].value = +service[key].toFixed(2);
         if (allService[key].value > 0) dispatch(addServiceItem(allService[key]));
      }

      dispatch(addDetail(DETAILS, arrDetails))
      dispatch(addDetail(FRONTS, arrFronts))
      dispatch(addDetail(DVPS, arrDvps))
      dispatch(addDetail(TABLETOP, arrTabletops))
      dispatch(addMaterials(allMaterials))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [product, details[ADDED_DETAILS], details[ADDED_FRONTS], details[ADDED_DVPS]])

   return (
      <> 
         {details[DETAILS].length !== 0 &&
            <DetailingTable className={props.class + detailingTable1Class} parent={props.class} addedDetails={details[ADDED_DETAILS]} typeAddedDetails={ADDED_DETAILS}
            title={props.title} details={details[DETAILS]} type={detailType1} />   
         }
         {details[FRONTS].length !== 0 &&
            <DetailingTable className={props.class + detailingTable2Class} parent={props.class} addedDetails={details[ADDED_FRONTS]} typeAddedDetails={ADDED_FRONTS}
            title={props.title1} details={details[FRONTS]} type={detailType2} />   
         }
         {details[DVPS].length !== 0 &&
            <DetailingTable className={props.class + detailingTable3Class} parent={props.class} addedDetails={details[ADDED_DVPS]} typeAddedDetails={ADDED_DVPS}
            title={props.title2} details={details[DVPS]} type={detailType3} edge />   
         }
         {details[TABLETOP].length !== 0 &&
            <DetailingTable className={props.class + detailingTable4Class} parent={props.class} 
            title={props.title3} details={details[TABLETOP]} type={detailType4} />   
         }
      </>
   );
}