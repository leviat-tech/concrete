<template>
  <div
    class="
      flex-1 flex flex-col
      items-center
      justify-center
      border
      rounded-button
      cursor-pointer
      p-4
    "
    :class="
      selected
        ? 'bg-entity-active border-entity-active text-white'
        : ' bg-white border-base-300 text-base-600'
    "
  >
    <div class="flex justify-center items-center">
      <svg class="h-12 w-12 font-bold fill-current" viewBox="0 -960 960 960">
        <path
          d="M263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"
        />
        <g transform="translate(400, -475)">
          <rect x="-15" y="0" width="480" height="225" />

          <text
            x="225"
            y="127"
            font-size="10rem"
            :class="selected ? 'fill-entity-active' : 'fill-white'"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ tidyExtension(ext) }}
          </text>
        </g>
      </svg>
    </div>
    <div class="mt-2 text-center font-semibold uppercase text-sm whitespace-nwrap">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      selected: boolean;
      label: string;
      ext: string;
    }>(),
    {
      ext: '.ext',
      label: 'Label',
    }
  );

  const tidyExtension = (extension) => {
    return extension.toUpperCase().trim().replace('.', '');
  };
</script>
