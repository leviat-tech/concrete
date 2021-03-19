<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .k-spanner {
    .button {
      color: $color-white;
      background: $color-blue;
      padding: 0px 10px;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
    .k-select {
      color: $color-white;
      /deep/ select {
        border-radius: 0;
        color: $color-white;
        background: $color-blue;
        /// >>> not working text-align: center;
        &:disabled {
          color: $color-white;
          background: $color-blue;
          &:hover {
            border: 1px solid $color-gray-03;
          }
        }
      }
    }
    .k-input {
      /deep/ input {
        border-radius: 0;
        text-align: center;
        &::placeholder {
          text-align: center;
        }
      }
    }
  }
</style>


<template>
  <div class="k-spanner h-box">
    <k-input/>
    <k-select>
      <option>A</option>
      <option>B</option>
    </k-select>

    <k-input/>
    <k-select>
      <option>A</option>
      <option>B</option>
    </k-select>

    <k-input/>
    <div class="button c-box"><k-icon icon="fal-plus"/></div>
  </div>
</template>


<script>
export default {
  name: 'k-spanner',
  props: ['value'],
};
</script>
