<template>
  <div v-show="pageCount > 1" class="flex items-center">
    <div>
      <button
        class="btn mr-1 rounded"
        @click="pageNumber > 1 && $emit('clickPrevious')"
        @keydown.enter="pageNumber > 1 && $emit('clickPrevious')"
      >
        &#x2190;
      </button>
    </div>
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item === '...'" class="text-center w-8 pt-2">
        <b>...</b>
      </div>
      <button
        v-else
        class="btn ml-1 mr-1 w-10 h-8 rounded"
        :class="{ 'bg-blue-600 text-white': item === pageNumber }"
        @click="$emit('clickPageNumber', item)"
        @keydown.enter="$emit('clickPageNumber', item)"
      >
        {{ item }}
      </button>
    </div>
    <div>
      <button
        class="btn ml-1 rounded"
        @click="pageNumber < pageCount && $emit('clickNext')"
        @keydown.enter="pageNumber < pageCount && $emit('clickNext')"
      >
        <span class="font-extrabold">&#8594;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { range } from "lodash";
export default {
  name: "CPagination",
  props: {
    pageNumber: {
      type: Number,
      required: true,
    },
    pageLimit: {
      type: Number,
      default: 10,
    },
    resultCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.resultCount / this.pageLimit);
    },
    items() {
      const maxButtons = 7;
      if (this.pageCount <= maxButtons) {
        return range(1, this.pageCount + 1);
      }
      const left = Math.floor(maxButtons / 2);
      const right = this.pageCount - left + 1;
      if (this.pageNumber > left && this.pageNumber < right) {
        const start = this.pageNumber - left + 2;
        const end = this.pageNumber + left - 2;
        return [1, "...", ...range(start, end + 1), "...", this.pageCount];
      }
      if (this.pageNumber === left) {
        const end = this.pageNumber + left - 1;
        return [...range(1, end + 1), "...", this.pageCount];
      }
      if (this.pageNumber === right) {
        const start = this.pageNumber - left + 1;
        return [1, "...", ...range(start, this.pageCount + 1)];
      }
      return [
        ...range(1, left + 1),
        "...",
        ...range(right, this.pageCount + 1),
      ];
    },
  },
};
</script>
