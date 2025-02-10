import { titleClass } from "../../utils/description"
import { Title } from "../Title"
import Canvas from "./Canvas"


const RenderingContent = (props) => {
   return (
      <div>
         <Title className={props.class + titleClass} title={props.title} />
         <Canvas />
      </div>
   )
}

export default RenderingContent
