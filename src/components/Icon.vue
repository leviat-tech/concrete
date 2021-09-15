<template>
  <div class="c-icon svg-inline" :class="size">
    <slot>
      <component :is="icon" @click="$emit('click', $event)" />
    </slot>
  </div>
</template>

<script>
import Check from '@/assets/icons/check.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronUp from '@/assets/icons/chevron-up.svg';
import Code from '@/assets/icons/code.svg';
import Compress from '@/assets/icons/compress.svg';
import Cube from '@/assets/icons/cube.svg';
import Download from '@/assets/icons/download.svg';
import Expand from '@/assets/icons/expand.svg';
import FileExport from '@/assets/icons/file-export.svg';
import FolderOpen from '@/assets/icons/folder-open.svg';
import Func from '@/assets/icons/function.svg';
import Grip from '@/assets/icons/grip.svg';
import GripLines from '@/assets/icons/grip-lines.svg';
import Hand from '@/assets/icons/hand.svg';
import Image from '@/assets/icons/image.svg';
import LongArrowDown from '@/assets/icons/long-arrow-down.svg';
import LongArrowUp from '@/assets/icons/long-arrow-up.svg';
import Minus from '@/assets/icons/minus.svg';
import MinusCircle from '@/assets/icons/minus-circle.svg';
import Pause from '@/assets/icons/pause.svg';
import Pen from '@/assets/icons/pen.svg';
import Play from '@/assets/icons/play.svg';
import Plus from '@/assets/icons/plus.svg';
import PointerOutline from '@/assets/icons/pointer-outline.svg';
import PointerSolid from '@/assets/icons/pointer-solid.svg';
import Polygon from '@/assets/icons/polygon.svg';
import Redo from '@/assets/icons/redo.svg';
import Save from '@/assets/icons/save.svg';
import Sync from '@/assets/icons/sync.svg';
import Table from '@/assets/icons/table.svg';
import TimesCircle from '@/assets/icons/times-circle.svg';
import Times from '@/assets/icons/times.svg';
import Trash from '@/assets/icons/trash.svg';
import Undo from '@/assets/icons/undo.svg';
import Upload from '@/assets/icons/upload.svg';
import Warning from '@/assets/icons/warning.svg';


export default {
  name: 'CIcon',
  props: {
    type: { type: String, default: 'pointer-outline' },
    size: {
      type: String,
      default: null,
      validator: (prop) => ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'].includes(prop),
    },
  },
  computed: {
    icon() {
      return {
        check: Check,
        'chevron-down': ChevronDown,
        'chevron-left': ChevronLeft,
        'chevron-right': ChevronRight,
        'chevron-up': ChevronUp,
        code: Code,
        compress: Compress,
        cube: Cube,
        download: Download,
        expand: Expand,
        'file-export': FileExport,
        'folder-open': FolderOpen,
        function: Func,
        grip: Grip,
        'grip-lines': GripLines,
        hand: Hand,
        image: Image,
        'long-arrow-down': LongArrowDown,
        'long-arrow-up': LongArrowUp,
        minus: Minus,
        'minus-circle': MinusCircle,
        pause: Pause,
        pen: Pen,
        play: Play,
        plus: Plus,
        'pointer-outline': PointerOutline,
        'pointer-solid': PointerSolid,
        polygon: Polygon,
        redo: Redo,
        save: Save,
        sync: Sync,
        table: Table,
        'times-circle': TimesCircle,
        times: Times,
        trash: Trash,
        undo: Undo,
        upload: Upload,
        warning: Warning,
      }[this.type];
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .svg-inline {
    font-size: inherit;
    overflow: visible;
    display: inline-block;
    height: .8em;
    vertical-align: -0.1em;

  &.xs {
    font-size: $text-xs;
  }

  &.sm {
    font-size: $text-sm;
  }

  &.md {
    font-size: $text-base;
  }

  &.lg {
    font-size: $text-lg;
  }

  &.xl {
    font-size: $text-xl;
  }

  &.xxl {
    font-size: $text-2xl;
  }

  &.xxxl {
    font-size: $text-3xl;
  }
}
</style>
