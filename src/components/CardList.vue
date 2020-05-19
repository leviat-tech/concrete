<template>
  <div
    ref="cardlistref"
    class="concrete-card-list-container concrete"
  >
    <slot />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from '@vue/composition-api';


const distSq = (ptA, ptB) => {
  const x = ptB.x - ptA.x;
  const y = ptB.y - ptA.y;
  return x * x + y * y;
};

export default {
  name: 'CCardList',
  props: {
    value: { type: Array, default: () => {} },
  },
  setup(props, context) { // eslint-disable-line
    const cardlistref = ref(null);
    const vm = getCurrentInstance();

    function nearestCard(position) {
      const distances = vm.$children
        .filter((child) => child.isCard)
        .map((child) => {
          const childPos = {
            x: child.cardref.offsetLeft,
            y: child.cardref.offsetTop,
          };
          return distSq(position, childPos);
        });

      return distances.indexOf(Math.min(...distances));
    }

    function highlightCard() {

    }

    function dragstart(index, position) {
      console.log('start', index, position);
      const nearest = nearestCard(position);
      highlightCard(index, nearest);
    }

    function dragged(index, position) {
      const nearest = nearestCard(position);
      highlightCard(index, nearest);
    }

    function dragend(index, position) {
      console.log('end', index, position);
    }

    return { cardlistref, dragstart, dragged, dragend };
  },
};
</script>

<style lang="scss" scoped>
.concrete-card-list-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .concrete-card-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
}
</style>
