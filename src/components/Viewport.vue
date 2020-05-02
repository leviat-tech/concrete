<script>
import { CToolbar, CToolGroup, CTool } from '@/components/Toolbar';


export default {
  name: 'CViewport',
  components: {
    CToolbar,
    CToolGroup,
    CTool,
  },
  data() {
    return {
      currentViewportId: null,
    };
  },
  methods: {
    changeView(id) {
      this.currentViewportId = id;
    },
  },
  render() {
    const slots = this.$slots.default || [];

    const currentViewport = this.currentViewportId
      ? slots.find((s) => s.componentOptions.propsData.viewportId === this.currentViewportId)
      : slots[0];

    if (!this.currentViewportId) {
      this.currentViewportId = currentViewport.componentOptions.propsData.viewportId;
    }

    const viewports = slots.map((slot) => {
      const { name, viewportId } = slot.componentOptions.propsData;
      return <c-tool name={name} text-button tool-id={viewportId} />;
    });

    return (
      <div class="concrete-viewport">
        <div class="concrete-viewport-controls">
          <c-toolbar
            vOn:input={this.changeView}
            value={this.currentViewportId}
          >
            <c-tool-group>
              { viewports }
            </c-tool-group>
          </c-toolbar>
        </div>
      { currentViewport }
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-viewport {
  width: 100%;
  height: 100%;
}

.concrete-viewport-controls {
  position: absolute;
  background-color: $color-white;
  border-bottom: $border-sm solid $color-gray-04;
  border-right: $border-sm solid $color-gray-04;
}
</style>
