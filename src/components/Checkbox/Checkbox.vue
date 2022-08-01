<template>
  <SwitchGroup>
    <div class="flex items-center">
      <SwitchLabel class="mr-4">{{ srLabel }}</SwitchLabel>
      <Switch :id="id" v-model="enabled" :class="[`absolute right-4 items-center border-2`, `h-${sized} w-${sized}`]">
          <CheckIcon
            v-if="modelValue"
            class="object-scale-down justify-center"
          />
      </Switch>
    </div>
  </SwitchGroup>
</template>


<script setup>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { CheckIcon, } from "@heroicons/vue/solid";
import { computed, ref } from "vue";
import { useEventHandler } from "../../composables/events.js";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  modelValue: Boolean,
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["xs", "sm", "md", "lg"].includes(value);
    },
  },
  srLabel: {
    type: String,
    default: "Checkbox",
  },

  onChange: { type: Function, default: null },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isDirty = ref(false);
const localValue = ref(null);

const enabled = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    isDirty.value = true;
    localValue.value = value;
    emit("update:modelValue", value);
    onChange();
  },
});

const onChange = useEventHandler("change", props, emit, localValue, isDirty);

const sized = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
}[props.size || "md"];
</script>
