<template>

  <div style="display:flex;">
    <div class="space-me" style="width:700px; margin-right:40px;">
      <c-text-input :value="testVal" @input="(val) => testVal = val" />

      <c-text-input :value="testVal" @input="(val) => testVal = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
        <template slot="suffix">
          <span>test2</span>
        </template>
      </c-text-input>

      
      <c-text-input :disabled="true" :value="testVal2" label="Disabled" size="xs" @input="(val) => testVal2 = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
        <template slot="suffix">
          <span>test2</span>
        </template>
      </c-text-input>

      
      <c-text-input :readOnly="true" :value="testVal2" label="Read Only" size="sm" @input="(val) => testVal2 = val" >
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

    
    <div class="space-me" style="width:700px; margin-left:40px;">
      <c-quantity-input :value="testVal3" @input="(val) => testVal3 = val" />

      <c-quantity-input :value="testVal3" @input="(val) => testVal3 = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
        <template slot="suffix">
          <span>test2</span>
        </template>
      </c-quantity-input>

      
      <c-quantity-input :disabled="true" :value="testVal3" label="Disabled" unit="m" size="xs" @input="(val) => testVal3 = val" >
      </c-quantity-input>

      
      <c-quantity-input :readOnly="true" :value="testVal3" label="Read Only"  unit="m" size="sm" @input="(val) => testVal3 = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
      </c-quantity-input>

      
      <c-quantity-input :value="testVal3" label="Label md" unit="mm" size="md" @input="(val) => testVal3 = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
      </c-quantity-input>

      
      <c-quantity-input :value="testVal3" label="Label lg" size="lg" @input="(val) => testVal3 = val" >
        <template slot="prefix">
          <span>test</span>
        </template>
        <template slot="suffix">
          <span>test2</span>
        </template>
      </c-quantity-input>
    </div>
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
      testVal3: 11,
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