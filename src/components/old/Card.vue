<template>
  <div
    ref="cardref"
    class="concrete-card concrete"
    :class="{
      dragging: drag.dragging,
      left: drag.highlight === 'left',
      right: drag.highlight === 'right',
      'gray-left': drag.highlight === 'gray-left',
      'gray-right': drag.highlight === 'gray-right',
    }"
  >
    <div
      ref="gripref"
      class="concrete-card-grip"
    >
      <c-icon type="grip" />
    </div>
    <div v-if="hasTitle" class="concrete-card-title concrete">
      <slot name="title" />
    </div>
    <div class="concrete-card-content concrete">
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, computed, ref } from '@vue/composition-api';
import { drag as d3Drag } from 'd3-drag';
import { selectAll, mouse } from 'd3-selection';
import CIcon from '@/components/Icon';


export default {
  name: 'CCard',
  components: { CIcon },
  props: {
    index: { type: Number, required: true },
  },
  setup(props, context) {
    const gripref = ref(null);
    const cardref = ref(null);

    const isCard = true;

    const drag = reactive({
      element: computed(() => context.parent.cardlistref),
      dragging: false,
      selection: null,
      highlight: null,
    });

    const hasTitle = computed(() => !!context.slots.title);

    function dragstart() {
      const [x, y] = mouse(drag.element);
      context.parent.dragstart(props.index, { x, y });
      drag.dragging = true;
    }

    function dragged() {
      const [x, y] = mouse(drag.element);
      context.parent.dragged(props.index, { x, y });
    }

    function dragend() {
      const [x, y] = mouse(drag.element);
      context.parent.dragend(props.index, { x, y });
      drag.dragging = false;
    }

    onMounted(() => {
      drag.selection = selectAll([gripref.value]);
      drag.selection.call(d3Drag()
        .on('start', dragstart)
        .on('drag', dragged)
        .on('end', dragend));
    });

    onUnmounted(() => {
      drag.selection.on('.drag', null);
    });

    function highlight(dragIndex, slot) {
      if (dragIndex === props.index) {
        if (slot === props.index) {
          drag.highlight = 'gray-left';
        } else if (slot === props.index + 1) {
          drag.highlight = 'gray-right';
        } else {
          drag.highlight = null;
        }
      } else if (slot === 0 && props.index === 0) {
        drag.highlight = 'left';
      } else if (slot === dragIndex && props.index === dragIndex - 1) {
        drag.highlight = null;
      } else if (slot === props.index + 1) {
        drag.highlight = 'right';
      } else {
        drag.highlight = null;
      }
    }

    function endHighlight() {
      drag.highlight = null;
    }

    return {
      isCard, highlight, endHighlight, gripref, cardref, hasTitle, drag,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-card {
  position: relative;
  @include shadow;
  margin-right: 2rem;
  margin-bottom: 2rem;
  width: 12rem;

  &.dragging {
    background-color: $color-gray-01;
  }

  &.gray-left::before {
    position: absolute;
    display: block;
    height: 100%;
    content: ' ';
    left: -1rem;
    border-left: $border-sm $color-gray-03 solid;
  }

  &.left::before {
    position: absolute;
    display: block;
    height: 100%;
    content: ' ';
    left: -1rem;
    border-left: $border-sm $color-blue solid;
  }

  &.gray-right::before {
    position: absolute;
    display: block;
    height: 100%;
    content: ' ';
    right: -1rem;
    border-right: $border-sm $color-gray-03 solid;
  }

  &.right::before {
    position: absolute;
    display: block;
    height: 100%;
    content: ' ';
    right: -1rem;
    border-right: $border-sm $color-blue solid;
  }
}

@supports (display: grid) {
  .concrete-card {
    margin-right: 0;
    margin-bottom: 0;
    width: auto;
  }
}

.concrete-card-grip {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.75rem 1rem 0.75rem 1rem;
  font-size: $text-sm;
  color: $color-gray-06;

  &:hover {
    color: $color-black;
  }
}

.concrete-card-title {
  padding: 0.75rem 1rem 0.75rem 1rem;
  border-bottom: $border-sm solid $color-gray-04;
  color: $color-gray-06;
  font-size: $text-sm;
}

.concrete-card-content {
  padding: 1rem;
}

</style>
