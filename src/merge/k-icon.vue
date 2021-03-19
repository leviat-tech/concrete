<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';
</style>


<template>
  <font-awesome-icon class="k-icon" :icon="iconArray" />
</template>


<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// fas collection
import {
  faCaretUp,
  faCaretDown,
  faCaretRight,
  faBars,
  faSave,
  faUndo,
  faRedo,
  faFolderOpen,
} from '@fortawesome/pro-solid-svg-icons';
// far collection
import {
  faSearch,
  faTrash,
  faTimes,
  faCopy,
  faCheck,
  faTrashAlt,
  faExclamationCircle,
} from '@fortawesome/pro-regular-svg-icons';
// fal collection
import {
  faPlus,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/pro-light-svg-icons';

library.add(faSearch);
library.add(faBars);
library.add(faSave);
library.add(faUndo);
library.add(faRedo);
library.add(faFolderOpen);
library.add(faPlus);
library.add(faAngleUp);
library.add(faAngleDown);
library.add(faTrash);
library.add(faTimes);
library.add(faCaretUp);
library.add(faCaretDown);
library.add(faCaretRight);
library.add(faCopy);
library.add(faCheck);
library.add(faTrashAlt);
library.add(faExclamationCircle);

export default {
  name: 'k-icon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconArray() {
      const dash = this.icon.indexOf('-');
      return [this.icon.substring(0, dash), this.icon.substring(dash + 1, this.icon.length)];
    },
  },
};
</script>
