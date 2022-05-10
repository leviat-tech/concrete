<template>
  <transition name="concrete-alert-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="concrete-alertbox concrete"
      :style="positionStyle"
      role="alert"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CAlertbox',

  data() {
    return {
      message: '',
      duration: 3000,
      visible: false,
      verticalOffset: 20,
      closed: false,
      onClose: null,
      timer: null,
    };
  },

  computed: {
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },

  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  },

  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    },
  },

};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-alertbox {
  width: 24rem;
  border-radius: $radius;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -12rem;
  background-color: $color-pink;
  padding: 0.75rem;
}

.concrete-alert-fade-enter-active,
.concrete-alert-fade-leave-active {
  transition: all .3s ease;
}

.concrete-alert-fade-enter,
.concrete-alert-fade-leave-to {
  opacity: 0;
  transform: translate(0%, -100%);
}

</style>
