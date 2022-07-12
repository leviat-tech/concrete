

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
      
      <div class="m-8 w-48 bg-white">
        <CButton @click="takeFocus">Take Focus</CButton> 
      </div>      

      <div class="m-8 w-64 bg-white">
        <CListbox v-model="value" :options="options" ref="testid">
          <template v-slot:prefix>
            <div class="relative inline-flex items-center bg-gray-300 pl-3 pr-4  text-white">
              yo
            </div>
          </template>
          <template v-slot:suffix>
            <div class="relative inline-flex items-center bg-gray-300 pl-3 pr-4 border border-transparent whitespace-nowrap  text-white">
              big up
            </div>
          </template>
        </CListbox>
      </div>
      
      <div class="p-8 bg-indigo-dark w-96">
        <div class="m-8 w-64">
          <CListbox v-model="value" :options="options" color="sky" :transparent="true">
            <template v-slot:prefix>
              <c-input-affix :transparent="true"  color="sky">yo</c-input-affix>
            </template>
            <template v-slot:suffix>
              <c-input-affix type="suffix" :transparent="true"  color="sky"><CheckIcon class="h-5 w-5" /></c-input-affix>
            </template>
          </CListbox>
        </div>
      </div>
      
      <div class="m-8 bg-white w-64" v-for="color in ['indigo', 'sky', 'steel', 'success', 'warning', 'danger']">
        <CListbox v-model="value" :options="options" :color="color">
          <template v-slot:prefix>
            <c-input-affix  :color="color">yo</c-input-affix>
          </template>
          <template v-slot:suffix>
            <c-input-affix type="suffix"  :color="color"><CheckIcon class="h-5 w-5" /></c-input-affix>
          </template>
        </CListbox>
      </div>
      
      <div class="m-8 w-64 bg-white">
        <CListbox v-model="value3" :options="options" multiple ></CListbox>
      </div>
      
      <div class="m-8 w-64 bg-white">
        <CListbox v-model="value2" :options="options2" :disabled="true"></CListbox>
      </div>

      
      <div class="m-8 w-48 ">
        <CListbox v-model="value" :options="options" :transparent="true" color="sky" optionListSize="xs"></CListbox>
      </div>
      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value2" :options="options2" color="success"></CListbox>
      </div>

      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value" :options="options" color="warning"></CListbox>
      </div>
      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value2" :options="options2" color="danger"></CListbox>
      </div>

      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value" :options="options" color="steel"></CListbox>
      </div>
      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value2" :options="options2" color="indigo"></CListbox>
      </div>

      
      <div class="m-8 bg-white flex space-x-8">
        <div class="w-36"><CListbox v-model="value" :options="options" size="xs"></CListbox></div>
        <div class="w-36"><CListbox v-model="value" :options="options" size="sm"></CListbox></div>
        <div class="w-36"><CListbox v-model="value" :options="options" size="md"></CListbox></div>
        <div class="w-36"><CListbox v-model="value" :options="options" size="lg"></CListbox></div>
      </div>
      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value2" :options="options2"></CListbox>
      </div>
    </div>

  </div>
</template>


<script>
import CListbox from './components/Listbox/Listbox.vue';
import CButton from './components/Button/Button.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CListbox,
    CButton,
    CInputAffix,
    CheckIcon,
    SelectorIcon
  },
  data() {
    return {
      options: ['test','other','me', 'stop'],
      value: null,
      options2: [
        { value:'dave', label: 'Dave' },
        { value:'matt', label: 'Matt' },
        { value:'luke', label: 'Luke' },
      ],
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
  }
}
</script>