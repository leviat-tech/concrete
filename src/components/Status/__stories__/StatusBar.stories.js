import StatusBar from "../StatusBar.vue";
import Listbox from "../../Listbox/Listbox.vue";

const componentTemplate = (args) => ({
  components: { StatusBar, Listbox },
  setup() {
    return { args };
  },
  data() {
    return {
      messages: [
        { id: 1, type: "info", text: "This is an info message" },
        { id: 2, type: "warning", text: "This is a warning message" },
        { id: 3, type: "error", text: "This is an error message" },
      ],
      id: 0,
      type: "info",
      text: "",
    };
  },
  methods: {
    addMessage() {
      const { type, text } = this;
      this.messages.push({ id: this.id++, type, text });
      this.text = "";
    },
    onClick(id) {
      this.messages.push({
        id: this.id++,
        type: "info",
        text: `You clicked item with id ${id}`,
      });
    },
    onDismiss(index) {
      this.messages.splice(index, 1);
    },
  },
  template: `
<div class="relative flex z-10">
  <input v-model="text" @keydown.enter="addMessage" placeholder="New item text..." class="flex-1 px-4 mr-2"/>
  <Listbox :options="['info', 'warning', 'error']"  v-model="type" class="w-32"/>
</div>
<StatusBar v-bind="args" :messages="messages" @click="onClick" @dismiss="onDismiss"/>
`,
});

export default {
  title: "Components/High level/StatusBar",
  component: StatusBar,

  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],

      control: {
        type: "select",
      },
    },
  },

  decorators: [
    (storyFn) => ({
      components: {
        Story: storyFn(),
      },

      template: `
 <div style="min-width: 640px; max-width: 100%;" class=" relative h-64">
 <Story />
</div>
    `,
    }),
  ],
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    size: "sm",
  },
};
