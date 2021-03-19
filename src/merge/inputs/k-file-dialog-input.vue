<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
</style>


<template>
  <div>
    <input type="file" ref="file" style="display: none" @change="select">
    <div v-if="$slots.default" @click="open">
      <slot></slot>
    </div>
  </div>
</template>


<script>
// Hidden open file dialog input
// Usage:
//  * open function opens the file dialog
//  * select event is filed when a file is selected

export default {
  name: 'k-file-dialog-input',
  props: ['value'],
  methods: {
    // open the select file dialog
    open() {
      this.$refs.file.click();
    },

    // when a file is selected emit a select event
    async select(event) {
      const file = event.target.files[0];
      if (file) {
        const raw = await this.read(file);
        this.$emit('select', raw);
        this.$refs.file.value = null; // reset value so change will fire again
      }
    },

    // read contents of a select file (promisified)
    async read(file) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new Error('Problem parsing input file.'));
        };
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsText(file);
      });
    },
  },
};
</script>
