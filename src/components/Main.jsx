import { Section } from "./Section";
import { InputContent } from "./input/InputContent";
import { SettingsContent } from "./SettingsContent";
import { DetailingContent } from "./detailing/DetailingContent";
import { SpecificationContent } from "./specification/SpecificationContent";
import { PriceContent } from "./PriceContent";
import { mainClass, section1Class, section1Name, section1Title1, section1Title2, section1Title3, 
  section2Class, section2Name, section2Title1, section2Title2, section2Title3, section3Name, section3Title1, 
  section3Title2, section3Title3, section3Title4, section4Name, section4Title1, section4Title2, 
  section4Title3, section5Name, section5Title1, section6Title1 } from "../utils/description";
import { useSelector } from "react-redux";
import RenderingContent from "./rendering/RenderingContent";

export const Main = () => {
  const product = useSelector(state => state.product.product)
  const titleName = 'title.'

  return (
      <main className={mainClass}>
        <Section class={section1Class} name={section1Name}>
          <InputContent title={titleName + section1Title1} title1={titleName + section1Title2} title2={titleName + section1Title3} class={section1Class} />
        </Section>
        <Section class={section2Class}>
          <PriceContent title={titleName + section2Title1} title1={titleName + section2Title2} title2={titleName + section2Title3} class={section2Class} />
        </Section>
        {product.length !== 0 && 
          <Section class={section5Name} name={section5Name}>
            <RenderingContent title={titleName + section6Title1} class={section5Name}/>
          </Section>
        }
        {product.length !== 0 && 
          <Section class={section2Name} name={section2Name}>
            <DetailingContent title={titleName + section3Title1} title1={titleName + section3Title2} title2={titleName + section3Title3} 
            title3={titleName + section3Title4} class={section2Name} />
          </Section>
        }
        {product.length !== 0 && 
          <Section class={section3Name} name={section3Name}>
            <SpecificationContent title={titleName + section4Title1} title1={titleName + section4Title2} 
            title2={titleName + section4Title3} class={section3Name} />
          </Section>
        }
        <Section class={section4Name} name={section4Name}>
          <SettingsContent title={titleName + section5Title1} class={section4Name} />
        </Section>
      </main>
  );
}