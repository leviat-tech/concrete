<template>
  <button
    :class="[sizeClass, colourClass, disabledClass, paddingClass]"
    :disabled="disabled"
    @click.self="click"
  >
    <div class="">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (prop) => ['lg', 'md', 'sm', 'xs'].includes(prop),
    },
    color: {
      type: String,
      default: 'indigo',
      validator: (prop) => ['indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
    },
    fill: {
      type: String,
      default: 'solid',
      validator: (prop) => ['solid', 'outline', 'ghost'].includes(prop),
    },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    customPadding: { type: Boolean, default: false },
  },
  data() {
    return {
    };
  },
  computed: {
    paddingClass() {
      return (this.customPadding) ? '' : 'px-2';
    },
    colourClass() {
      let className = '';
      if(this.fill === 'solid') {
        className += 'border';
        if(this.disabled) {
          className += ` border-${this.color}-light bg-${this.color}-light text-${this.color}-lightest`;
        }
        else {
          className += ` text-white hover:border-${this.color}-dark hover:bg-${this.color}-dark`;
          if (this.active) { 
            className += ` border-${this.color}-darkest bg-${this.color}-darkest `;
          }
          else {
            className += ` border-${this.color} bg-${this.color} `;
          }
        }
      } else if (this.fill === 'outline') {
        className += 'border';
        if(this.disabled) {
          className += ` border-${this.color}-lightest text-${this.color}-lightest`;
        }
        else {
          className += ` hover:text-white hover:bg-${this.color}`;
          if (this.active) { 
            className += `  bg-${this.color}-darkest border-${this.color}-darkest text-white`;
          }
          else {
            className += ` border-${this.color} text-${this.color}`;
          }
        }
      } else {
        if(this.disabled) {
          className += `text-${this.color}-light`;
        }
        else {
          className += `text-${this.color} hover:text-${this.color}-dark`;
          if (this.active) { 
            className += `  text-${this.color}-darkest `;
          }
          else {
            className += ` text-${this.color}`;
          }
        }
      }
      return className;
    },
    sizeClass() {
      switch(this.size) {
        case 'xs':
          return 'h-6 text-xs';
        case 'sm':
          return 'h-8 text-sm';
        case 'md':
          return 'h-10 text-base';
        case 'lg':
          return 'h-12 text-lg';
      }
    },
    disabledClass() {
      return (this.disabled) ? 'cursor-not-allowed' : 'cursor-pointer';
    }
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>