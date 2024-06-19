<template>
  <div class="flex">
    <div class="bg-gray-100 h-full w-full py-2 divide-x divide-gray-300">
      <div class="divide-y divide-gray-300">
        <div class="px-4">
          <CFormSection title="Form Element Test">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">
              <div class="space-y-4">
                <div>
                  <div class="bg-blue-300 p-1 mb-1">Input</div>
                  <CTextInput />
                </div>
                <div>
                  <div class="bg-blue-300 p-1 mb-1">Input with label</div>
                  <CTextInput label="Test Label" />
                </div>
                <div>
                  <div class="bg-blue-300 p-1 mb-1">Input with no-wrap</div>
                  <CTextInput no-wrap />
                </div>
                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with no-wrap and label
                  </div>
                  <CTextInput no-wrap label="Test Label" />
                </div>
                <hr />

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with formElement - no label
                  </div>
                  <CTextInput />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with formElement - label
                  </div>
                  <CTextInput label="Test Label" />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with label and no label
                  </div>
                  <CTextInput label="Test Label" no-label />
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="bg-blue-300 p-1 mb-1">Input with id</div>
                  <CTextInput id="firstname" />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with id and no wrap
                  </div>
                  <CTextInput id="firstname" no-wrap />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with id and no label
                  </div>
                  <CTextInput id="firstname" no-label />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with id and label
                  </div>
                  <CTextInput id="firstname" label="First Name" />
                </div>
                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with id and labelFormatter
                  </div>
                  <CTextInput
                    id="firstname"
                    :labelFormatter="(props) => props.id.toUpperCase()"
                  />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Input with prefix and suffix
                  </div>
                  <CNumericInput
                    id="width"
                    prefix="w"
                    suffix="mm"
                    :minimum="200"
                  />
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Listbox with no options and id (disabled)
                  </div>
                  <CListbox></CListbox>
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">
                    Listbox with options from id
                  </div>
                  <CListbox id="options"></CListbox>
                </div>

                <div>
                  <div class="bg-blue-300 p-1 mb-1">Listbox with options</div>
                  <CListbox
                    v-model="ListboxValue"
                    :options="OptionsObjects"
                  ></CListbox>
                </div>
              </div>
              <div>
                <div class="bg-blue-300 p-1 mb-1">Autocomplete</div>
                <CAutoComplete
                  :options="['a', 'b', 'aa', 'bb', 'ab']"
                  placeholder="Enter 'a' or 'b'"
                >
                </CAutoComplete>
              </div>
              <div>
                <div class="bg-blue-300 p-1 mb-1">Numeric Inputs</div>
                <CNumericInput label="Spinner (no override, default)" unit="mm">
                </CNumericInput>
                <CNumericInput
                  label="No Spinner (override, default)"
                  unit="mm"
                  :spinner="false"
                >
                </CNumericInput>
                <CNumericInput
                  label="Spinner (override, default)"
                  unit="mm"
                  :spinner="true"
                >
                </CNumericInput>
                <CNumericInput label="Label with <sup>SupScript</sup>" unit="mm">
                </CNumericInput>
                <CNumericInput label="Label with <sub>SubScript</sub>" unit="mm">
                </CNumericInput>
              </div>
            </div>
          </CFormSection>
          <CFormSection class="">
            <div class="flex space-x-16">
              <div class="grid grid-cols-2 w-80 gap-x-8">
                <CCheckbox v-model="checkValue" label="Default 1" id="1234" />
                <CCheckbox v-model="checkValue2" label="Default 2" />
                <CCheckbox
                  v-model="checkValue3"
                  label="Default 3"
                  :disabled="true"
                />
                <CCheckbox
                  v-model="checkValue4"
                  label="Default 4"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-2 w-80 gap-x-8">
                <CCheckbox
                  v-model="checkValue"
                  label="Indigo 1"
                  color="indigo"
                />
                <CCheckbox
                  v-model="checkValue2"
                  label="Indigo 2"
                  color="indigo"
                />
                <CCheckbox
                  v-model="checkValue3"
                  label="Indigo 3"
                  color="indigo"
                  :disabled="true"
                />
                <CCheckbox
                  v-model="checkValue4"
                  label="Indigo 4"
                  color="indigo"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-2 w-80 gap-x-8">
                <CCheckbox v-model="checkValue" label="Sky 1" color="sky" />
                <CCheckbox v-model="checkValue2" label="Sky 2" color="sky" />
                <CCheckbox
                  v-model="checkValue3"
                  label="Sky 3"
                  color="sky"
                  :disabled="true"
                />
                <CCheckbox
                  v-model="checkValue4"
                  label="Sky 4"
                  color="sky"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-2 w-80 gap-x-8">
                <CCheckbox v-model="checkValue" label="Steel 1" color="steel" />
                <CCheckbox
                  v-model="checkValue2"
                  label="Steel 2"
                  color="steel"
                />
                <CCheckbox
                  v-model="checkValue3"
                  label="Steel 3"
                  color="steel"
                  :disabled="true"
                />
                <CCheckbox
                  v-model="checkValue4"
                  label="Steel 4"
                  color="steel"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-2 w-80 gap-x-8">
                <CCheckbox
                  v-model="checkValue"
                  label="Transparent 1"
                  :transparent="true"
                />
                <CCheckbox
                  v-model="checkValue2"
                  label="Transparent 2"
                  :transparent="true"
                />
                <CCheckbox
                  v-model="checkValue3"
                  label="Transparent 3"
                  :transparent="true"
                  :disabled="true"
                />
                <CCheckbox
                  v-model="checkValue4"
                  label="Transparent 4"
                  :transparent="true"
                  :disabled="true"
                />
              </div>
            </div>
          </CFormSection>
          <CFormSection>
            <div class="space-y-2">
              <CRadioGroup
                v-model="RadioGroupValue"
                label="Radio group"
                :options="Options"
                optionsClass="pl-2 pr-2 pb-2 pt-2"
              />
              <CButtonGroup
                v-model="ButtonGroupValue"
                label=" "
                color="indigo"
                :options="Options"
                buttonClass="pl-1 pr-1 pb-1 pt-1"
              />
              <CRadioGroup
                v-model="RadioGroupIdOptions"
                label="Radio group values form id"
                id="radioGroup"
              />
              <CButtonGroup
                v-model="ButtonGroupIdOptions"
                label="Button group values from id"
                color="indigo"
                id="buttonGroup"
              />
            </div>
          </CFormSection>
          <CFormSection>
            <div class="flex flex-row">
              <CFormElement label="Select File Type" class="basis-1/3"></CFormElement>
              <CSelectFileType
              :types="[
                {ext: '.pdf', label: 'Example1'},
                {ext: '.json', label: 'Example2'},
                {ext: '.dxf', label: 'Example3'}
              ]"
              v-model:currentFileType="currentFileType"
              />
            </div>
          </CFormSection>
        </div>
        <div class="my-32 p-4">
          <div class="grid grid-cols-4 gap-8 divide-x">
            <CTextInput
              label="Large Stacked"
              :stacked="true"
              size="lg"
              tooltip="This text element contains information text to help the user understand it's purpose"
            />
            <CTextInput
              label="Medium Stacked"
              :stacked="true"
              size="md"
              tooltip="This text element contains information text to help the user understand it's purpose"
            />
            <CTextInput
              label="Small Stacked"
              :stacked="true"
              size="sm"
              tooltip="This text element contains information text to help the user understand it's purpose"
            />
            <CTextInput
              label="Extra Small Stacked"
              :stacked="true"
              size="xs"
              tooltip="This text element contains information text to help the user understand it's purpose"
            />
            <CTextInput
              tooltip="This text element contains information text to help the user understand it's purpose"
              label="Large Inline"
              size="lg"
            />
            <CTextInput
              tooltip="This text element contains information text to help the user understand it's purpose"
              label="Medium Inline"
              size="md"
            />
            <CTextInput
              tooltip="This text element contains information text to help the user understand it's purpose"
              label="Small Inline"
              size="sm"
            />
            <CTextInput
              tooltip="This text element contains information text to help the user understand it's purpose"
              label="Extra Small Inline"
              size="xs"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CTextInput from './components/TextInput/TextInput.vue';
import CNumericInput from './components/NumericInput/NumericInput.vue';
import CListbox from './components/Listbox/Listbox.vue';
import CSwitch from './components/Switch/Switch.vue';
import CCheckbox from './components/Checkbox/Checkbox.vue';
import CRadioGroup from './components/RadioGroup/RadioGroup.vue';
import CButton from './components/Button/Button.vue';
import CButtonGroup from './components/ButtonGroup/ButtonGroup.vue';
import CInputAffix from './components/InputAffix/InputAffix.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import { CPane, CResizable } from './components/Resizable';
import CSelectFileType from './components/SelectFileType/SelectFileType.vue';
import CSelectFileTypeItem from './components/SelectFileType/SelectFileTypeItem.vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';

export default {
  components: {
    CNumericInput,
    CTextInput,
    CListbox,
    CSwitch,
    CCheckbox,
    CRadioGroup,
    CButton,
    CButtonGroup,
    CInputAffix,
    CFormElement,
    CFormSection,
    CResizable,
    CPane,
    CSelectFileType,
    CSelectFileTypeItem,
    XMarkIcon,
  },
  data() {
    return {
      form1: {
        firstName: null,
        lastName: null,
        emailAddress: null,
        country: 'United Kingdom',
        phoneNo: null,
        birthDay: null,
        birthMonth: null,
        birthYear: null,
        isAdmin: false,
        recieveNotifications: false,
      },
      value: null,
      checkValue: false,
      checkValue2: true,
      checkValue3: false,
      checkValue4: true,
      ListboxValue: 'Option 3',
      RadioGroupValue: 'Option 2',
      ButtonGroupValue: 'Option 2',
      RadioGroupIdOptions: 'Option 2',
      ButtonGroupIdOptions: 'Option 2',
      Options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
      OptionsObjects: [
        { label: 'Option 1', value: 'Option 1', disabled: false },
        { label: 'Option 2', value: 'Option 2', disabled: false },
        { label: 'Option 3', value: 'Option 3', disabled: false },
        { label: 'Option 4', value: 'Option 4', disabled: true },
        { label: 'Option 5', value: 'Option 5', disabled: false },
      ],
      value2: 'Male',
      leftPaneSize: null,
      birthMonthOptions: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      errors: {
        emailAddress: 'Not a valid email address',
        serviceLevel: 'You cant afford it',
      },
      currentFileType: ''
    };
  },
  computed: {
    leftPaneClass() {
      return this.leftPaneSize > 500 ? 'grid-cols-2' : 'grid-cols-1';
    },
  },
  methods: {
    resizePanes(data) {
      this.leftPaneSize = data[0];
    },
    takeFocus() {
      this.$refs.testid.focus();
    },
    blurFocus() {
      this.$refs.testid.blur();
    },
    handleBlur(value) {
      console.log('rerender if necessary');
      alert(
        'This is a custom handler for the localHandler input. Value: ' + value
      );
    },
    getInputColor(ref) {
      return ref ? 'danger' : 'default';
    },
  },
};
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
