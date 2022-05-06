<template>
  <div>
    <div class="border-b border-gray-200">
      <div class="text-lg font-semibold py-4 px-8">
        Button
      </div>
    </div>
    <div class="space-y-4 p-4" v-for="colour in ['indigo', 'sky', 'steel', 'success', 'warning', 'danger']" :key="colour">

      <div class="space-x-8 flex">
        <Button :color="colour" size="sm" content="left" class="w-full font-bold">test</Button>
        <Button :color="colour" size="sm" >test</Button>
        <Button :color="colour" size="sm" ><div class="h-4 w-4 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="sm" padding="px-0"><div class="h-8 w-8 bg-white opacity-50"></div></Button>

        <Button :color="colour" @click="toggleTestActive" :active="testActive" class="w-full">test</Button>
        <Button :color="colour" >test</Button>
        <Button :color="colour" ><div class="h-6 w-6 bg-white opacity-50"></div></Button>
        <Button :color="colour" padding="px-0"><div class="h-10 w-10 bg-white opacity-50"></div></Button>

        <Button :color="colour" size="lg" disabled content="right" class="w-full">test</Button>
        <Button :color="colour" size="lg" >test</Button>
        <Button :color="colour" size="lg" ><div class="h-8 w-8 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="lg" padding="px-0" ><div class="h-12 w-12 bg-white opacity-50"></div></Button>
      </div>
      <div class="space-x-8 flex">
        <Button :color="colour" size="sm" content="left" fill="outline" class="w-full font-bold">test</Button>
        <Button :color="colour" size="sm" fill="outline">test</Button>
        <Button :color="colour" size="sm" fill="outline"><div class="h-4 w-4 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="sm" fill="outline" padding="px-0"><div class="h-8 w-8 bg-white opacity-50"></div></Button>

        <Button :color="colour" @click="toggleTestActive" fill="outline" :active="testActive" class="w-full">test</Button>
        <Button :color="colour" fill="outline">test</Button>
        <Button :color="colour" fill="outline"><div class="h-6 w-6 bg-white opacity-50"></div></Button>
        <Button :color="colour" fill="outline" padding="px-0"><div class="h-10 w-10 bg-white opacity-50"></div></Button>

        <Button :color="colour" size="lg" disabled content="right" fill="outline" class="w-full">test</Button>
        <Button :color="colour" size="lg" fill="outline">test</Button>
        <Button :color="colour" size="lg" fill="outline"><div class="h-8 w-8 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="lg" fill="outline" padding="px-0" ><div class="h-12 w-12 bg-white opacity-50"></div></Button>
      </div>
      <div class="space-x-8 flex">
        <Button :color="colour" size="sm" content="left" fill="ghost" class="w-full font-bold">test</Button>
        <Button :color="colour" size="sm" fill="ghost">test</Button>
        <Button :color="colour" size="sm" fill="ghost"><div class="h-4 w-4 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="sm" fill="ghost" padding="px-0"><div class="h-8 w-8 bg-white opacity-50"></div></Button>

        <Button :color="colour" @click="toggleTestActive" fill="ghost" :active="testActive" class="w-full">test</Button>
        <Button :color="colour" fill="ghost">test</Button>
        <Button :color="colour" fill="ghost"><div class="h-6 w-6 bg-white opacity-50"></div></Button>
        <Button :color="colour" fill="ghost" padding="px-0"><div class="h-10 w-10 bg-white opacity-50"></div></Button>

        <Button :color="colour" size="lg" disabled content="right" fill="ghost" class="w-full">test</Button>
        <Button :color="colour" size="lg" fill="ghost">test</Button>
        <Button :color="colour" size="lg" fill="ghost"><div class="h-8 w-8 bg-white opacity-50"></div></Button>
        <Button :color="colour" size="lg" fill="ghost" padding="px-0" ><div class="h-12 w-12 bg-white opacity-50"></div></Button>
      </div>


    </div>
  </div>
</template>

<script>
import Button from "../../components/Button.vue";
export default {
    name: "components-button-page",
    components: { Button },
    data() {
      return {
        testActive: false,
      }
    },
    methods: {
      toggleTestActive() {
        console.log({ testActive: this.testActive });
        this.testActive = !this.testActive;
      },
    }
}
</script>