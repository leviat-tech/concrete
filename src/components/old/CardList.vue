<template>
  <div
    ref="cardlistref"
    class="concrete-card-list-container concrete"
    :style="`grid-template-columns: repeat(auto-fill, minmax(${cardWidth}, 1fr));`"
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
    cardWidth: { type: String, default: '12rem' },
  },
  setup(props, context) { // eslint-disable-line
    const cardlistref = ref(null);
    const vm = getCurrentInstance();

    function nearestDropSlot(position) {
      const c = vm.$children.filter((child) => child.isCard);

      if (c.length <= 0) return 0;

      const gutter = c.length > 1
        ? (c[1].cardref.offsetLeft - (c[0].cardref.offsetLeft + c[0].cardref.offsetWidth)) / 2
        : 0;

      const initialSlot = {
        x: c[0].cardref.offsetLeft - gutter,
        y: c[0].cardref.offsetTop + c[0].cardref.offsetHeight / 2,
      };

      const otherSlots = c.map((child) => ({
        x: child.cardref.offsetLeft + child.cardref.offsetWidth + gutter,
        y: child.cardref.offsetTop + child.cardref.offsetHeight / 2,
      }));

      const distances = [initialSlot].concat(otherSlots).map((p) => distSq(position, p));

      return distances.indexOf(Math.min(...distances));
    }

    function highlightCard(draggedCard, highlightSlot) {
      const cards = vm.$children
        .filter((child) => child.isCard);

      cards.forEach((card) => { card.highlight(draggedCard, highlightSlot); });
    }

    function endHighlight() {
      const cards = vm.$children
        .filter((child) => child.isCard);

      cards.forEach((card) => { card.endHighlight(); });
    }

    function dropCard(index, nearest) {
      if (nearest === index || nearest === index + 1) return;

      const placement = nearest < index ? nearest : nearest - 1;
      const movedCard = props.value[index];
      const remainder = props.value.slice(0, index).concat(props.value.slice(index + 1));
      remainder.splice(placement, 0, movedCard);
      context.emit('input', remainder);
    }

    function dragstart(index, position) {
      const nearest = nearestDropSlot(position);
      highlightCard(index, nearest);
    }

    function dragged(index, position) {
      const nearest = nearestDropSlot(position);
      highlightCard(index, nearest);
    }

    function dragend(index, position) {
      endHighlight();
      const nearest = nearestDropSlot(position);
      dropCard(index, nearest);
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
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
}
</style>
