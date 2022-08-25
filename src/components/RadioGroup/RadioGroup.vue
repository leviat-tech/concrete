<template>
  <component
    class="relative z-50"
    :is="formElement ? CFormElement : CFragment"
    v-bind="{ id, label, size, color, labelFormatter, message, stacked }"
  >
  <div :class="[ textSizeClass, disabledClass]">
    <RadioGroup 
    class="concrete__radiogroup"
    :class="layoutClass"
    v-model="value" 
    ref="el"
    :disabled='disabled'
    >
      <RadioGroupOption v-for="option in options" :key="option" :value="option" v-slot="{ checked }">
        <div class="flex" >
          <span class="mr-0.5 self-center grow text-right" :class="inputColorClass"> {{ props.formatter ? props.formatter(option) : option }}</span>
              <svg :class="[heightClass,svgColour]" class="self-center" viewBox="0 0 20 20" >
                  <circle cx="10" cy="10" r="7" fill="none" />
                  <circle cx="10" cy="10" r="5.5" stroke="none" v-if="checked"  />
              </svg>
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </div>
  </component>
</template>

<script setup>
import { RadioGroup,  RadioGroupOption } from "@headlessui/vue";
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { computed, ref } from "vue";
import { formElementProps } from '../../composables/props';
import { useInputClasses } from '../../composables/styles';
import {
  useFormElementValue,
  useInputValue,
  useRegisterInput,
  useStackedValue
} from '../../composables/forms.js';
import { useEventHandler } from '../../composables/events.js';

const formElement = useFormElementValue(props.label);

const props = defineProps({
  ...formElementProps,
  modelValue: [String, Object, Array],
  options: { type: Array },
  formatter: { type: Function, default: null },
  transparent: { type: Boolean, default: false },
  columns: {type:Number, default:0},
  onChange: { type: Function, default: null },
});

const value = computed({
  get() {
    return useInputValue(props);
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit('update:modelValue', value);
    onChange();
  },
});

const isDirty = ref(false);
const localValue = ref(null);
const el = ref(null);

const emit = defineEmits(['update:modelValue', 'change']);
const onChange = useEventHandler('change', props, emit, localValue, isDirty);
useRegisterInput(props, el);

const stacked = useStackedValue(props.stacked);

const {
  inputColorClass,
  disabledClass,
  textSizeClass,
  heightClass,
} = useInputClasses(props);

const layoutClass = computed(() => {
  return (props.columns > 0) ? "grid grid-flow-row grid-cols-"+props.columns : "flex flex-wrap justify-end";
})

const svgColour = computed(() => {
    return props.color? 
    "stroke-"+ props.color + " fill-"+ props.color:
    "stroke-black fill-black";
})
</script>