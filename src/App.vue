

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
            <div class="relative inline-flex items-center bg-gray-300 py-2 pl-3 pr-4 border border-transparent  text-white">
              yo
            </div>
          </template>
          <template v-slot:suffix>
            <div class="relative inline-flex items-center bg-gray-300 py-2 pl-3 pr-4 border border-transparent whitespace-nowrap  text-white">
              big up
            </div>
          </template>
        </CListbox>
      </div>
      
      <div class="m-8 w-64 bg-white">
        <CListbox v-model="value2" :options="options2" ></CListbox>
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

      
      <div class="m-8 w-48 bg-white">
        <CListbox v-model="value" :options="options"></CListbox>
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
export default {
  components: {
    CListbox,
    CButton,
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