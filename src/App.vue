

<template>
  <div class="flex">
    
    <div class="w-96 bg-gray-200 h-full flex-col">
      <div class="p-8 font-bold">Concrete 2</div>
      <div class="px-8">
        <div class="">
          <div class="font-semibold pb-2">General</div>
          <div class="">
            <div class="cursor-pointer" @click="setPage('generalColours')">Colours</div>
          </div>
        </div>
      </div> 
      <div class="px-8 py-4">
        <div class="">
          <div class="font-semibold pb-2">Components</div>
          <div class="">
            <div class="cursor-pointer" @click="setPage('componentsButton')">Button</div>
          </div>
        </div>
      </div> 
    </div>
    
    <div class="bg-gray-100 h-full w-full">
      
      <div class="">
        <div v-if="page !== null">
          <component :is="pageComponent"></component>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import generalColoursPage from './pages/General/Colours.vue';
import componentsButtonPage from './pages/Components/Button.vue';


export default {
  data() {
    return {
      page: null,
    }
  },
  computed: {
    pageComponent() {
      return {
        generalColours: generalColoursPage,
        componentsButton: componentsButtonPage,
      }[this.page];
    },
  },
  methods: {
    setPage(page) {
      console.log(page);
      this.page = page;
    }
  }
}
</script>