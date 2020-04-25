<template>
  <component :is="icon" @click="$emit('click', $event)" />
</template>

<script>
import Check from '@/assets/icons/check.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronUp from '@/assets/icons/chevron-up.svg';
import Compress from '@/assets/icons/compress.svg';
import Cube from '@/assets/icons/cube.svg';
import Expand from '@/assets/icons/expand.svg';
import Hand from '@/assets/icons/hand.svg';
import Image from '@/assets/icons/image.svg';
import LongArrowDown from '@/assets/icons/long-arrow-down.svg';
import LongArrowUp from '@/assets/icons/long-arrow-up.svg';
import Pen from '@/assets/icons/pen.svg';
import Play from '@/assets/icons/play.svg';
import Plus from '@/assets/icons/plus.svg';
import PointerOutline from '@/assets/icons/pointer-outline.svg';
import PointerSolid from '@/assets/icons/pointer-solid.svg';
import Polygon from '@/assets/icons/polygon.svg';
import TimesCircle from '@/assets/icons/times-circle.svg';
import Times from '@/assets/icons/times.svg';


export default {
  name: 'CIcon',
  props: {
    type: { type: String, default: 'pointer-outline' },
    size: { type: String, default: 'md' },
  },
  computed: {
    icon() {
      return {
        check: Check,
        'chevron-down': ChevronDown,
        'chevron-left': ChevronLeft,
        'chevron-right': ChevronRight,
        'chevron-up': ChevronUp,
        compress: Compress,
        cube: Cube,
        expand: Expand,
        hand: Hand,
        image: Image,
        'long-arrow-down': LongArrowDown,
        'long-arrow-up': LongArrowUp,
        pen: Pen,
        play: Play,
        plus: Plus,
        'pointer-outline': PointerOutline,
        'pointer-solid': PointerSolid,
        polygon: Polygon,
        'times-circle': TimesCircle,
        times: Times,
      }[this.type];
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-inline {
  font-size: .75rem;
  height: 1em;
  overflow: visible;
  display: inline-block;
  vertical-align: -0.125em;
}

</style>
