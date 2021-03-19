<style scoped lang="scss">
  .k-demo {
    margin-bottom: 40px;
    .title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .description {
      color: #304455;
      font-size: 16px;
      font-weight: light;
      margin-bottom: 20px;
    }
    .sample {
      position: relative;
      border-radius: 10px;
      border: 1px solid #ddd;
      padding: 50px;
      background: #f8f8f8;
      * {
        margin-bottom: 10px;
      }

      .bg-toggle {
        margin: 0;
        position: absolute;
        top: 10px;
        right: 10px;
        border: 2px solid #999;
        border-radius: 5px;
        height: 25px;
        width: 25px;
        background: white;
        cursor: pointer;
        &:hover {
          border: 2px solid  #7c95bf;
        }
      }
    }
  }
</style>

<template>
  <div class="k-demo ">
    <div class="title"># <slot name="title">Accordian Tab</slot></div>
    <div class="description">
      <slot name="description"></slot>
    </div>
    <div class="sample c-box" :style="{background}">
      <slot>
      </slot>
      <!-- background toggle -->
      <div class="bg-toggle" :style="{background: backgrounds[index + 1]}" @click="swap"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'k-demo',
  data() {
    return {
      index: 0,
      backgrounds: [
        'white',
        '#f8f8f8',
        '#333333',
      ],
    };
  },
  methods: {
    swap() {
      this.index = (this.index + 1) % this.backgrounds.length;
    },
  },
  computed: {
    background() { return this.backgrounds[this.index]; },
  },
};
</script>
