<template>
  <div class="flex">
    <div class="bg-gray-100 h-full w-full grid grid-cols-2 py-2 divide-x divide-gray-300">
      <div class="divide-y divide-gray-300">
        <div class="px-4">
          <CFormSection title="Registration Form 1 - (xs)" size="xs">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">
              <CTextInput id="firstname" label="First Name" />
              <CTextInput id="lastname" label="Last Name"  />
              <CTextInput id="email" label="Email Address" :message="errors.emailAddress" :color="errors.emailAddress && 'danger'"/>
              <CAutoComplete id="nationality" label="Nationality" :options="['United Kingdom', 'Germany', 'Netherlands']" />
              <CNumericInput id="phone" label="Phone Number" color="success">
                <template v-slot:prefix>
                  <CInputAffix>+44</CInputAffix>
                </template>
              </CNumericInput>
              <CFormElement label="Date of Birth">
                <div class="w-full flex space-x-4">
                  <CNumericInput id="date" class="w-20" :isFormElement="true" placeholder="Day"/>
                  <CListbox  id="month" class="w-full"  :isFormElement="true" :options="birthMonthOptions" placeholder="Month" />
                  <CNumericInput id="year" class="w-24" :isFormElement="true" placeholder="Year"/>
                </div>
              </CFormElement>
              <CSwitch id="enableNotifications" label="Recieve Notifications" />
              <CCheckbox id="isAdmin" label="Is Admin" disabled />
              <CRadioGroup class="col-span-2" label="Service Level"  :options="['Bronze Cobra', 'Silver Lion', 'Gold Eagle']" :message="errors.serviceLevel" :color="errors.serviceLevel && 'danger'"/>
              <CButton class="col-span-2">Submit</CButton>
            </div>
          </CFormSection>
        </div>

        <div class="px-4">
          <CFormSection title="Registration Form 2 - (lg)" size="lg">
            <div class="space-y-4">
              <CTextInput label="First Name" v-model="form1.firstName" :message="errors.firstName" :color="errors.firstName && 'danger'"/>
              <CTextInput label="Last Name"  v-model="form1.lastName" :message="errors.lastName" :color="errors.lastName && 'danger'"/>
              <CTextInput label="Email Address" v-model="form1.emailAddress" :message="errors.emailAddress" :color="errors.emailAddress && 'danger'"/>
              <CListbox label="Nationality" :options="['United Kingdom', 'Germany', 'Netherlands']" v-model="form1.country"/>
              <CNumericInput label="Phone Number" v-model="form1.phoneNo" color="success">
                <template v-slot:prefix>
                  <CInputAffix>+44</CInputAffix>
                </template>
              </CNumericInput>
              <CFormElement label="Date of Birth">
                <div class="w-full flex space-x-4">
                  <CNumericInput class="w-20" :isFormElement="true" placeholder="Day"/>
                  <CListbox  class="w-full" :isFormElement="true" :options="birthMonthOptions" placeholder="Month" v-model="form1.birthMonth"/>
                  <CNumericInput class="w-24" :isFormElement="true" placeholder="Year"/>
                </div>
              </CFormElement>
              <CSwitch label="Recieve Notifications" v-model="form1.recieveNotifications"/>
              <CCheckbox label="Is Admin" v-model="form1.isAdmin"/>
              <CRadioGroup label="Service Level" :columns="3" :options="['Bronze Cobra', 'Silver Lion', 'Gold Eagle', 'a','b','c']"/>
              <CButton class="w-full">Submit</CButton>
            </div>
          </CFormSection>
        </div>
      </div>

      <div class="divide-y divide-gray-300">
        <div class="px-4">
          <CFormSection title="Registration Form 3 - (sm)" size="sm" >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">
              <CTextInput label="First Name" v-model="form1.firstName" :message="errors.firstName" :color="errors.firstName && 'danger'">
              </CTextInput>
              <CTextInput label="Last Name"  v-model="form1.lastName" :message="errors.lastName" :color="errors.lastName && 'danger'" ></CTextInput>
              <CTextInput label="Email Address" v-model="form1.emailAddress" :message="errors.emailAddress" :color="errors.emailAddress && 'danger'"></CTextInput>
              <CListbox label="Nationality" :options="['United Kingdom', 'Germany', 'Netherlands']" v-model="form1.country"></CListbox>
              <CNumericInput label="Phone Number" v-model="form1.phoneNo" color="success">
                <template v-slot:prefix>
                  <CInputAffix>+44</CInputAffix>
                </template>
              </CNumericInput>
              <CFormElement label="Date of Birth">
                <div class="w-full flex space-x-2">
                  <CNumericInput class="w-20" :isFormElement="true" placeholder="Day"></CNumericInput>
                  <CListbox  class="w-full" :isFormElement="true" :options="birthMonthOptions" placeholder="Month" v-model="form1.birthMonth" ></CListbox>
                  <CNumericInput class="w-20" :isFormElement="true" placeholder="Year"></CNumericInput>
                </div>
              </CFormElement>
              <CSwitch label="Recieve Notifications" v-model="form1.recieveNotifications" :displayIcons="true"></CSwitch>
              <CCheckbox label="Is Admin" v-model="form1.isAdmin"></CCheckbox>
              <CRadioGroup label="Service Level"  :options="['Bronze Cobra', 'Silver Lion', 'Gold Eagle']"/>
              <CButton class="col-span-2">Submit</CButton>
            </div>
          </CFormSection>
        </div>

        <div class="">
          <CFormSection title="Registration Form 4 - (md)" :stacked="true" class="bg-indigo-dark px-4 text-sky-dark" color="sky">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 py-4">
              <CTextInput label="First Name" v-model="form1.firstName" color="sky" :transparent="true"/>
              <CTextInput label="Last Name"  v-model="form1.lastName" :message="errors.lastName" color="sky" :transparent="true"/>
              <CTextInput label="Email Address" v-model="form1.emailAddress" :message="errors.emailAddress" :color="errors.emailAddress && 'danger'" :transparent="true"/>
              <CListbox label="Nationality" :options="['United Kingdom', 'Germany', 'Netherlands']" v-model="form1.country" :transparent="true" color="sky"/>
              <CNumericInput label="Phone Number" v-model="form1.phoneNo" color="sky" :transparent="true">
                <template v-slot:prefix>
                  <CInputAffix :transparent="true">+44</CInputAffix>
                </template>
              </CNumericInput>
              <CFormElement label="Date of Birth" color="sky">
                <div class="w-full flex space-x-4">
                  <CNumericInput class="w-20" :isFormElement="true" placeholder="Day" :transparent="true"  color="sky"/>
                  <CListbox  class="w-full" :isFormElement="true" :options="birthMonthOptions" placeholder="Month" v-model="form1.birthMonth" :transparent="true"  color="sky"/>
                  <CNumericInput class="w-24" :isFormElement="true" placeholder="Year" :transparent="true"  color="sky"/>
                </div>
              </CFormElement>
              <CSwitch label="Recieve Notifications" v-model="form1.recieveNotifications" color="sky" :transparent="true" />
              <CCheckbox label="Is Admin" v-model="form1.isAdmin" color="sky" :transparent="true" />
              <CRadioGroup color="sky" class="col-span-2" label="Service Level"  :options="['Bronze Cobra', 'Silver Lion', 'Gold Eagle']"/>
              <CButton class="col-span-2" color="sky" fill="outline">Submit</CButton>
            </div>
          </CFormSection>
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
import CInputAffix from './components/InputAffix/InputAffix.vue';
import CFormElement from './components/FormElement/FormElement.vue';
import CFormSection from './components/FormSection/FormSection.vue';
import { CResizable, CPane } from './components/Resizable';
import { XIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CNumericInput,
    CTextInput,
    CListbox,
    CSwitch,
    CCheckbox,
    CRadioGroup,
    CButton,
    CInputAffix,
    CFormElement,
    CFormSection,
    CResizable,
    CPane,
    XIcon,
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
      value2: 'Male',
      leftPaneSize: null,
      birthMonthOptions: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ],
      errors: {
        emailAddress: 'Not a valid email address',
        serviceLevel: 'You cant afford it'
      }
    }
  },
  computed: {
    leftPaneClass() {
      return (this.leftPaneSize > 500) ? 'grid-cols-2' : 'grid-cols-1'
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
      alert('This is a custom handler for the localHandler input. Value: ' + value);
    },
    getInputColor(ref) {
      return (ref) ? 'danger' : 'default';
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
