<script>
import { h } from 'vue';

export default {
  props: {
    child: Object,
  },
  render() {
    const { type, props, children } = this.child;
    return h(type, props, children);
  },
};
</script>
