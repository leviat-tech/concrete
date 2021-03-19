<style scoped lang="scss">
  .k-interface {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    h1, h2, h3 {
      font-weight: bold;
      padding-bottom: 10px;
      margin-bottom: 20px;
      display: block;
      color: #333;
    }
    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 24px;
      border-bottom: 1px solid #ddd;
      margin-top: 40px;
    }
    h3 {
      font-size: 18px;
    }
    .inputs {
      width: 250px;
    }
  }
</style>

<template>
  <div class="k-interface">
    <h1>User Interface</h1>

    <!-- inputs -->
    <h2>Inputs</h2>

    <!-- spanner input -->
    <k-demo>
      <template slot="title">Spanner Input Widget</template>
      <template slot="description">
      </template>
      <k-spanner style="width: 350px" v-model="spanner"/>
    </k-demo>

    <!-- text input -->
    <k-demo>
      <template slot="title">Text Input</template>
      <template slot="description">
      </template>
      <div class="inputs">
        <k-input placeholder="Placeholder"/>
        <k-input placeholder="Placeholder" value="Text"/>
        <k-input placeholder="Placeholder" value="Disabled" disabled/>
        <k-input placeholder="Placeholder" value="The quick brown fox jumped">
          <template slot="suffix">Suffix</template>
        </k-input>
        <k-input placeholder="Placeholder" value="The quick brown fox jumped">
          <template slot="prefix">Prefix</template>
        </k-input>
        <k-input placeholder="Placeholder" value="The quick brown fox jumped">
          <template slot="prefix">Prefix</template>
          <template slot="suffix">Suffix</template>
        </k-input>
      </div>
    </k-demo>

    <!-- numeric input -->
    <k-demo>
      <template slot="title">Numeric Text Input</template>
      <template slot="description">
        >> Is the placeholder on numberic inputs aligned left or right?<br>
        The left makes the placeholder more useful as a label, the right aligns with content.
      </template>
      <div class="inputs">
        <k-numeric-input placeholder="Placeholder"/>
        <k-numeric-input placeholder="Placeholder" value="123.4"/>
        <k-numeric-input placeholder="Placeholder" value="12.3" unit="mm"/>
        <k-numeric-input placeholder="Placeholder" value="123" :step="1"/>
        <k-numeric-input placeholder="Placeholder" value="123.4" unit="m" :step=".1"/>
      </div>
    </k-demo>

    <!-- textbox input -->
    <k-demo>
      <template slot="title">Textarea Input</template>
      <template slot="description">
      </template>
      <k-textarea value="Hello! How are you?"></k-textarea>
      <k-textarea placeholder="Remember to be nice!"></k-textarea>
      <k-textarea value="Disabled" disabled></k-textarea>
    </k-demo>

    <!-- checkbox -->
    <k-demo>
      <template slot="title">Checkbox</template>
      <template slot="description">
      </template>
      <div class="inputs">
        <k-checkbox/>
        <k-checkbox :value="true"/>
        <k-checkbox :disabled="true"/>
      </div>
    </k-demo>

    <!-- toggle input -->
    <k-demo>
      <template slot="title">Toggle Input</template>
      <template slot="description">
        This is an example. Do we need to make an actual toggle input? Leave it to be composed?
        Is the toggle value something that needs to be modled on a seperate property? If so
        we probably leave that to be composed so there can be two model bindings on.
      </template>
      <div class="inputs">
        <k-numeric-input :disabled="!disabled" placeholder="Count" value="123.4" :step=".1">
          <template slot="prefix">
            <k-checkbox v-model="disabled"/>
          </template>
        </k-numeric-input>
      </div>
    </k-demo>

    <!-- select input -->
    <k-demo>
      <template slot="title">Select Input</template>
      <template slot="description">
      </template>
      <div class="inputs">
        <k-select value="">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </k-select>
        <k-select value="" disabled>
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </k-select>
      </div>
    </k-demo>

    <!-- file dialog input -->
    <k-demo>
      <template slot="title">File Dialog Input</template>
      <template slot="description">
      </template>
      <div class="inputs">
        <k-file-dialog-input><a href="#" @click.prevent="">Open</a></k-file-dialog-input>
      </div>
    </k-demo>

    <!-- search widget -->
    <k-demo>
      <template slot="title">Search Input Widget</template>
      <template slot="description">
      </template>
      <div style="min-height: 100px;">
        <k-search
          :results="[{
              key: 'a',
              name: 'a',
              value: null
            }, {
              key: 'b',
              name: 'b',
              value: null
            }]"/>
      </div>
    </k-demo>

    <!-- layout -->
    <h2>Layout</h2>

    <!-- accordian -->
    <k-demo>
      <template slot="title">Accordian</template>
      <template slot="description">
      </template>
      <div style="min-height: 175px;">
        <k-accordian title="Accordian">
          <k-accordian-tab>Property 1</k-accordian-tab>
          <k-accordian-tab>Property 2</k-accordian-tab>
          <k-accordian-tab>Property 3</k-accordian-tab>
        </k-accordian>
      </div>
    </k-demo>
  </div>
</template>

<script>
import KDemo from './k-demo.vue';

export default {
  name: 'k-interface',
  data() {
    return {
      spanner: {},
      test: '',
      disabled: false,
    };
  },
  components: {
    KDemo,
  },
};
</script>
