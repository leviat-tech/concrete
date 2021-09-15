<template>
  <div class="tab-div">
    <c-panel-slider title="Primary">
      Test component.
      <div>
        <c-panel-link link-to="a">Drill Down</c-panel-link>
        <c-panel-link link-to="b">A different menu</c-panel-link>
      </div>
      Some more content.
      <c-icon class="lg">
        <c-code />
      </c-icon>
      <c-icon type="pointer-outline" />
      <c-panel panel-id="a" title="Secondary">
        <c-panel-link link-to="x">Drill more?</c-panel-link>
        <nested-component />
      </c-panel>
      <c-panel panel-id="b" title="Another?">
        A different Secondary Panel
      </c-panel>
    </c-panel-slider>
  </div>
</template>

<script>
import { CPanelSlider, CPanel, CPanelLink } from '@/components/PanelSlider';
import NestedComponent from '@/NestedComponent';
import CIcon from '@/components/Icon';
import CCode from '@/assets/icons/code.svg';


export default {
  name: 'TestComponent',
  components: {
    NestedComponent,
    CPanelSlider,
    CPanel,
    CIcon,
    CPanelLink,
    CCode,
  },
};
</script>
