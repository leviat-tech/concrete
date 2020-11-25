<template>
  <div>
    Secondary Content
    <c-panel panel-id="x" title="Tertiary">
      Tertiary Content
      <div>{{ counter }}</div>
      <c-button @click="counter = counter + 1"> click me </c-button>
      <c-panel-link link-to="q">Last one</c-panel-link>
      <c-panel panel-id="q" title="Last one">
        Some final content
      </c-panel>
    </c-panel>
  </div>
</template>

<script>
import { CPanel, CPanelLink } from '@/components/PanelSlider';
import CButton from '@/components/Button';


export default {
  name: 'NestedComponent',
  components: {
    CPanel,
    CPanelLink,
    CButton,
  },
  data() {
    return {
      counter: 0,
    };
  },
};
</script>
