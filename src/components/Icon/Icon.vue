<template>
  <slot v-if="$slots.default" />

  <component v-else :is="iconComponent" :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
  BoltIcon,
} from '@heroicons/vue/24/outline';

import {
  CheckCircleIcon as CheckIconSolid,
  ExclamationCircleIcon as ExclamationCircleIconSolid,
  InformationCircleIcon as InfoCircleIconSolid,
  MinusCircleIcon as MinusCircleIconSolid,
  XCircleIcon as TimesCircleIconSolid,
  BoltIcon as BoltIconSolid,
} from '@heroicons/vue/20/solid';

import PointerOutlineIcon from './icons/PointerOutlineIcon.vue';
import PointerSolidIcon from './icons/PointerSolidIcon.vue';
import CompressIcon from './icons/CompressIcon.vue';
import FunctionIcon from './icons/FunctionIcon.vue';
import RedoIcon from './icons/RedoIcon.vue';
import UndoIcon from './icons/UndoIcon.vue';
import Layers from './icons/Layers.vue';

import { AvailableColors, AvailableSizes } from '../../types/FormElementProps';

const icons = {
  'arrow-down': ArrowDownIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  bolt: BoltIcon,
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
  layers: Layers,
  'bolt-solid': BoltIconSolid,
};

const props =
  defineProps<{
    spin?: boolean;
    size: AvailableSizes;
    color?: AvailableColors;
    type: keyof typeof icons;
  }>();

const sizeClass = computed(() => {
  const sizes: Record<AvailableSizes, string> = {
    xs: 'w-3',
    sm: 'w-4',
    md: 'w-6',
    lg: 'w-8',
    xl: 'w-10',
    '2xl': 'w-12',
    '3xl': 'w-16',
  };
  return sizes[props.size];
});

const iconComponent = computed(() => {
  const icon = icons[props.type];

  if (!icon) {
    console.warn(`CIcon - invalid icon type (${props.type})`);
  }
  return icon;
});

const classes = computed(() => {
  const base = ['flex-none', 'text-sm'];
  if (colorClass.value) {
    base.push(colorClass.value);
  }
  if (sizeClass.value) {
    base.push(sizeClass.value);
  }
  if (props.spin) {
    base.push('animate-spin');
  }
  return base;
});

const colorClass = computed(() => props.color && `text-${props.color}`);
</script>
