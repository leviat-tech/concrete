// value proxy for v-model, you can use this computed property to easily support v-model
// on custom components

const valproxy = {
  get() { return this.value; },
  set(v) { this.$emit('input', v); },
};

export default valproxy;
