

<template>
  <div class="flex">
    
    <div class="w-96 bg-gray-200 h-full flex-col">
      <div class="p-8 font-bold">Concrete 2</div>
      <div class="px-8 py-4">
        <div class="">
          <div class="font-semibold pb-2">Components</div>
          <div class="">
          </div>
        </div>
      </div> 
    </div>
    
    <div class="bg-gray-100 h-full w-full">
      
      <div class="m-8 w-64 space-x-4 flex bg-white">
        <CButton @click="takeFocus">Take Focus</CButton> 
      </div>      

      <div class="m-8 w-64 bg-white">
        <c-text-input v-model="value" ref="testid" @enter="blurFocus" @blur="handleBlur" />
      </div>

      <div class="m-8 w-64 bg-white">
        <c-text-input v-model="value" :readOnly="true" />
      </div>

      <div class="m-8 w-64 bg-white">
        <c-text-input v-model="value" :disabled="true" />
      </div>
      
      <div class="p-8 bg-indigo-dark w-96">
        <div class="m-8 w-64">
          <c-text-input v-model="value" color="sky" :transparent="true" />
        </div>
      </div>

      
      <div class="m-8 bg-white w-64">
        <c-text-input v-model="value">
          <template v-slot:prefix>
            <c-input-affix>yo</c-input-affix>
          </template>
          <template v-slot:suffix>
            <c-input-affix type="suffix"><CheckIcon class="h-5 w-5" /></c-input-affix>
          </template>
        </c-text-input>
      </div>
      
      <div class="m-8 bg-white w-64" v-for="color in ['indigo', 'sky', 'steel', 'success', 'warning', 'danger']">
        
        <c-text-input v-model="value" :color="color">
          <template v-slot:prefix>
            <c-input-affix :color="color">yo</c-input-affix>
          </template>
          <template v-slot:suffix>
            <c-input-affix type="suffix" :color="color"><CheckIcon class="h-5 w-5" /></c-input-affix>
          </template>
        </c-text-input>
      </div>
      
    </div>

  </div>
</template>


<script>
import CTextInput from './components/TextInput/TextInput.vue';
import CButton from './components/Button/Button.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CTextInput,
    CButton,
    CInputAffix,
    CheckIcon,
    SelectorIcon
  },
  data() {
    return {
      value: null,
      value2: 'matt',
      value3: [],
    }
  },
  computed: {
  },
  methods: {
    takeFocus() {
      this.$refs.testid.focus();
    },
    blurFocus() {
      this.$refs.testid.blur();
    },
    handleBlur() {
      console.log('rerender if necessary');
    }
  }
}
</script>