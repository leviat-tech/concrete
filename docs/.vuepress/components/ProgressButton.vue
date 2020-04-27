<template>
  <c-button
    :play="true"
    :fake="true"
    :progress="progress"
    @click="start"
    @cancel="cancel"
  >
    Click for Progress
  </c-button>
</template>

<script>
export default {
  name: 'ProgressButton',
  data() {
    return {
      progress: 0,
      timeoutId: null,
    };
  },
  methods: {
    start() {
      this.progress = 20;
      this.timeoutId = setTimeout(() => {
        this.progress = 100;
      }, 4000);
    },
    cancel() {
      this.progress = 0;
      clearTimeout(this.timeoutId);
    },
  },
}
</script>