import CTabs from "../Tabs.vue";

import * as stories from "./Tabs.stories.js";

export default {
  title: "Components/High level/Tabs",
  component: CTabs,

  argTypes: {
    tabPosition: {
      options: ["top", "bottom"],

      control: {
        type: "radio",
      },
    },

    labels: {
      control: {
        type: "object",
      },
    },
  },
};

export const Overview = {
  name: "Overview",
  story: stories.Overview,
};

export const LabelSlots = {
  name: "LabelSlots",
  story: stories.LabelSlots,
};

export const VModel = {
  name: "VModel",
  story: stories.VModel,
};
