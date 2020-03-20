import Checkbox from '../src/components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Example = () => ({
  components: { Checkbox },
  template: `
    <div>
      hello
      <checkbox />
    </div>
  `
});

Example.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=156%3A0',
    }
  }
}