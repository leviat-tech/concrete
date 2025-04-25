<template>
  <component
    :is="wrap ? CFormElement : CFragment"
    v-bind="{
      id: id ? id : autoId,
      label,
      size,
      color,
      disabled,
      labelFormatter,
      message,
      stacked,
      noLabel,
      expandInput: false,
      labelOrder: reverseLabels ? 1 : 0,
      labelClass,
      tooltip,
      cssClass,
      onMouseDown,
    }"
    class="flex relative items-center"
    :class="{ '!justify-start': reverseLabels }"
  >
    <div
      class="concrete__checkbox flex"
      :class="[reverseLabels ? 'order-1 pr-2' : 'pl-2', cssClass]"
    >
      <span class="sr-only">{{ srLabel }}</span>
      <Switch
        ref="switchRef"
        :disabled="disabled"
        :id="id"
        @mousedown="onMouseDown"
        @keyup.tab="onKeyUp"
        v-model="enabled"
        class="transition-all duration-100 items-center border border-gray-300 focus:outline-none"
        :class="[`h-${sized} w-${sized}`, outlineClass, cursorClass, styleClass]"
      >
        <span class="flex justify-center transition-opacity p-px">
          <transition>
            <CheckIcon v-if="enabled" class="transition delay-200" />
          </transition>
        </span>
      </Switch>
    </div>
  </component>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/20/solid';
import { computed, onMounted, ref } from 'vue';
import { useEventHandler } from '../../composables/events.js';
import { useConcreteForms } from '../../composables/forms';
import { v4 as uuidv4 } from 'uuid';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { useCursorClass } from '../../composables/styles.js';
import FormElementProps from '../../types/FormElementProps.js';

interface Props extends FormElementProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  srLabel?: string;
  cssClass?: String;
  onChange?: Function;
  labelClass?: String;
  modelValue?: boolean;
  transparent?: boolean;
  reverseLabels?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  srLabel: 'Switch',
  transparent: false,
  onChange: undefined,
  modelValue: undefined,
  reverseLabels: false,
});

const { getNoWrapValue, getInputValue, registerInput, getSizeValue, getStackedValue } =
  useConcreteForms();

const autoId = uuidv4();
const emit = defineEmits(['update:modelValue', 'change']);

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const wrap = !getNoWrapValue(props);

const switchRef = ref(null);
const isDirty = ref(false);
const localValue = ref(null);
const preventOutline = ref(null);

const enabled = computed({
  get() {
    return getInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  },
});

const onChange = useEventHandler('change', props, emit, localValue, isDirty);

const cursorClass = useCursorClass(props, 'cursor-pointer');
const sized = { xs: 4, sm: 5, md: 7, lg: 10 }[size];

const styleClass = computed(() => {
  const colour = props.color ? props.color : 'default';
  const style = props.transparent ? 'transparent' : colour;
  if (props.disabled) {
    return 'bg-gray-200 text-gray-400';
  } else if (enabled.value) {
    return {
      default: 'bg-indigo border-indigo text-white focus:ring-indigo-light',
      indigo: 'bg-indigo border-indigo text-white focus:ring-indigo-light',
      sky: 'bg-sky border-sky text-white focus:ring-sky-light',
      steel: 'bg-steel border-steel text-white focus:ring-steel-light',
      success: 'bg-success border-success text-white focus:ring-success-light',
      warning: 'bg-warning border-warning text-white focus:ring-warning-light',
      danger: 'bg-danger border-danger text-white focus:ring-danger-light',
    }[colour];
  } else {
    return {
      transparent: 'bg-transparent text-white focus:ring-indigo-light',
      default: 'bg-white text-white focus:ring-indigo-light',
      indigo: 'bg-white text-white focus:ring-indigo-light',
      sky: 'bg-white text-white focus:ring-sky-light',
      steel: 'bg-white text-white focus:ring-steel-light',
      success: 'bg-white text-white focus:ring-success-light',
      warning: 'bg-white text-white focus:ring-warning-light',
      danger: 'bg-white text-white focus:ring-danger-light',
    }[style];
  }
});

registerInput(props, switchRef);

const onMouseDown = (_event) => (preventOutline.value = true);
const onKeyUp = (_event) => (preventOutline.value = false);

const outlineClass = computed(() => !preventOutline.value && 'focus:ring');

// The Switch component does not accept an id prop
// so we need to override headless UI's default id
// after the component is mounted
onMounted(() => {
  switchRef.value.el.id = props.id ? props.id : autoId;
});
</script>
