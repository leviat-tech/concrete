import CAccordion from "../Accordion.vue";

const componentTemplate = (args) => ({
  components: { CAccordion },
  setup() {
    return { args };
  },
  data() {
    return { show: args.show };
  },
  template: `
<CAccordion v-bind="args">
  <div class="py-2 px-6">{{args.content}}</div>
</CAccordion>
  `,
});

const componentTitleSlotTemplate = (args) => ({
  components: { CAccordion },
  setup() {
    return { args };
  },
  data() {
    return { show: args.show };
  },
  template: `
<CAccordion v-bind="args">
  <template #title>
    <div class="p-3 bg-sky hover:bg-sky-dark transition-color duration-100 text-white">This uses the title slot</div>
  </template>
  <div class="p-3 bg-sky-lightest">{{args.content}}</div>
</CAccordion>
  `,
});

export default {
  title: "Components/High level/Accordion",
  component: CAccordion,

  decorators: [
    (storyFn, ctx) => ({
      components: {
        Story: storyFn(ctx),
      },

      template: `<div style="min-height: 10rem; min-width: 360px;"><Story /></div>`,
    }),
  ],

  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],

      control: {
        type: "select",
      },

      table: {
        type: {
          summary: "size",
        },
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    title: "Accordion title",
    content: "Accordion content",
    show: false,
  },
};

export const TitleSlot = {
  render: componentTitleSlotTemplate.bind({}),
  name: "TitleSlot",

  args: {
    content: "Accordion content",
    show: false,
  },
};
