<script>
import { h } from 'vue'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CodeIcon,
  CubeIcon,
  DuplicateIcon,
  DocumentDownloadIcon,
  DownloadIcon,
  PencilAltIcon,
  PencilIcon,
  ArrowsExpandIcon,
  FolderOpenIcon,
  ViewGridIcon,
  ViewListIcon,
  HandIcon,
  LockClosedIcon,
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  MinusIcon,
  MinusCircleIcon,
  PhotographIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  PlusCircleIcon,
  SaveIcon,
  RefreshIcon,
  TableIcon,
  XCircleIcon,
  XIcon,
  TrashIcon,
  LockOpenIcon,
  UploadIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@heroicons/vue/outline';


import { colorProp } from '../../composables/props';
import logger from '../../utils/logger';

// TODO: add these missing icons
// import Polygon from '../../assets/icons/polygon.svg';
// import Pen from '../../assets/icons/pen.svg';
import PointerOutline from '../../assets/icons/pointer-outline.svg';
import PointerSolid from '../../assets/icons/pointer-solid.svg';
import Compress from '../../assets/icons/compress.svg';
import Function from '../../assets/icons/function.svg';
import Redo from '../../assets/icons/redo.svg';
import Undo from '../../assets/icons/undo.svg';

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
  cog: CogIcon,
  compress: Compress,
  copy: DuplicateIcon,
  cube: CubeIcon,
  documentDownload: DocumentDownloadIcon,
  download: DownloadIcon,
  edit: PencilAltIcon,
  expand: ArrowsExpandIcon,
  'folder-open': FolderOpenIcon,
  function: Function,
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
  'pointer-outline': PointerOutline,
  'pointer-solid': PointerSolid,
  // polygon: Polygon,
  redo: Redo,
  save: SaveIcon,
  sync: RefreshIcon,
  table: TableIcon,
  'times-circle': XCircleIcon,
  times: XIcon,
  trash: TrashIcon,
  undo: Undo,
  unlock: LockOpenIcon,
  upload: UploadIcon,
  warning: ExclamationIcon,
  error: ExclamationCircleIcon,
  'zoom-in': ZoomInIcon,
  'zoom-out': ZoomOutIcon,
}

export default {
  name: 'CIcon',
  props: {
    type: String,
    color: colorProp,
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
  render() {
    const icon = icons[this.type];

    if (!icon) {
      logger.warn(`CIcon - invalid icon type (${this.type})`);
      return null;
    }

    const sizes = {
      sm: 18,
      md: 24,
      lg: 30,
      xl: 36,
      '2xl': 48,
      '3xl': 64
    }
    const size = sizes[this.size];

    const colorClass = `text-${this.color}`;
    const classes = ['flex-none', colorClass];

    if (this.spin) {
      classes.push('animate-spin');
    }

    return this.$slots.default
        ? this.$slots.default()[0]
        : h(icon, {
          class: classes,
          style: {
            width: size,
            height: size
          }
        });
  },
};
</script>
