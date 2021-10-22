<template>


  <div>

    <div class="h-box">

      <div class="flex flex-col flex-grow">
        <div class="flex-limit v-box scroll project">
           <c-text-input :value="testVal" @input="(val) => testVal = val" >
              <template slot="prefix">
                <span>test</span>
              </template>
              <template slot="suffix">
                <span>test2</span>
              </template>
            </c-text-input>
        </div>
      </div>

      <!-- preview panel -->
      <c-resizable
        class="right flex-limit v-box"
        :min="150"
        :max="700"
      >
        <c-quantity-input :value="testVal3" @input="(val) => testVal3 = val" >
          <template slot="prefix">
            <span>test</span>
          </template>
          <template slot="suffix">
            <span>test2</span>
          </template>
        </c-quantity-input>
      </c-resizable>

    </div>

    <div style="display:flex; margin-bottom:80px;">
      <div class="space-me" style="width:700px; margin-right:40px;">
        
        <button @click="focusSelect">focus</button>

        <c-select :value="testVal4" ref="s1" :options="testOptions" placeholder="Please Select One" @input="(v) => testVal4 = v" size="xs">
          <template slot="prefix">
            <span>xs</span>
          </template>
          <template slot="suffix">
            <span>xs</span>
          </template>
        </c-select>
        <c-select :value="testVal4" :options="testOptions" placeholder="Please Select One" @input="(v) => testVal4 = v" size="sm">
          <template slot="prefix">
            <span>sm</span>
          </template>
          <template slot="suffix">
            <span>sm</span>
          </template>
        </c-select>
        <c-select :value="testVal4" :options="testOptions" placeholder="Please Select One" @input="(v) => testVal4 = v" size="md" >
          <template slot="prefix">
            <span>md</span>
          </template>
          <template slot="suffix">
            <span>md</span>
          </template>
        </c-select>
        <c-select :value="testVal4" :options="testOptions" placeholder="Please Select One" @input="(v) => testVal4 = v" size="lg">
          <template slot="prefix">
            <span>lg</span>
          </template>
          <template slot="suffix">
            <span>lg</span>
          </template>
        </c-select>
      </div>    
    </div>

    <div style="display:flex;">

      <div class="space-me" style="width:700px; margin-right:40px;">
        <button @click="focusText">focus</button>

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

        
        <c-text-input :readOnly="true" :value="testVal2"  label="Read Only" size="sm" @input="(val) => testVal2 = val" >
          <template slot="prefix">
            <span>test</span>
          </template>
          <template slot="suffix">
            <span>test2</span>
          </template>
        </c-text-input>

        
        <c-text-input :value="testVal" ref="t1" label="Label md" size="md" @input="(val) => testVal = val" >
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
        
        <c-text-input :value="testVal" label="Label xl" size="xl" @input="(val) => testVal = val" >
          <template slot="prefix">
            <span>test</span>
          </template>
          <template slot="suffix">
            <span>test2</span>
          </template>
        </c-text-input>
      </div>

      <div class="space-me" style="width:700px; margin-left:40px;">
        
        
        <button @click="focusQuantity">focus</button>

        <c-quantity-input :value="testVal3" @input="(val) => testVal3 = val" :error="true" />

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

        
        <c-quantity-input :value="testVal3" ref="q1" label="Label md" unit="mm" size="md" @input="(val) => testVal3 = val" >
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
        
        <c-quantity-input :value="testVal3" label="Label xl" size="xl" @input="(val) => testVal3 = val" >
          <template slot="prefix">
            <span>test</span>
          </template>
          <template slot="suffix">
            <span>test2</span>
          </template>
        </c-quantity-input>
      </div>

    </div>
  </div>
 
</template>

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
      testVal4: 'Option 4',
      testOptions: [
        { label: "Option 1", value: "Option 1", },
        { label: "Option 2", value: "Option 2", },
        { label: "Option 3", value: "Option 3", },
        { label: "Option 4", value: "Option 4", },
        { label: "Option 5", value: "Option 5", },
      ],
      testOptions2: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
      ]
    };
  },
  methods: {
    focusText() {
      this.$refs.t1.$el.focus();
    },
    focusSelect() {
      this.$refs.s1.$el.focus();
    },
    focusQuantity() {
      this.$refs.q1.$el.focus();
    },
  },
};
</script>

<style lang="scss">

.space-me > * + * {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
</style>