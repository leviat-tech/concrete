<template>
    <component
      class="relative"
      :is="wrap ? CFormElement : CFragment"
      v-bind="{
        id,
        label,
        size,
        color,
        disabled,
        labelFormatter,
        message,
        stacked,
        noLabel,
        tooltip,
        buttonClass,
      }"
    >
      <div
        class="flex pb-px pr-px"
        :class="[disabledClass]"
      >
        <RadioGroup
          class="concrete__buttongroup"
          v-model="value"
          ref="el"
          :disabled="disabled"
          :class="layoutClass"
        >
          <RadioGroupOption
            v-for="option in opts"
            :key="option"
            :value="option"
            v-slot="{ checked }"
          >
          <span
              :class="[inputColorClass]"
            >
            <CButton
              class="-mb-px -mr-px"
              :class="[buttonClass]"
                :id=option
                :color="color"
                :fill="checked ? 'solid' : 'outline'"
                :size="size"
                >{{ getFormattedText(option) }}
              </CButton>
          </span>
          </RadioGroupOption>
        </RadioGroup>
      </div>
    </component>
  </template>

<script setup>
	import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
	import CButton from '../Button/Button.vue';
  import CFormElement from '../FormElement/FormElement.vue';
  import CFragment from '../Fragment/Fragment.vue';
  import { computed, ref } from 'vue';
  import { formElementProps } from '../../composables/props';
  import { useInputClasses } from '../../composables/styles';
  import { useConcreteForms } from '../../composables/forms.js';
  import { useEventHandler } from '../../composables/events.js';

  const props = defineProps({
    ...formElementProps,
    modelValue: [String, Object, Array],
    options: { type: Array },
    formatter: { type: Function, default: null },
    transparent: { type: Boolean, default: false },
    columns: { type: Number, default: 0 },
    onChange: { type: Function, default: null },
    buttonClass: [String, Object, Array],
  });

  const {
    getNoWrapValue,
    getInputValue,
    registerInput,
    getStackedValue,
    getInputIdToOptions,
    getSizeValue
  } = useConcreteForms();

  const value = computed({
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

  const isDirty = ref(false);
  const localValue = ref(null);
  const el = ref(null);

  const size = getSizeValue(props.size);
  const buttonClass = props.buttonClass
  const emit = defineEmits(['update:modelValue', 'change']);
  const onChange = useEventHandler('change', props, emit, localValue, isDirty);
  registerInput(props, el);

  const stacked = getStackedValue(props.stacked);
  const wrap = !getNoWrapValue(props);

  const { inputColorClass, disabledClass } =
    useInputClasses(props);

  const layoutClass = computed(() => {
    if (props.columns > 0) return `grid grid-flow-row grid-cols-${props.columns}`;

    return 'flex flex-wrap';
  });
  function getColor(checked) {
    return checked ? props.color : 'steel';
  }
  function getFormattedText(option) {
    return props.formatter ? props.formatter(option) : option;
  }

  const opts = computed(() => getInputIdToOptions(props));
  </script>
