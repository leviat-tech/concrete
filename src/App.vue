

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
        <c-button>Take Focus</c-button> 
      </div>      

      <div class="m-8 w-64 bg-white">
        <c-numeric-input v-model="value" unit="m"  />
      </div>

      <div class="m-8">   
        <c-form-section title="Heading">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">            
            <c-numeric-input  label="Elementy 1" color="success"></c-numeric-input>
            <c-numeric-input  label="Elementy 3: the thirdy element"></c-numeric-input>
            <c-numeric-input label="Element 4" color="warning" message="Warning Message Here"></c-numeric-input>
            <c-form-element label="Element 6" size="md">
              <div class="w-full flex space-x-4">
                <c-numeric-input class="" :isFormElement="true" size="md">
                  <template v-slot:prefix>
                    <c-input-affix>Min</c-input-affix>
                  </template>
                </c-numeric-input>
                <c-numeric-input class="" :isFormElement="true" size="md" color="warning" message="warning message here">
                  <template v-slot:prefix>
                    <c-input-affix>Max</c-input-affix>
                  </template>
                </c-numeric-input>
              </div>
            </c-form-element>
          </div>
        </c-form-section>
      </div>

      <div class="m-8">   
        <c-form-section title="Heading" :underline="true" size="xs">
          <template #toolbar>
            <span class="cursor-pointer mr-2 mt-1" @click="addLayer">
              <SelectorIcon class="h-3 w-3" />
            </span>
          </template>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 my-4">            
            <c-numeric-input  label="Elementy 1" color="success"></c-numeric-input>
            <c-numeric-input  label="Elementy 3: the thirdy element"></c-numeric-input>
            <c-numeric-input label="Element 4" color="warning" message="Warning Message Here"></c-numeric-input>
            <c-form-element label="Element 6" size="md">
              <div class="w-full flex space-x-4">
                <c-numeric-input class="" :isFormElement="true" size="md">
                  <template v-slot:prefix>
                    <c-input-affix>Min</c-input-affix>
                  </template>
                </c-numeric-input>
                <c-numeric-input class="" :isFormElement="true" size="md" color="warning" message="warning message here">
                  <template v-slot:prefix>
                    <c-input-affix>Max</c-input-affix>
                  </template>
                </c-numeric-input>
              </div>
            </c-form-element>
          </div>
        </c-form-section>
      </div>

      <div class="m-8">   
        <c-form-section title="Heading">
          <template #title>
            <div class="flex justify-between bg-indigo-light text-yellow-300 px-4 py-2">
              <div class="w-full">
                <span class="font-bold">Heading</span>  
              </div>
              <span class="cursor-pointer" @click="addLayer">
                <SelectorIcon class="h-6 w-6" />
              </span>
            </div>
          </template>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4 px-4 bg-indigo-lightest">            
            <c-numeric-input  label="Elementy 1" color="success"></c-numeric-input>
            <c-numeric-input  label="Elementy 3: the thirdy element"></c-numeric-input>
            <c-numeric-input label="Element 4" color="warning" message="Warning Message Here"></c-numeric-input>
            <c-form-element label="Element 6" size="md">
              <div class="w-full flex space-x-4">
                <c-numeric-input class="" :isFormElement="true" size="md">
                  <template v-slot:prefix>
                    <c-input-affix>Min</c-input-affix>
                  </template>
                </c-numeric-input>
                <c-numeric-input class="" :isFormElement="true" size="md" color="warning" message="warning message here">
                  <template v-slot:prefix>
                    <c-input-affix>Max</c-input-affix>
                  </template>
                </c-numeric-input>
              </div>
            </c-form-element>
          </div>
        </c-form-section>
      </div>



      <div class="m-8">      
        <div class="mb-4">
          Heading
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
          <div class="flex flex-row justify-between">
            <div class="basis-1/2 pr-8  h-10 flex flex-col justify-center">
              <span class="line-clamp-2 leading-none">
                Elementy 1
              </span>
            </div>
            <div class="w-full">
              <c-text-input  color="success"></c-text-input>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="basis-1/2 pr-8  h-10 flex flex-col justify-center">
              <span class="line-clamp-2 leading-none">
                Element 2
              </span>
            </div>
            <div class="w-full">
              <c-text-input class=""></c-text-input>
            </div>
          </div>
          
          <c-numeric-input :isFormElement="true" label="Elementy 3: the thirdy element"></c-numeric-input>
          <div class="flex flex-row justify-between">
            <div class="basis-1/2 pr-8  h-10 flex flex-col justify-center">
              <span class="line-clamp-2 leading-none">
                Element 4
              </span>
            </div>
            <div class="w-full">
              <c-text-input  color="warning"></c-text-input>
              <div class="text-xs text-warning">Warning Message Here</div>
            </div> 
          </div>
          <c-numeric-input :isFormElement="true" size="lg" :label="'Element 5'"></c-numeric-input>
          <c-form-element label="Element 6" size="sm">
            <div class="w-full flex space-x-4">
              <c-numeric-input class="" :isFormElement="true" size="sm">
                <template v-slot:prefix>
                  <c-input-affix>Min</c-input-affix>
                </template>
              </c-numeric-input>
              <c-numeric-input class="" :isFormElement="true" size="sm" color="warning" message="warning message here">
                <template v-slot:prefix>
                  <c-input-affix>Max</c-input-affix>
                </template>
              </c-numeric-input>
            </div>
          </c-form-element>
        </div>

      </div>

      
      <div class="m-8">      
        <div class="mb-4 font-semibold pb-2 border-b border-gray-600">
          Heading 2
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <c-numeric-input class="" label="Elementy 1" :stacked="true" message="Tip here"></c-numeric-input>
          <div class="">
            <div class=" mb-1 truncate">
              <span class="leading-none">
                Element 2
              </span>
            </div>
            <c-text-input color="danger"></c-text-input>
            <div class="text-xs text-danger">Error Message Here</div>
          </div>
          <div class="">
            <div class=" mb-1 truncate">
              <span class="leading-none">
                Elementy 3: the thirdy element ershrthg sdg ers ht
              </span>
            </div>
            <c-text-input class=""></c-text-input>
          </div>
          <div class="">
            <div class=" mb-1 truncate">
              <span class="leading-none">
                Element 4
              </span>
            </div>
            <c-text-input class=""></c-text-input>
            <div class="text-xs text-gray-400">Helpful Tip Here</div>
          </div>
          <div class="">
            <div class=" mb-1 truncate">
              <span class="leading-none">
                Element 5
              </span>
            </div>
            <c-text-input class=""></c-text-input>
          </div>
          <div class="">
            <div class=" mb-1 truncate">
              <span class="leading-none">
                Element 6
              </span>
            </div>
            <c-text-input class=""></c-text-input>
          </div>
        </div>

      </div>

      
      <div class="m-8">      
        <div class="mb-4">
          Heading
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
          <div class="flex flex-row justify-between">
            <div class="basis-1/2 pr-8  h-10 flex flex-col justify-center">
              <span class="line-clamp-2 leading-none">
                Elementy 1
              </span>
            </div>
            <div class="w-full">
              <c-text-input  color="success"></c-text-input>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="basis-1/2 pr-8  h-10 flex flex-col justify-center">
              <span class="line-clamp-2 leading-none">
                Element 2
              </span>
            </div>
            <div class="w-full">
              <c-text-input class=""></c-text-input>
            </div>
          </div>
          <c-form-element label="Elementy 3: the thirdy element" size="lg">
            <c-numeric-input class=""></c-numeric-input>
          </c-form-element>
          <c-form-element label="test" :labelFormatter="(l) => l.toUpperCase()" size="xs">
            <c-numeric-input class=""></c-numeric-input>
          </c-form-element>
          <c-form-element field="mrblobby.length" color="indigo">
            <c-numeric-input class="" :value="value2" @input="(v) => value2 = v"></c-numeric-input>
          </c-form-element>
          <c-form-element label="Element 6">
            <div class="w-full flex space-x-4">
            <c-numeric-input class="" v-model="value2" @blur="handleBlur">
              <template v-slot:prefix>
                <c-input-affix>Min</c-input-affix>
              </template>
            </c-numeric-input>
            <c-numeric-input class="">
              <template v-slot:prefix>
                <c-input-affix>Max</c-input-affix>
              </template>
            </c-numeric-input>
        </div>
          </c-form-element>
        </div>
      </div>

      
        
        <c-resizable  class="mb-64 mt-32 bg-sky-light h-96 flex ">
          <c-pane class="" :min="350">
            <div class="text-2xl bg-success-lightest text-success font-bold text-center h-96 py-32">1</div>
          </c-pane>
          <c-pane class="" :min="200">
            <div class="text-2xl bg-danger-lightest text-danger font-bold text-center h-96 py-32">2</div>
          </c-pane>
        </c-resizable>

        
        <c-resizable  class="mb-64 mt-32 bg-sky-light h-96" :horizontal="false">
          <c-pane class="" :min="350">
            <div class="text-2xl bg-success-lightest text-success font-bold text-center h-full w-full">1</div>
          </c-pane>
          <c-pane class="" :min="200">
            <div class="text-2xl bg-danger-lightest text-danger font-bold text-center h-full w-full">2</div>
          </c-pane>
        </c-resizable>



    </div>
  </div>
</template>


<script>
import CTextInput from './components/TextInput/TextInput.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CListbox from './components/Listbox/Listbox.vue';
import CButton from './components/Button/Button.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import { CResizable, CPane } from './components/Resizable';

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CNumericInput,
    CTextInput,
    CListbox,
    CButton,
    CInputAffix,
    CFormElement,
    CFormSection,
    CResizable,
    CPane,
    CheckIcon,
    SelectorIcon,
  },
  data() {
    return {
      value: null,
      value2: 2,
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
    handleBlur(value) {
      console.log('rerender if necessary');
      alert('This is a custom handler for the localHandler input. Value: ' + value);
    }
  }
}
</script>

<style>

.splitpanes--vertical > .splitpanes__splitter {
  min-width: 6px;
  background: linear-gradient(90deg, #ccc, #111);
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 6px;
  background: linear-gradient(0deg, #ccc, #111);
}
</style>