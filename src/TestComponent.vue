<template>
  <div>
    <div class="tab-div">
      <c-panel-slider title="Primary">
        <c-toolbar v-model="currentTool" default-tool="select">
          <c-tool-group>
            <c-tool name="Undo" tool-id="undo" icon="undo" />
            <c-tool name="Redo" tool-id="redo" icon="redo" />
          </c-tool-group>
          <c-tool-group>
            <c-tool name="Select" tool-id="select" icon="pointer-outline" />
            <c-tool name="Pan" tool-id="pan" icon="hand" />
            <c-tool name="Pen" tool-id="pen" icon="pen" />
            <c-tool name="Code" tool-id="zoom-to-fit">
              <zoom-to-fit-icon />
            </c-tool>
          </c-tool-group>
        </c-toolbar>
        Test component.
        <div>
          <c-panel-link link-to="a">Drill Down</c-panel-link>
          <c-panel-link link-to="b">A different menu</c-panel-link>
        </div>
        Some more content.
        <c-icon>
          <c-code />
        </c-icon>
        <c-icon>
          <zoom-to-fit-icon />
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
    <div class="tab-div">
      <c-tab-switcher tab-position="bottom">
        <template v-slot:labels>
          <c-tab-label>Tab Label 1</c-tab-label>
          <c-tab-label>Tab Label 2</c-tab-label>
          <c-tab-label>Tab Label 3</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab class="tab-interior">
            <p>Tab content 1.</p>
            <p>
              Lorem ipsum dolor sit amet...
            </p>
          </c-tab>
          <c-tab class="tab-interior">
            <p>Tab content 2</p>
            <p>
              Sed ut perspiciatis unde omnis...
            </p>
          </c-tab>
          <c-tab class="tab-interior">
            <p>Content 3!</p>
          </c-tab>
        </template>
      </c-tab-switcher>
    </div>
  </div>
</template>

<script>
import { CToolbar, CToolGroup, CTool } from '@/components/Toolbar';
import { CPanelSlider, CPanel, CPanelLink } from '@/components/PanelSlider';
import { CTabSwitcher, CTabLabel, CTab } from '@/components/TabSwitcher';
import ZoomToFitIcon from '@/assets/icons/zoom-to-fit.svg';
import NestedComponent from '@/NestedComponent';
import CIcon from '@/components/Icon';
import CCode from '@/assets/icons/code.svg';


export default {
  name: 'TestComponent',
  components: {
    CTabSwitcher,
    CTabLabel,
    CTab,
    CToolbar,
    CToolGroup,
    CTool,
    ZoomToFitIcon,
    NestedComponent,
    CPanelSlider,
    CPanel,
    CIcon,
    CPanelLink,
    CCode,
  },
  data() {
    return {
      currentTool: 'select',
    };
  },
};
</script>
