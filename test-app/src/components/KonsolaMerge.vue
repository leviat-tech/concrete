<template>
  <div class="space-me">
    <c-text-input :value="testVal" @input="(val) => testVal = val" />

    <c-text-input :value="testVal" @input="(val) => testVal = val" >
      <template slot="prefix">
        <span>test</span>
      </template>
      <template slot="suffix">
        <span>test2</span>
      </template>
    </c-text-input>

    
    <c-text-input :disabled="true" :value="testVal2" label="Label xs" size="xs" @input="(val) => testVal2 = val" >
      <template slot="prefix">
        <span>test</span>
      </template>
      <template slot="suffix">
        <span>test2</span>
      </template>
    </c-text-input>

    
    <c-text-input :readOnly="true" :value="testVal2" label="Label sm" size="sm" @input="(val) => testVal2 = val" >
      <template slot="prefix">
        <span>test</span>
      </template>
      <template slot="suffix">
        <span>test2</span>
      </template>
    </c-text-input>

    
    <c-text-input :value="testVal" label="Label md" size="md" @input="(val) => testVal = val" >
      <template slot="prefix">
        <span>test</span>
      </template>
      <template slot="suffix">
        <span>test2</span>
      </template>
    </c-text-input>

    
    <c-text-input :value="testVal" label="Label lg" size="lg" @input="(val) => testVal = val" >
      <template slot="prefix">
        <span>test</span>
      </template>
      <template slot="suffix">
        <span>test2</span>
      </template>
    </c-text-input>
  </div>
</template>

<style lang="scss">


</style>

<script>
export default {
  name: 'KonsolaMerge',
  components: {
  },
  data() {
    return {
      testVal: 't',
      testVal2: 'adgf sdfv',
    };
  },
  methods: {
  },
};
</script>

<style>

.space-me > * + * {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
</style>