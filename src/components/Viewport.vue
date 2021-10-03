<script>
export default {
  name: 'CViewport',
  render() {
    const slots = this.$scopedSlots.default();

    const slotOptions = slots.map((slot) => ({
      label: slot.componentOptions.propsData.name,
      value: slot.componentOptions.propsData.viewportId,
    }));

    slots.forEach((slot) => {
      slot.componentOptions.propsData.options = slotOptions;
    });

    return (
      <div class="concrete-viewport">
        { slots }
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.concrete-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
