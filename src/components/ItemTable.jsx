export const ItemTable = ({className, itemAmount}) => {
   return (
      <table className={`${className}__table`}>
         <tbody className={`${className}__input`}>
            <tr>
               <td colSpan="3">Кіл-ть секцій:</td>
               <td>{itemAmount.allItem}</td>
            </tr>
            <tr>
               <td>Секції</td>
               <td>ЛС</td>
               <td>ПС</td>
               <td>СС</td>
            </tr>
            <tr>
               <td>Нижні:</td>
               <td>{itemAmount.leftBottomItem}</td>
               <td>{itemAmount.centralBottomItem}</td>
               <td>{itemAmount.rightBottomItem}</td>
            </tr>
            <tr>
               <td>Середні:</td>
               <td>{itemAmount.leftCentralItem}</td>
               <td>{itemAmount.centralCentralItem}</td>
               <td>{itemAmount.rightCentralItem}</td>
            </tr>
            <tr>
               <td>Верхні:</td>
               <td>{itemAmount.leftUpperItem}</td>
               <td>{itemAmount.centralUpperItem}</td>
               <td>{itemAmount.rightUpperItem}</td>
            </tr>
         </tbody>
      </table>
   );
}