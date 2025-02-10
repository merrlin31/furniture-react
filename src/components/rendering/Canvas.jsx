import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import '../../styles/rendering.scss';
import { draw } from "../properties/renderingProperties";


const Canvas = () => {
   const ref=useRef()
   const product = useSelector(state => state.product.product)

   useEffect(() => {
      const canvas = ref.current
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
      draw(product, ctx)
   }, [product])

   return (
      <div>
         <canvas ref={ref} height="800" width="1000"></canvas>
      </div>
   )
}

export default Canvas
