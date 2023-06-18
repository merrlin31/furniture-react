import { Section } from "./Section";
import { InputContent } from "./InputContent";

export const Main = () => {
  return (
    <main className='content'>
      <Section class={'input'}  content={<InputContent title={'Розмір кухні (мм) та матеріали:'} title1={'Виберіть тип секції:'} title2={'Кіл-ть доданих секцій:'} class={'input'} />} />
    </main>
  );
}