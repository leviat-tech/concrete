import ProgressBar from '../ProgressBar.vue';
import { formElementProps } from '../../../storybook/argTypes';
import { inject, provide } from 'vue';

const data = {
  progressBarSuccess: {
    value: 0.6715,
    label: 'Success example'
  },
  progressBarFail: {
    value: 2.375,
    label: 'Fail example'
  },
};

const componentTemplate = (args) => ({
  components: { ProgressBar },
  setup() {
    const concrete = inject('concrete');

    provide('concrete', {
      ...concrete,
      size: 'xs',
      inputIdToValue: (id) => {
        return data[id]?.value || args.modelValue;
      },
      labelFormatter: (props) => {
        return data[props.id]?.label || args.label;
      }
    })

    return { args };
  },
  template: `
    <div class="space-y-3">
      <div class="font-bold">Using auto input id to value mapping:</div>
      <ProgressBar id="progressBarSuccess" />
      <ProgressBar id="progressBarFail" />
      <div class="font-bold mt-4">Using props:</div>
      <ProgressBar v-bind="args" />
    </div>
  `,
});

export default {
  title: 'Components/Input/ProgressBar',
  component: ProgressBar,

  argTypes: {
    modelValue: {
      control: {
        type: "number",
        min: 0,
        max: 1,
        step: 0.1
      },
      showInTemplate: true,
    },

    onEnter: {
      table: {
        disable: true,
      },
    },

    onBlur: {
      table: {
        disable: true,
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: 'Overview',

  args: {
    modelValue: 0.52,
    label: 'Progress bar',
    onEnter: undefined,
    onBlur: undefined,
  },
};
