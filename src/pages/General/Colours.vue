<template>
  <div>
    <div class="border-b border-gray-200">
      <div class="text-lg font-semibold py-4 px-8">
        Colours
      </div>
    </div>
    <div class="space-x-8 p-8 flex">
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">Colour</div>
        <div class="h-20">lightest</div>
        <div class="h-20">light</div>
        <div class="h-20">DEFAULT</div>
        <div class="h-20">dark</div>
        <div class="h-20">darkest</div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">indigo</div>
        <div class="h-20 bg-indigo-lightest border-indigo-lightest text-indigo-lightest hover:bg-indigo-lightest hover:border-indigo-lightest hover:text-indigo-lightest"></div>
        <div class="h-20 bg-indigo-light border-indigo-light text-indigo-light hover:bg-indigo-light hover:border-indigo-light hover:text-indigo-light"></div>
        <div class="h-20 bg-indigo border-indigo text-indigo hover:bg-indigo hover:border-indigo hover:text-indigo"></div>
        <div class="h-20 bg-indigo-dark border-indigo-dark text-indigo-dark hover:bg-indigo-dark hover:border-indigo-dark hover:text-indigo-dark"></div>
        <div class="h-20 bg-indigo-darkest border-indigo-darkest text-indigo-darkest hover:bg-indigo-darkest hover:border-indigo-darkest hover:text-indigo-darkest"></div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">sky</div>
        <div class="h-20 bg-sky-lightest border-sky-lightest text-sky-lightest hover:bg-sky-lightest hover:border-sky-lightest hover:text-sky-lightest"></div>
        <div class="h-20 bg-sky-light border-sky-light text-sky-light hover:bg-sky-light hover:border-sky-light hover:text-sky-light"></div>
        <div class="h-20 bg-sky border-sky text-sky hover:bg-sky hover:border-sky hover:text-sky"></div>
        <div class="h-20 bg-sky-dark border-sky-dark text-sky-dark hover:bg-sky-dark hover:border-sky-dark hover:text-sky-dark"></div>
        <div class="h-20 bg-sky-darkest border-sky-darkest text-sky-darkest hover:bg-sky-darkest hover:border-sky-darkest hover:text-sky-darkest"></div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">steel</div>
        <div class="h-20 bg-steel-lightest border-steel-lightest text-steel-lightest hover:bg-steel-lightest hover:border-steel-lightest hover:text-steel-lightest"></div>
        <div class="h-20 bg-steel-light border-steel-light text-steel-light hover:bg-steel-light hover:border-steel-light hover:text-steel-light"></div>
        <div class="h-20 bg-steel border-steel text-steel hover:bg-steel hover:border-steel hover:text-steel"></div>
        <div class="h-20 bg-steel-dark border-steel-dark text-steel-dark hover:bg-steel-dark hover:border-steel-dark hover:text-steel-dark"></div>
        <div class="h-20 bg-steel-darkest border-steel-darkest text-steel-darkest hover:bg-steel-darkest hover:border-steel-darkest hover:text-steel-darkest"></div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">success</div>
        <div class="h-20 bg-success-lightest border-success-lightest text-success-lightest hover:bg-success-lightest hover:border-success-lightest hover:text-success-lightest"></div>
        <div class="h-20 bg-success-light border-success-light text-success-light hover:bg-success-light hover:border-success-light hover:text-success-light"></div>
        <div class="h-20 bg-success border-success text-success hover:bg-success hover:border-success hover:text-success"></div>
        <div class="h-20 bg-success-dark border-success-dark text-success-dark hover:bg-success-dark hover:border-success-dark hover:text-success-dark"></div>
        <div class="h-20 bg-success-darkest border-success-darkest text-success-darkest hover:bg-success-darkest hover:border-success-darkest hover:text-success-darkest"></div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">warning</div>
        <div class="h-20 bg-warning-lightest border-warning-lightest text-warning-lightest hover:bg-warning-lightest hover:border-warning-lightest hover:text-warning-lightest"></div>
        <div class="h-20 bg-warning-light border-warning-light text-warning-light hover:bg-warning-light hover:border-warning-light hover:text-warning-light"></div>
        <div class="h-20 bg-warning border-warning text-warning hover:bg-warning hover:border-warning hover:text-warning"></div>
        <div class="h-20 bg-warning-dark border-warning-dark text-warning-dark hover:bg-warning-dark hover:border-warning-dark hover:text-warning-dark"></div>
        <div class="h-20 bg-warning-darkest border-warning-darkest text-warning-darkest hover:bg-warning-darkest hover:border-warning-darkest hover:text-warning-darkest"></div>
      </div>
      <div class="bg-white px-8 py-8 text-center space-y-8 w-48">
        <div class="font-bold">danger</div>
        <div class="h-20 bg-danger-lightest border-danger-lightest text-danger-lightest hover:bg-danger-lightest hover:border-danger-lightest hover:text-danger-lightest"></div>
        <div class="h-20 bg-danger-light border-danger-light text-danger-light hover:bg-danger-light hover:border-danger-light hover:text-danger-light"></div>
        <div class="h-20 bg-danger border-danger text-danger hover:bg-danger hover:border-danger hover:text-danger"></div>
        <div class="h-20 bg-danger-dark border-danger-dark text-danger-dark hover:bg-danger-dark hover:border-danger-dark hover:text-danger-dark"></div>
        <div class="h-20 bg-danger-darkest border-danger-darkest text-danger-darkest hover:bg-danger-darkest hover:border-danger-darkest hover:text-danger-darkest"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'general-colours-page',  
  data() {
    return {
      colours: ['indigo', 'sky', 'steel', 'success', 'warning', 'danger'],
    }
  }
}
</script>