<script>
import { h } from 'vue';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  NoSymbolIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CodeBracketIcon,
  CubeIcon,
  Square2StackIcon,
  DocumentArrowDownIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  PencilIcon,
  ArrowsPointingOutIcon,
  FolderOpenIcon,
  Squares2X2Icon,
  Bars4Icon,
  HandRaisedIcon,
  LockClosedIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  MinusIcon,
  MinusCircleIcon,
  PhotoIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  PlusCircleIcon,
  ArrowDownOnSquareIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  TableCellsIcon,
  XCircleIcon,
  XMarkIcon,
  TrashIcon,
  LockOpenIcon,
  ArrowUpTrayIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PrinterIcon,
} from '@heroicons/vue/24/outline';

import {
  CheckCircleIcon as CheckIconSolid,
  ExclamationCircleIcon as ExclamationCircleIconSolid,
  InformationCircleIcon as InfoCircleIconSolid,
  MinusCircleIcon as MinusCircleIconSolid,
  XCircleIcon as TimesCircleIconSolid,
} from '@heroicons/vue/20/solid'

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
import Layers from './icons/Layers.vue';
import { useConcreteForms } from '../../composables/forms';

export const icons = {
  'arrow-down': ArrowDownIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  cancel: NoSymbolIcon,
  check: CheckIcon,
  'check-solid': CheckIconSolid,
  'check-circle': CheckCircleIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  code: CodeBracketIcon,
  cog: CogIcon,
  compress: CompressIcon,
  copy: Square2StackIcon,
  cube: CubeIcon,
  'document-download': DocumentArrowDownIcon,
  download: ArrowDownTrayIcon,
  edit: PencilSquareIcon,
  expand: ArrowsPointingOutIcon,
  'folder-open': FolderOpenIcon,
  function: FunctionIcon,
  grid: Squares2X2Icon,
  list: Bars4Icon,
  hand: HandRaisedIcon,
  image: PhotoIcon,
  lock: LockClosedIcon,
  'long-arrow-down': ArrowLongDownIcon,
  'long-arrow-left': ArrowLongLeftIcon,
  'long-arrow-right': ArrowLongRightIcon,
  'long-arrow-up': ArrowLongUpIcon,
  minus: MinusIcon,
  'minus-solid': MinusCircleIconSolid,
  'minus-circle': MinusCircleIcon,
  pause: PauseIcon,
  pencil: PencilIcon,
  play: PlayIcon,
  plus: PlusIcon,
  'plus-circle': PlusCircleIcon,
  'pointer-outline': PointerOutlineIcon,
  'pointer-solid': PointerSolidIcon,
  printer: PrinterIcon,
  redo: RedoIcon,
  save: ArrowDownOnSquareIcon,
  search: MagnifyingGlassIcon,
  sync: ArrowPathIcon,
  table: TableCellsIcon,
  'times-circle': XCircleIcon,
  times: XMarkIcon,
  trash: TrashIcon,
  undo: UndoIcon,
  unlock: LockOpenIcon,
  upload: ArrowUpTrayIcon,
  warning: ExclamationTriangleIcon,
  'warning-solid': ExclamationCircleIconSolid,
  error: ExclamationCircleIcon,
  'error-solid': TimesCircleIconSolid,
  'zoom-in': MagnifyingGlassPlusIcon,
  'zoom-out': MagnifyingGlassMinusIcon,
  'information-circle': InformationCircleIcon,
  'information-solid': InfoCircleIconSolid,
  'question-circle': QuestionMarkCircleIcon,
  'layers': Layers
};

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
      xs: 'w-3',
      sm: 'w-4',
      md: 'w-6',
      lg: 'w-8',
      xl: 'w-10',
      '2xl': 'w-12',
      '3xl': 'w-16',
    };
    const size = this.size;
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
  inject: {
    concrete: {
      from: 'concrete'
    }
  }
};
</script>
