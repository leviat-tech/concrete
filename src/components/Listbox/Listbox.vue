<template>
  <Listbox
    as="div"
    :id="id"
    v-model="selectedValue"
    :disabled="disabled" 
    :multiple="multiple"
    v-slot="{ open }"
  >
    <div :class="['relative', disabledClass]">
      <div class="inline-flex  w-full">
        <div class="relative z-0 inline-flex w-full">
          <slot name="prefix" class="z-10"/>
          <ListboxButton
            ref="buttonRef"
            :class="['relative truncate z-20 w-full border text-left focus:outline-none focus:ring-1 focus:border-indigo-light focus:ring-indigo-light',
            bgColor,
            colorClass,
            sizeClass,
            cursorClass,
            ]"
          >
            <span class="block truncate">{{ selectedLabel }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon :class="[iconColorClass, iconSizeClass]" aria-hidden="true" />
            </span>
          </ListboxButton>
          <slot name="suffix" class="z-10" />
        </div>
      </div>

      <div v-show="open">
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions
            static 
            :class="[
              'absolute z-10 mt-1 w-full bg-white shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
              maxOptionsHeightClass
            ]"
          >
            <ListboxOption
              as="template"
              v-for="option in localOptions"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              v-slot="{ active, selected }"
            >
              <li :class="[active ? 'text-white bg-indigo' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ option.label }}
                </span>

                <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </div>
  </Listbox>
</template>

<script setup>

  import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue';
  import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
  import { computed, ref, reactive } from 'vue';
  import isPlainObject from 'lodash/isPlainObject';

  const props = defineProps({
    id: {
      type: String,
      default: null,
    },
    modelValue: [String, Object, Array],
    color: {
      type: String,
      default: 'default',
      validator: (prop) => ['default', 'indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value)
      }
    },
    options: {
      type: Array,
      default(rawProps) { return [] },
    },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    formatter: { type: Function, default: null },
    placeholder: { type: String, default: 'Select option' },
    transparent: { type: Boolean, default: false },
    optionListSize: {
      type: String,
      default: 'md',
      validator(value) {
        return ['auto', 'xs', 'sm', 'md', 'lg'].includes(value)
      }
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const selectedValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  });

  const localOptions = computed(() => {
    return props.options.map((o) => {
      const opt = isPlainObject(o) ? o : { label: o, value: o };
      return props.formatter ? { ...opt, label: props.formatter(opt.value) } : opt;
    });
  });

  const selectedLabel = computed(() => {
    let sv = selectedValue.value
    if(!props.multiple) {
      sv = [selectedValue.value];
    }
    const labels = sv.filter((s) => s != null).map((s) => localOptions.value.find((o) => o.value === s)?.label);
    const label = labels.join(', ');
    return (label.length > 0) ? label : props.placeholder;
  });

  const sizeClass = {
    xs: 'h-6 text-xs pl-3 pr-6 py-0.5',
    sm: 'h-8 text-sm pl-3 pr-8 py-1',
    md: 'h-10 text-base pl-3 pr-10 py-2',
    lg: 'h-12 text-lg pl-3 pr-12 py-2',
  }[props.size || 'md'];

  const iconSizeClass = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[props.size || 'md'];

  const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-default';

  const maxOptionsHeightClass = {
    auto: '',
    xs: 'max-h-28',
    sm: 'max-h-44',
    md: 'max-h-60',
    lg: 'max-h-96',
  }[props.optionListSize || 'md'];
  
  const bgColor =  (props.transparent) ? 'bg-transparent' : 'bg-white';

  const colorClass = computed(() => {
    return {
      default: 'border-gray-300 text-black',
      indigo: 'border-indigo-light text-indigo-darkest',
      sky: 'border-sky-light text-sky-darkest',
      steel: 'border-steel-light text-steel-darkest',
      success: 'border-success-light text-success-darkest',
      warning: 'border-warning-light text-warning-darkest',
      danger: 'border-danger-light text-danger-darkest',
    }[props.color];
  });

  const iconColorClass = computed(() => {
    return {
      default: 'text-gray-400',
      indigo: 'text-indigo-light',
      sky: 'text-sky-light',
      steel: 'text-steel-light',
      success: 'text-success-light',
      warning: 'text-warning-light',
      danger: 'text-danger-light',
    }[props.color];
  });


  const disabledClass = computed(() => {
    return (props.disabled) && 'opacity-60';
  });

  const buttonRef = ref(null);

  const focus = () => {
    buttonRef.value.$el.focus();
  }

  defineExpose({
    focus,
  });

</script>