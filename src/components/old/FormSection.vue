
<template>
  <div class="section">

    <div class="header">
      <slot name="title">
        <h2 v-if="title">{{ title }}</h2>
      </slot>
      <slot name="toolbar"></slot>
    </div>

    <div class="section">
      <slot />
    </div>
  </div>
</template>

<script>
export const CFormGroup = {
  name: 'CFormGroup',
  functional: true,
  render(createElement, context) {
    return createElement(
      'div',
      { ...context.data, class: `${context.class || ''} section` },
      context.children,
    );
  },
};

export default {
  name: 'CFormSection',
  props: ['title'],
};
</script>

<style scoped lang="scss">

  h2 {
    font-weight: bold;
    margin-bottom: 1.25rem;
  }

  .section {
    display: flex;
    width: 100%;
  }

  :not(.single-column) .section {
    flex-wrap: wrap;
    justify-content: space-between;

    .input-group {
      flex-basis: 49%;
    }
  }

  .single-column .section {
    flex-direction: column;
    min-width: 20rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
</style>
