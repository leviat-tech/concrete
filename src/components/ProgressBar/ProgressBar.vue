<template>
  <component
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
    }"
  >
    <div class="relative border border-gray-300 bg-white" :class="heightClass">
      <div
        v-if="percentageValue > 0.01 && !isFetching"
        class="absolute h-full left-0 ring-1 transition-all duration-500"
        :class="statusBarClass"
        :style="{ width }"
      >
      </div>
      <div
        class="transition duration-400"
        :class="[ textClass, displayValues ? 'opacity-100' : 'opacity-0']"
      >
        <template v-if="!isFetching">
          <div class="text-black transition-all duration-400"
               :class="textClass"
               :style="{ clipPath: `inset(0% 0% 0% ${width})` }">
            {{ percentageValue }}%
          </div>
          <span class="text-white">{{ percentageValue }}%</span>
        </template>
        <CIcon
          v-else
          type="sync"
          size="xs"
          class="transition-all duration-1000 w-5 h-5 animate-spin mx-auto"
        />
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import CIcon from '../Icon/Icon.vue';
import CFormElement from '../FormElement/FormElement.vue';
import CFragment from '../Fragment/Fragment.vue';
import { formElementProps } from '../../composables/props';
import { useInputClasses } from '../../composables/styles';
import { useConcreteForms } from '../../composables/forms';

const props = defineProps({
  ...formElementProps,
  label: String,
  modelValue: Number,
  isFetching: Boolean,
});


const {

  getNoWrapValue,
  getInputValue,
} = useConcreteForms();

const wrap = !getNoWrapValue(props);

const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

const {
  heightClass,
  textSizeClass,
} = useInputClasses(props);

const isMounted = ref(false);
const displayValues = ref(false);

const percentageValue = computed(() => {
  const value = getInputValue(props);

  return Math.round(value * 10000) / 100;
})

const statusBarClass = computed(() => {
  const { value } = percentageValue;
  const ringClass = (value > 0 && value < 100) ? 'ring-success' : 'ring-danger';
  const colorClass = value > 100 ? 'bg-danger' : 'bg-success';
  return [ringClass, colorClass];
});

const textClass = computed(() => {
  const baseTextClass = 'absolute inset-0 flex items-center justify-center'
  if (Number.isNaN(percentageValue.value)) return baseTextClass + ' text-red-500';
  return [textSizeClass, baseTextClass];
});

const width = computed(() => {
  // Display number to 2dp where applicable
  const displayValue = Math.min(percentageValue.value, 100);
  return isMounted.value ? `${displayValue}%` : 0;
});

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 100);

  setTimeout(() => {
    displayValues.value = true;
  }, 600);
});
</script>
