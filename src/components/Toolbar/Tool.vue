<template>
  <button :title="name"
    :class="[
      staticClasses,
      heightClass,
      colorClass,
      textButton && 'px-2' || widthClass,
    ]"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    @mouseleave="mousedown = false"
    @click="onClick"
  >
    <template v-if="textButton">{{ name }}</template>
    <CIcon v-else-if="icon" :type="icon" />
    <slot v-else/>
  </button>

</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useSizeProp, colorProp } from '../../composables/props.js';
import { useConcreteForms } from '../../composables/forms';
import CIcon from '../Icon/Icon.vue';

const props = defineProps({
  name: { type: String, default: '' },
  toolId: { type: String },
  icon: { type: String, default: null },
  textButton: { type: Boolean, default: false },
  stateful: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hoverable: { type: Boolean, default: true },
  size: useSizeProp(),
  color: colorProp,
});

const emit = defineEmits(['click']);

const selectedTool = inject('concreteSelectedTool');
const isActive = props.stateful ? computed(() => selectedTool.value === props.toolId) : false;
const mousedown = ref(false);

const size = useConcreteForms().getSizeValue(props.size);
const heightClass = computed(() => ({
    xs: 'h-8 text-xs p-[8px]',
    sm: 'h-8 text-sm p-[6px]',
    md: 'h-10 text-base p-[8px]',
    lg: 'h-12 text-lg p-[8px]',
  }[size]
));
const widthClass = computed(() => ({
    xs: 'w-8',
    sm: 'w-8',
    md: 'w-10',
    lg: 'w-12',
  }[size]
));


//!disabled && hoverable && !isActive && 'hover:border-gray-300',
  //    (isActive || mousedown) && !disabled && 'border-gray-400 bg-gray-500 bg-opacity-5',
  //    disabled && 'text-gray-400 cursor-default',


const staticClasses = 'flex items-center justify-center border rounded-input concrete__tool';

const classMap = {
  'base-enabled': ' hover:border-base-700 hover:bg-base-700 hover:text-white',
  'base-default': ' border-base-500 text-base-500',
  'base-active': ' border-base-800 bg-base-800 text-white',

  'brand-enabled': ' hover:border-brand-700 hover:bg-brand-700 hover:text-white',
  'brand-default': ' border-brand-500 text-brand-500',
  'brand-active': ' border-brand-800 bg-brand-800 text-white',

  'info-enabled': ' hover:border-info-700 hover:bg-info-700 hover:text-white',
  'info-default': ' border-info-500 text-info-500',
  'info-active': ' border-info-800 bg-info-800 text-white',

  'magic-enabled': ' hover:border-magic-700 hover:bg-magic-700 hover:text-white',
  'magic-default': ' border-magic-500 text-magic-500',
  'magic-active': ' border-magic-800 bg-magic-800 text-white',

  'success-enabled': ' hover:border-success-700 hover:bg-success-700 hover:text-white',
  'success-default': ' border-success-500 text-success-500',
  'success-active': ' border-success-800 bg-success-800 text-white',

  'warning-enabled': ' hover:border-warning-700 hover:bg-warning-700 hover:text-white',
  'warning-default': ' border-warning-500 text-warning-500',
  'warning-active': ' border-warning-800 bg-warning-800 text-white',

  'danger-enabled': ' hover:border-danger-700 hover:bg-danger-700 hover:text-white',
  'danger-default': ' border-danger-500 text-danger-500',
  'danger-active': ' border-danger-800 bg-danger-800 text-white',
}

const color = computed(() => (!props.color || props.color === 'default') ? 'base' : props.color);
// border-transparent
const colorClass = computed(() => {
  const c = color.value;
  let className = '';
  if(props.disabled) className += 'opacity-50 cursor-not-allowed';
  else if (props.hoverable) className += classMap[`${c}-enabled`];
  className += (isActive.value) ? classMap[`${c}-active`] : classMap[`${c}-default`];   
  return className;
})





const onClick = () => {
  if (props.disabled) return;

  if (props.stateful) {
    selectedTool.value = props.toolId;
  }

  emit('click', props.toolId);
}
</script>
