import StatusMessage from '../StatusMessage.vue';

export default {
  title: 'Components/High level/Status/StatusMessage',
  component: StatusMessage,
  args: { text: 'This is a message' },
  argTypes: {
    status: {
      options: [null, 'error', 'warning', 'success', 'info'],
      control: { type: 'select' },
    },
  }
};

const MessageTemplate = (args) => ({
  components: { StatusMessage },
  setup() {
    return { args };
  },
  template: `
    <div class="max-w-xl w-screen space-y-1">
      <StatusMessage text="This is a default/in progress status message"/>
      <StatusMessage status="info" text="This is an info status message"/>
      <StatusMessage status="error" text="This is an error status message"/>
      <StatusMessage status="warning" text="This is a warning status message"/>
      <StatusMessage status="success" text="This is a success status message"/>
      <StatusMessage text="This is a status message with extra content in the slot">
        <div class="text-gray-400 text-xs">{{ new Date().toLocaleString() }}</div>
      </StatusMessage>
      
      <div class="py-2">Try it for yourself:</div>
      <StatusMessage v-bind="args"/>
    </div>
  `,
});

export const Overview = {
  render: MessageTemplate.bind({ text: 'this is a message' }),
  name: 'Overview',
};
