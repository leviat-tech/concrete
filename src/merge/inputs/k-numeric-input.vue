<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
  .k-numeric-input {
    /deep/ input {
      text-align: right;
      &::placeholder {
        text-align: left;
      }
    }
    .unit {
      font-size: 10px;
      + .stepper{
        margin-left: 8px;
      }
    }
    .stepper {
      &.disabled .up-icon, &.disabled .down-icon {
        cursor: not-allowed;
        background: $color-gray-05;
        &:hover {
          background: $color-gray-05;
        }
      }
      .up-icon, .down-icon {
        .k-icon {
          height: 10px;
          width: 11px;
        }
        color: $color-black;
        border: 1px solid $color-gray-04;
        background: $color-white;
        font-family: $font-monospace;
        user-select: none;
        line-height: 10px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: $color-gray-04;
        }
      }
      .up-icon {
        margin-top: 3px;
        border-radius: 5px 5px 0px 0px;
        border-bottom: none;
      }
      .down-icon {
        border-radius: 0px 0px 5px 5px;
        border-top: none;
        margin-bottom: 3px;
      }
    }
  }
</style>


<template>
  <k-input class="k-numeric-input" v-model="valproxy" v-bind="this.$attrs" ref="input">

    <!-- prefix slot -->
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>

    <!-- suffix slot -->
    <template v-if="step || unit" slot="suffix">
      <slot name="suffix"></slot>

      <!-- unit -->
      <div v-if="unit" class="unit">{{unit}}</div>

      <!-- stepper -->
      <div v-if="step" class="stepper v-box" :class="{disabled}">
        <div class="up-icon" @click="up">
          <k-icon class="arrow" icon="fal-angle-up"/>
        </div>
        <div class="down-icon" @click="down">
          <k-icon class="arrow" icon="fal-angle-down"/>
        </div>
      </div>
    </template>
  </k-input>
</template>


<script>
import Big from 'big.js';
import valproxy from '@/extensions/valproxy';

export default {
  name: 'k-numeric-input',
  props: {
    value: null,
    unit: null,
    step: {
      type: Number,
    },
  },
  computed: {
    valproxy,
    input() {
      return this.$refs.input.$refs.input;
    },
    disabled() {
      return this.$attrs.disabled;
    },
  },
  methods: {
    up() {
      if (this.disabled) return;
      try {
        this.input.value = Big(this.input.value).plus(Big(this.step));
      } catch {
        this.input.value = 0;
      }
      this.$emit('input', this.input.value);
    },
    down() {
      if (this.disabled) return;
      try {
        this.input.value = Big(this.input.value).minus(Big(this.step));
      } catch {
        this.input.value = 0;
      }
      this.$emit('input', this.input.value);
    },
  },
};
</script>
