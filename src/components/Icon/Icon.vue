<script>
import { h } from 'vue'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BanIcon,
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
  SearchIcon,
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


import { colorProp, useSizeProp } from '../../composables/props';
import logger from '../../utils/logger';

// TODO: add these missing icons
// import Polygon from '../../assets/icons/polygon.svg';
// import Pen from '../../assets/icons/pen.svg';
import PointerOutlineIcon from './icons/PointerOutlineIcon.vue';
import PointerSolidIcon from './icons/PointerSolidIcon.vue';
import CompressIcon from './icons/CompressIcon.vue';
import FunctionIcon from './icons/FunctionIcon.vue';
import RedoIcon from './icons/RedoIcon.vue';
import UndoIcon from './icons/UndoIcon.vue';
import { useSizeValue } from '../../composables/forms';

export const icons = {
  'arrow-down': ArrowDownIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  cancel: BanIcon,
  check: CheckIcon,
  'check-circle': CheckCircleIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  code: CodeIcon,
  cog: CogIcon,
  compress: CompressIcon,
  copy: DuplicateIcon,
  cube: CubeIcon,
  'document-download': DocumentDownloadIcon,
  download: DownloadIcon,
  edit: PencilAltIcon,
  expand: ArrowsExpandIcon,
  'folder-open': FolderOpenIcon,
  function: FunctionIcon,
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
  'plus-circle': PlusCircleIcon,
  'pointer-outline': PointerOutlineIcon,
  'pointer-solid': PointerSolidIcon,
  // polygon: Polygon,
  redo: RedoIcon,
  save: SaveIcon,
  search: SearchIcon,
  sync: RefreshIcon,
  table: TableIcon,
  'times-circle': XCircleIcon,
  times: XIcon,
  trash: TrashIcon,
  undo: UndoIcon,
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
    size: useSizeProp('3xl'),
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
      sm: 'w-4',
      md: 'w-6',
      lg: 'w-8',
      xl: 'w-10',
      '2xl': 'w-12',
      '3xl': 'w-16'
    }
    const size = useSizeValue(this.props.size);
    const sizeClass = sizes[size];
    const colorClass = this.color && `text-${this.color}`;
    const classes = ['flex-none', colorClass, sizeClass, 'text-sm'];

    if (this.spin) {
      classes.push('animate-spin');
    }

    return this.$slots.default
        ? this.$slots.default()[0]
        : h(icon, {
          class: classes,
        });
  },
};
</script>
