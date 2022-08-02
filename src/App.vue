

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
          <c-form-element label="true" field="mrblobby.length" color="indigo">
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
      
      <svg
        class="bg-gray-300"
        viewBox="0 0 100 100"
        width="500"
        height="300"
      >
        <c-draggable-path
          :path="path"
          color="default"
          :active="false"
          @drag-start="startDraggingSection"
          @dragging="dragSection"
          @drag-end="endDraggingSection"
        />
      </svg>
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
import CDraggablePath from './components/DraggablePath/DraggablePath.vue';

import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CNumericInput,
    CTextInput,
    CListbox,
    CButton,
    CInputAffix,
    CFormElement,
    CheckIcon,
    SelectorIcon,
    CDraggablePath,
  },
  data() {
    return {
      value: null,
      value2: 2,
      point: { x: 10, y: 10 },
      point2: { x: 30, y: 30 },
      point3: { x: 10, y: 50 },
      point4: { x: 40, y: 40 },
      point5: { x: 50, y: 50 },
      point6: { x: 60, y: 60 },
      points: [
        { x: 10, y: 10 },
        { x: 30, y: 30 },
        { x: 10, y: 50 },
      ],
      tempPoint: {},
    }
  },
  computed: {
    path() {
      return this.points.map((pt, i) => (i === 0) ? `M${pt.x} ${pt.y} ` : `L${pt.x} ${pt.y} `).join();
    },
  },
  methods: {
    startDraggingSection(pt) {
      this.tempPoint = pt;
    },
    dragSection(pt) {
      const x = this.tempPoint.x - pt.x;
      const y = this.tempPoint.y - pt.y;
      this.points.forEach((point) => {
        point.x -= x;
        point.y -= y;
      });
      this.tempPoint = pt;
    },
    endDraggingSection(pt) {
      this.tempPoint = {};
    },
    setPoint(pt) {
      this.point = pt;
    },
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