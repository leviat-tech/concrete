<script>
import { h } from 'vue'
import set from 'lodash/set';
import { ArrowDownIcon } from '@heroicons/vue/outline';
import { ArrowUpIcon } from '@heroicons/vue/outline';
import { ArrowLeftIcon } from '@heroicons/vue/outline';
import { ArrowRightIcon } from '@heroicons/vue/outline';
import { CheckIcon } from '@heroicons/vue/outline';
import { CheckCircleIcon } from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/outline';
import { ChevronUpIcon } from '@heroicons/vue/outline';
import { ChevronLeftIcon } from '@heroicons/vue/outline';
import { ChevronRightIcon } from '@heroicons/vue/outline';
import { CodeIcon } from '@heroicons/vue/outline';
import { CubeIcon } from '@heroicons/vue/outline';
import { DuplicateIcon } from '@heroicons/vue/outline';
import { DocumentDownloadIcon } from '@heroicons/vue/outline';
import { PencilAltIcon } from '@heroicons/vue/outline';
import { PencilIcon } from '@heroicons/vue/outline';
import { ArrowsExpandIcon } from '@heroicons/vue/outline';
import { FolderOpenIcon } from '@heroicons/vue/outline';
import { ViewGridIcon } from '@heroicons/vue/outline';
import { ViewListIcon } from '@heroicons/vue/outline';
import { HandIcon } from '@heroicons/vue/outline';
import { LockClosedIcon } from '@heroicons/vue/outline';
import { ArrowNarrowDownIcon } from '@heroicons/vue/outline';
import { ArrowNarrowUpIcon } from '@heroicons/vue/outline';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline';
import { MinusIcon } from '@heroicons/vue/outline';
import { MinusCircleIcon } from '@heroicons/vue/outline';
import { PhotographIcon } from '@heroicons/vue/outline';
import { PauseIcon } from '@heroicons/vue/outline';
import { PlayIcon } from '@heroicons/vue/outline';
import { PlusIcon } from '@heroicons/vue/outline';
import { PlusCircleIcon } from '@heroicons/vue/outline';
import { SaveIcon } from '@heroicons/vue/outline';
import { RefreshIcon } from '@heroicons/vue/outline';
import { TableIcon } from '@heroicons/vue/outline';
import { XCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/outline';
import { TrashIcon } from '@heroicons/vue/outline';
import { LockOpenIcon } from '@heroicons/vue/outline';
import { UploadIcon } from '@heroicons/vue/outline';
import { ExclamationIcon } from '@heroicons/vue/outline';
import { ExclamationCircleIcon } from '@heroicons/vue/outline';

// TODO: add these missing icons
// import Compress from '../../assets/icons/compress.svg';
// import FileExport from '../../assets/icons/file-export.svg';
// import Func from '../../assets/icons/function.svg';
// import Pen from '../../assets/icons/pen.svg';
// import PointerOutline from '../../assets/icons/pointer-outline.svg';
// import PointerSolid from '../../assets/icons/pointer-solid.svg';
// import Polygon from '../../assets/icons/polygon.svg';
// import Redo from '../../assets/icons/redo.svg';
// import Undo from '../../assets/icons/undo.svg';

export const icons = {
  'arrow-down': ArrowDownIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  check: CheckIcon,
  'check-circle': CheckCircleIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  code: CodeIcon,
  // compress: Compress,
  copy: DuplicateIcon,
  cube: CubeIcon,
  download: DocumentDownloadIcon,
  edit: PencilAltIcon,
  expand: ArrowsExpandIcon,
  // 'file-export': FileExport,
  'folder-open': FolderOpenIcon,
  // function: Func,
  grid: ViewGridIcon,
  list: ViewListIcon,
  hand: HandIcon,
  image: PhotographIcon,
  lock: LockClosedIcon,
  'long-arrow-down': ArrowNarrowDownIcon,
  'long-arrow-left': ArrowNarrowLeftIcon,
  'long-arrow-right': ArrowNarrowRightIcon,
  'long-arrow-up': ArrowNarrowUpIcon,
  minus: MinusIcon,
  'minus-circle': MinusCircleIcon,
  pause: PauseIcon,
  pencil: PencilIcon,
  play: PlayIcon,
  plus: PlusIcon,
  // 'pointer-outline': PointerOutline,
  // 'pointer-solid': PointerSolid,
  // polygon: Polygon,
  // redo: Redo,
  save: SaveIcon,
  sync: RefreshIcon,
  table: TableIcon,
  'times-circle': XCircleIcon,
  times: XIcon,
  trash: TrashIcon,
  // undo: Undo,
  unlock: LockOpenIcon,
  upload: UploadIcon,
  warning: ExclamationIcon,
  error: ExclamationCircleIcon,
}

export default {
  name: 'CIcon',
  props: {
    type: {
      type: String,
      default: null,
      validator: (prop) => Object.keys(icons).includes(prop)
    },
    size: {
      type: String,
      default: 'md',
      validator: (prop) => ['3xl', '2xl', 'xl', 'lg', 'md', 'sm'].includes(prop),
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return icons[this.type];
    },
  },
  render() {
    const sizeClasses = {
      sm: 'w-[18px] h-[18px]',
      md: 'w-[24px] h-[24px]',
      lg: 'w-[30px] h-[30px]',
      xl: 'w-[36px] h-[36px]',
      '2xl': 'w-[48px] h-[48px]',
      '3xl': 'w-[64px] h-[64px]'
    }
    const classes = ['flex-none', sizeClasses[this.size]];

    if (this.spin) {
      classes.push('c-spin');
    }

    const node = !this.$slots.default
        ? h(this.icon, {
          class: classes,
        })
        : this.$slots.default()[0];

    // set(node, 'data.on.click', (evt) => this.$emit('click', evt));
    return node;
  },
};
</script>

<style scoped>
.c-spin {
  animation-name: c-spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes c-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
