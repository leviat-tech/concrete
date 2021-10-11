<template>
  <div class="bar" :class="type">
    <div class="icon-container" :class="type">
      <slot name="icon">
        <!-- eslint-disable max-len -->
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 1em; vertical-align: -0.125em;">
          <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm42-104c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42zm-81.37-211.401l6.8 136c.319 6.387 5.591 11.401 11.985 11.401h41.17c6.394 0 11.666-5.014 11.985-11.401l6.8-136c.343-6.854-5.122-12.599-11.985-12.599h-54.77c-6.863 0-12.328 5.745-11.985 12.599z"></path>
        </svg>
      </slot>
    </div>
    <div class="text-container">
      <div class="text">
        <span><slot> {{ text }} </slot></span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CStatusBar',
  props: {
    'text': {
      default: '',
    },
    'type': {
      default: 'default',
    },
  },
};
</script>

<style scoped lang="scss">

  @import '../assets/styles/variables.scss';

  .bar {
    display: flex;
    border-width: 2px;
    max-height: 6rem;
    min-height: 3rem;
    
    &.danger {
      border-color: $color-red;
    }

    &.info {
      border-color: $color-blue;
    }
    
    &.warning {
      border-color: $color-orange;
    }

    &.success {
      border-color: $color-green;
    }

    &.default {
      border-color: $color-gray-07;
    }

  }

  .icon-container {
    display: flex;
    align-items: center;
    color: white;
    padding-right: 6px;
    padding-left: 4px;

    
    &.danger {
      background: $color-red;
    }

    &.info {
      background: $color-blue;
    }

    &.warning {
      background: $color-orange;
    }

    &.success {
      background: $color-green;
    }

    &.default {
      background: $color-gray-07;
    }

  }

  .text-container {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
  }

  .text {
    margin: auto 0;
    padding-left: 0.5rem;
    background-color: white;
  }

</style>
