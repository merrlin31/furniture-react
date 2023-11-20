import { Section } from "./Section";
import { InputContent } from "./input/InputContent";
import { SettingsContent } from "./SettingsContent";
import { useState } from "react";
import { MyContext } from "../context";
import { DetailingContent } from "./detailing/DetailingContent";
import { SpecificationContent } from "./specification/SpecificationContent";
import { PriceContent } from "./PriceContent";
import { initialIndentValues } from "./properties/settingsProperties";
import { initialServicesPrice } from "../utils/services";
import { initialFurniturePrice } from "../utils/furniture";
import { mainClass, section1Class, section1Title1, section1Title2, section1Title3, 
  section2Class, section2Title1, section2Title2, section2Title3, section3Class, section3Title1, 
  section3Title2, section3Title3, section3Title4, section4Class, section4Title1, section4Title2, 
  section4Title3, section5Class, section5Title1 } from "../utils/description";

export const Main = () => {

  const [indentValues, setIndentValues] = useState(initialIndentValues)
  const [servicesPrice, setServicesPrice] = useState(initialServicesPrice)
  const [furniturePrice, setFurniturePrice] = useState(initialFurniturePrice)
  const [sections, setSections] = useState([])
  const [materials, setMaterials] = useState([])
  const [services, setServices] = useState([])
  const [furnitures, setFurnitures] = useState([])
  const titleName = 'title.'

  return (
    <MyContext.Provider value={{indentValues, setIndentValues, servicesPrice, setServicesPrice, furniturePrice, 
      setFurniturePrice, sections, setSections, materials, setMaterials, services, setServices, furnitures, setFurnitures}}>
      <main className={mainClass}>
        <Section class={section1Class}  content={<InputContent title={titleName + section1Title1} title1={titleName + section1Title2} 
          title2={titleName + section1Title3} class={section1Class} />} />
        <Section class={section2Class}  content={<PriceContent title={titleName + section2Title1} title1={titleName + section2Title2} 
          title2={titleName + section2Title3} class={section2Class} />} />
        <Section class={section3Class}  content={<DetailingContent title={titleName + section3Title1} title1={titleName + section3Title2} 
          title2={titleName + section3Title3} title3={titleName + section3Title4} class={section3Class} />} />
        <Section class={section4Class}  content={<SpecificationContent title={titleName + section4Title1} title1={titleName + section4Title2} 
          title2={titleName + section4Title3} class={section4Class} />} />
        <Section class={section5Class}  content={<SettingsContent title={titleName + section5Title1} class={section5Class} />} />
      </main>
    </MyContext.Provider>
  );
}