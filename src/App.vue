<template>
  <div class="">
    <div class="bg-base-50 p-16 space-y-16">
      
      <div class="bg-white space-y-8 p-8 w-2/3">
        <div class="font-bold text-2xl text-brand-800">Button</div>
        <div class="grid grid-cols-5 gap-8">
          <div class="space-y-2">
            <CButton color="default">Solid Default</CButton>
            <CButton color="brand">Solid Brand</CButton>
            <CButton color="info">Solid Info</CButton>
            <CButton color="magic">Solid Magic</CButton>
            <CButton color="success">Solid Success</CButton>
            <CButton color="warning" >Solid Warning</CButton>
            <CButton color="danger" >Solid Danger</CButton>
          </div>
          <div class="space-y-2">
            <CButton color="default" fill="outline">Outline Default</CButton>
            <CButton color="brand" fill="outline">Outline Brand</CButton>
            <CButton color="info" fill="outline">Outline Info</CButton>
            <CButton color="magic" fill="outline">Outline Magic</CButton>
            <CButton color="success" fill="outline">Outline Success</CButton>
            <CButton color="warning" fill="outline" >Outline Warning</CButton>
            <CButton color="danger" fill="outline">Outline Danger</CButton>
          </div>
          <div class="space-y-2">
            <CButton color="default" fill="ghost">Ghost Default</CButton>
            <CButton color="brand" fill="ghost">Ghost Brand</CButton>
            <CButton color="info" fill="ghost">Ghost Info</CButton>
            <CButton color="magic" fill="ghost">Ghost Magic</CButton>
            <CButton color="success" fill="ghost">Ghost Success</CButton>
            <CButton color="warning" fill="ghost" >Ghost Warning</CButton>
            <CButton color="danger" fill="ghost" active>Ghost Danger</CButton>
          </div>
          <div class="space-y-2">
            <CButton size="xs">Size XS</CButton>
            <CButton size="sm">Size SM</CButton>
            <CButton size="md" >Size MD</CButton>
            <CButton size="lg" >Size LG</CButton>
          </div>
          <div class="space-y-2">
            <CButton color="default" fillWidth>Fill Width</CButton>
            <CButton color="default" :spinner="spinnerData">Spinner</CButton>
            <CButton color="default" fillWidth :spinner="spinnerData">Fill Width Spinner</CButton>
            <CButton disabled>Disabled Info</CButton>
            <CButton active>Active</CButton>
          </div>
        </div>
      </div>
      
      <div class="bg-white space-y-8 p-8 w-2/3">
        <div class="font-bold text-2xl text-brand-800">Accordion</div>
        <div class="grid grid-cols-4 gap-8">
          <div class="space-y-2">
            <CAccordion title="Underlined" :headingSize="4" underline>
              <CFormSection>
                <CHeading :size="4" title="Vertices" />
                <CStack>
                  <CNumericInput label="Specific Weight" />
                  <CNumericInput label="Windload" />
                </CStack>
              </CFormSection>
            </CAccordion>
          </div>
          <div class="space-y-2">
            <CAccordion title="Default Opened" :defaultOpen="true" :headingSize="3">
              <CFormSection>
                <CHeading :size="4" title="Vertices" />
                <CStack>
                  <CNumericInput label="Specific Weight" />
                  <CNumericInput label="Windload" />
                </CStack>
              </CFormSection>
            </CAccordion>
          </div>
          <div class="space-y-2">
            <CAccordion title="Default Closed" :defaultOpen="false" :headingSize="2">
              <CFormSection>
                <CHeading :size="4" title="Vertices" />
                <CStack>
                  <CNumericInput label="Specific Weight" />
                  <CNumericInput label="Windload" />
                </CStack>
              </CFormSection>
            </CAccordion>
          </div>
          <div class="space-y-2">
            <CNest>
              <CAccordion title="Nested Accordion" :defaultOpen="false" :headingSize="1">
                <CFormSection>
                  <CHeading :size="4" title="Vertices" />
                  <CStack>
                    <CNumericInput label="Specific Weight" />
                    <CNumericInput label="Windload" />
                  </CStack>
                </CFormSection>
              </CAccordion>
            </CNest>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-2/3">
        <div class="font-bold text-2xl text-brand-800">Heading</div>
        <div class="grid grid-cols-3 gap-8">
          <div class="space-y-2">
            <CHeading title="Geometry Tab" />
            <CHeading title="Geometry Tab" :size="2" />
            <CHeading title="Geometry Tab" :size="3" />
            <CHeading title="Geometry Tab" :size="4" color="success"/>
            <CHeading title="Geometry Tab" />
          </div>
          <div class="space-y-2">
            <CHeading title="test" color="default" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="info" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="magic" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="success" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="warning" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="danger" :underline="true"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
          </div>
          <div class="space-y-2">
            <CHeading title="test" color="default" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="info" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="magic" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="success" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="warning" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
            <CHeading title="test" color="danger" :underline="false"><template v-slot:toolbar><div class="w-4 h-4 m-1 bg-base-600"></div></template></CHeading>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-3/4">
        <div class="font-bold text-2xl text-brand-800">Form Element</div>
        <div class="grid grid-cols-3 gap-8">
          <div class="space-y-2">
            <CFormElement label="hasMultipleInputs" :hasMultipleInputs="true">
              <CNumericInput prefix="x" />
              <CNumericInput prefix="y" />
            </CFormElement>
            <CFormElement labelWidth="lg" label="large label" :hasMultipleInputs="true">
              <CNumericInput prefix="x" />
              <CNumericInput prefix="y" />
            </CFormElement>
            <CFormElement labelWidth="sm" label="small" :hasMultipleInputs="true">
              <CNumericInput prefix="x" />
              <CNumericInput prefix="y" />
            </CFormElement>
            <CFormElement labelWidth="xxs" label="1" :hasMultipleInputs="true">
              <CNumericInput prefix="x" />
              <CNumericInput prefix="y" />
            </CFormElement>
          </div>
          <div class="space-y-2">
            <CTextInput message="Example help message" />
            <CTextInput message="Example help message" color="success" />
            <CTextInput message="Example help message" color="warning"/>
            <CTextInput message="Example help message" color="danger" />
          </div>
          <div class="space-y-2">
            <CTextInput message="Example help message" prefix="Prefix" color="info" />
            <CTextInput message="Example help message" suffix="Suffix" color="magic" />
            <CTextInput message="Example help message" prefix="Prefix" suffix="Suffix" color="success" disabled />
            <CTextInput label="Form Element" message="Example information message" prefix="Prefix" suffix="Suffix"/>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Text Input</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CTextInput label="Default" message="Example Message" />
            <CTextInput label="Info" color="info" message="Example Message" />
            <CTextInput label="Magic" color="magic" message="Example Message" />
            <CTextInput label="Success" color="success" message="Example Message" />
            <CTextInput label="Warning" color="warning" message="Example Message" />
            <CTextInput label="Danger" color="danger" message="Example Message" />
          </div>
          <div class="space-y-2">
            <CTextInput message="Example Message" />
            <CTextInput label="Info" color="info" message="Example Message" />
            <CTextInput label="Magic" color="magic" readOnly />
            <CTextInput label="Disabled" color="success" disabled model-value="Disabled text" />
            <CTextInput label="Warning" color="warning" placeholder="Placeholder"/>
            <div class="bg-pink-300 p-8" >
              <CTextInput label="Transparent" transparent color="info"/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-2/3">
        <div class="font-bold text-2xl text-brand-800">Numeric Input</div>
        <div class="grid grid-cols-3 gap-8">
          <div class="space-y-2">
            <CNumericInput label="Default" message="Example Message" />
            <CNumericInput label="Info" color="info" message="Example Message" />
            <CNumericInput label="Magic" color="magic" message="Example Message" />
            <CNumericInput label="Success" color="success" message="Example Message" />
            <CNumericInput label="Warning" color="warning" message="Example Message" />
            <CNumericInput label="Danger" color="danger" message="Example Message" />
          </div>
          <div class="space-y-2">
            <CNumericInput message="Example Message" />
            <CNumericInput label="Info" color="info" message="Example Message" />
            <CNumericInput label="Magic" color="magic" readOnly />
            <CNumericInput label="Success" color="success" disabled />
            <CNumericInput label="Warning" color="warning" placeholder="Placeholder"/>
            <div class="bg-pink-300 p-8" >
              <CNumericInput label="Transparent" transparent color="info"/>
            </div>
          </div>
          <div class="space-y-2">
            <CNumericInput step="10" spinner label="Step 10" />
            <CNumericInput label="Units" unit="mm" />
            <CNumericInput label="Min Max" :minimum="0" :maximum="100" spinner />
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Checkbox</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CCheckbox label="Default" v-model="checkValue" />
            <CCheckbox label="Info" color="info" v-model="checkValue" />
            <CCheckbox label="Magic" color="magic" v-model="checkValue" />
            <CCheckbox label="Success" color="success" v-model="checkValue"  />
            <CCheckbox label="Warning" color="warning" v-model="checkValue" />
            <CCheckbox label="Danger" color="danger" v-model="checkValue" />
          </div>
          <div class="space-y-2">
            <CCheckbox no-label v-model="checkValue" />
            <CCheckbox label="Info" color="info" message="Example Message" v-model="checkValue" />
            <CCheckbox label="Magic" color="magic" readOnly v-model="checkValue" />
            <CCheckbox label="Success" color="success" disabled v-model="checkValue" />
            <CCheckbox label="Warning" color="warning" reverseLabels v-model="checkValue" labelClass="text-left pl-2" />
            <div class="bg-pink-300 p-8" >
              <CCheckbox label="Transparent" transparent color="info" v-model="checkValue" />
            </div>
          </div>
        </div>
      </div>

      
      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Switch</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CSwitch label="Default" v-model="checkValue" />
            <CSwitch label="Info" color="info" v-model="checkValue" />
            <CSwitch label="Magic" color="magic" v-model="checkValue" />
            <CSwitch label="Success" color="success" v-model="checkValue"  />
            <CSwitch label="Warning" color="warning" v-model="checkValue" />
            <CSwitch label="Danger" color="danger" v-model="checkValue" />
          </div>
          <div class="space-y-2">
            <CSwitch no-label v-model="checkValue" />
            <CSwitch label="Info" color="info" message="Example Message" v-model="checkValue" />
            <CSwitch label="Magic" color="magic" readOnly v-model="checkValue" />
            <CSwitch label="Success" color="success" disabled v-model="checkValue" />
            <CSwitch label="Warning" color="warning" reverseLabels v-model="checkValue" labelClass="text-left pl-2" />
            <div class="bg-pink-300 p-8" >
              <CSwitch label="Transparent" transparent color="info" v-model="checkValue" />
            </div>
          </div>
        </div>
      </div>


      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Listbox</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CListbox label="Default" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Magic" color="magic" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Success" color="success" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Warning" color="warning" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Danger" color="danger" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
          </div>
          <div class="space-y-8">
            <CListbox message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Disabled" color="success" disabled :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CListbox label="Warning" color="warning" placeholder="Placeholder" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <div class="bg-pink-300 p-8" >
              <CListbox label="Transparent" transparent color="info" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            </div>
          </div>
        </div>
      </div>
      

      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Autocomplete</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CAutoComplete label="Default" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Magic" color="magic" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Success" color="success" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Warning" color="warning" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Danger" color="danger" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
          </div>
          <div class="space-y-8">
            <CAutoComplete message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Disabled" color="success" disabled :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CAutoComplete label="Warning" color="warning" placeholder="Placeholder" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <div class="bg-pink-300 p-8" >
              <CAutoComplete label="Transparent" transparent color="info" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            </div>
          </div>
        </div>
      </div>


      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Text Area</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CTextArea label="Default" message="Example Message" />
            <CTextArea label="Info" color="info" message="Example Message" />
            <CTextArea label="Magic" color="magic" message="Example Message" />
            <CTextArea label="Success" color="success" message="Example Message" />
            <CTextArea label="Warning" color="warning" message="Example Message" />
            <CTextArea label="Danger" color="danger" message="Example Message" />
          </div>
          <div class="space-y-2">
            <CTextArea message="Example Message" />
            <CTextArea label="Info" color="info" message="Example Message" />
            <CTextArea label="Magic" color="magic" readOnly />
            <CTextArea label="Success" color="success" disabled />
            <CTextArea label="Warning" color="warning" placeholder="Placeholder"/>
            <div class="bg-pink-300 p-8" >
              <CTextArea label="Transparent" transparent color="info"/>
            </div>
          </div>
        </div>
      </div>


      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Radio Group</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <CRadioGroup label="Default" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Magic" color="magic" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Success" color="success" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Warning" color="warning" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Danger" color="danger" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
          </div>
          <div class="space-y-8">
            <CRadioGroup message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Info" color="info" message="Example Message" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Disabled" color="success" disabled :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <CRadioGroup label="Warning" color="warning" placeholder="Placeholder" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            <div class="bg-pink-300 p-8" >
              <CRadioGroup label="Transparent" transparent color="info" :options="['Option 1', 'Option 2']" v-model="ListboxValue" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="font-bold text-2xl text-brand-800">Tool</div>
        <div class="grid grid-cols-2 gap-8">
          <div class="space-x-4 flex">
            <CTool icon="copy" size="xs" />
            <CTool icon="copy" size="sm" />
            <CTool icon="copy" size="md" />
            <CTool icon="copy" size="lg" />
          </div>
          <div class="space-x-4 flex">
            <CTool icon="expand" color="default"/>
            <CTool icon="expand" color="info"/>
            <CTool icon="expand" color="magic"/>
            <CTool icon="expand" color="success"/>
            <CTool icon="expand" color="warning"/>
            <CTool icon="expand" color="danger"/>
          </div>
          <div class="space-x-4 flex">
            <CTool icon="copy" size="xs" disabled />
            <CTool icon="copy" size="sm" disabled />
            <CTool icon="copy" size="md" disabled />
            <CTool icon="copy" size="lg" disabled />
          </div>
          <div class="space-x-4 flex">
            <CTool icon="expand" color="default" disabled/>
            <CTool icon="expand" color="info" disabled/>
            <CTool icon="expand" color="magic" disabled/>
            <CTool icon="expand" color="success" disabled/>
            <CTool icon="expand" color="warning" disabled/>
            <CTool icon="expand" color="danger" disabled/>
          </div>
          <div class="space-x-4 flex">
            <CTool icon="copy" size="xs" :hoverable="false" />
            <CTool icon="copy" size="sm" :hoverable="false" />
            <CTool icon="copy" size="md" :hoverable="false" />
            <CTool icon="copy" size="lg" :hoverable="false" />
          </div>
          <div class="space-x-4 flex">
            <CTool icon="expand" color="default" :hoverable="false"/>
            <CTool icon="expand" color="info" :hoverable="false"/>
            <CTool icon="expand" color="magic" :hoverable="false"/>
            <CTool icon="expand" color="success" :hoverable="false"/>
            <CTool icon="expand" color="warning" :hoverable="false"/>
            <CTool icon="expand" color="danger" :hoverable="false"/>
          </div>
          <div class="space-x-4 flex">
            <CTool icon="expand" color="default" :textButton="true"/>
            <CTool icon="expand" color="info" :textButton="true" name="Test" />
            <CTool color="magic" :textButton="true" name="Test"/>
          </div>
        </div>
      </div>



      <div class="bg-white space-y-8 p-8 w-1/2">
        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="md" class="rounded-button text-entity-active hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="md" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="md" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="md" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="rounded-button text-entity-active hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>
        
        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-entity-active p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-entity-active p-1 rounded-button text-entity-active hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-base-500 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-entity-active p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-entity-active p-1 rounded-button text-entity-active hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-base-300 p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-entity-active p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        
        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border-t-2 border-entity-active p-1 text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <CIcon type="pointer-outline" size="lg" class="border border-base-600 rounded-button p-1 text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="hand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="zoom-in" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              <CIcon type="expand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <div class="space-x-2 flex">
              <div class="flex border border-base-600 rounded-button divide-x divide-base-600">
                <div class="border-b-2 border-entity-active px-1">
                  <CIcon type="pointer-outline" size="lg" class=" p-1 text-base-600 hover:text-base-800 outline-none cursor-pointer" />
                
                </div>
                <div class="pb-0.5 px-1">
                  <CIcon type="hand" size="lg" class="p-1 text-base-600 hover:text-base-800 outline-none cursor-pointer" />
                </div>
                <div class="pb-0.5 px-1">
                  <CIcon type="zoom-in" size="lg" class="p-1 text-base-600 hover:text-base-800 outline-none cursor-pointer" />
              
                </div>
              </div>
              <CIcon type="expand" size="lg" class="border border-transparent p-1 rounded-button text-base-600 hover:text-base-800 outline-none cursor-pointer" />
            </div>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful color="info" />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled color="info" />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful color="info" />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" color="info" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful color="magic" />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled color="magic" />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful color="magic" />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" color="magic" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful color="success" />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled color="success" />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful color="success" />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" color="success" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful color="warning" />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled color="warning" />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful color="warning" />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" color="warning" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>

        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" icon="pointer-outline" stateful color="danger" />
                <CTool name="Pan" tool-id="pan" icon="hand" stateful disabled color="danger" />
                <CTool name="Zoom" tool-id="zoom" icon="zoom-in" stateful color="danger" />
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" icon="expand" :stateful="false" color="danger" />
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate</CButton>
          </div>
        </div>



        <div class="bg-base-50 h-12 border-b border-base-300 flex items-center">
          <div class="flex w-full items-center justify-between px-2">
            <CToolbar>
              <CToolGroup class="">
                <CTool name="Select" tool-id="select" stateful>
                  <svg viewBox="5 5 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="19.7217" cy="21.0225" r="1.5" stroke="black"/>
  <line x1="20.7217" y1="21.0225" x2="31.7217" y2="21.0225" stroke="black"/>
  <line x1="7.72168" y1="21.0225" x2="18.7217" y2="21.0225" stroke="black"/>
  <line x1="21.7217" y1="15.5225" x2="30.7217" y2="15.5225" stroke="#0619C9"/>
  <line x1="26.2217" y1="11.0225" x2="26.2217" y2="20.0225" stroke="#0619C9"/>
</svg>

                </CTool>
                <CTool name="Pan" tool-id="pan" stateful disabled>
                  <svg viewBox="5 5 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 21.0003C21.5 21.829 20.8283 22.5007 20 22.5007C19.1717 22.5007 18.5 21.829 18.5 21.0003C18.5 20.1716 19.1717 19.5 20 19.5C20.8283 19.5 21.5 20.1716 21.5 21.0003Z" stroke="black"/>
<line x1="21" y1="21.001" x2="32" y2="21.001" stroke="black"/>
<line x1="8" y1="21.001" x2="19" y2="21.001" stroke="black"/>
<path d="M23 18.0005L17 24.0015M23 24.0015L17 18.0005" stroke="#C90606"/>
</svg>

                </CTool>
                <CTool name="Zoom" tool-id="zoom" stateful>
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 20 H35" stroke="black" stroke-width="2"/>
  <path d="M25 10 L35 20 L25 30" stroke="black" stroke-width="2"/>
  <path d="M5 5 V35" stroke="red" stroke-width="2"/>
</svg></CTool>
              </CToolGroup>
              <CToolGroup class="" dividerLeft>
                <CTool name="Zoom to Fit" tool-id="zoom-to-fit" :stateful="false">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
<path fill="black" d="M11.5 22H28.5V27H29.5C29.7761 27 30 27.2239 30 27.5C30 27.7761 29.7761 28 29.5 28H26.5C26.2239 28 26 27.7761 26 27.5C26 27.2239 26.2239 27 26.5 27H27.5V23H12.5V27H13.5C13.7761 27 14 27.2239 14 27.5C14 27.7761 13.7761 28 13.5 28H10.5C10.2239 28 10 27.7761 10 27.5C10 27.2239 10.2239 27 10.5 27H11.5V22Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path fill="#0619C9" d="M15.5 19.931L14 22L12.5 19.931H13.7402V16.2069C13.7402 16.0926 13.8565 16 14 16C14.1435 16 14.2598 16.0926 14.2598 16.2069V19.931H15.5Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path fill="#0619C9" d="M19.5 19.931L18 22L16.5 19.931H17.7402V16.2069C17.7402 16.0926 17.8565 16 18 16C18.1435 16 18.2598 16.0926 18.2598 16.2069V19.931H19.5Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path fill="#0619C9" d="M23.5 19.931L22 22L20.5 19.931H21.7402V16.2069C21.7402 16.0926 21.8565 16 22 16C22.1435 16 22.2598 16.0926 22.2598 16.2069V19.931H23.5Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path fill="#0619C9" d="M27.5 19.931L26 22L24.5 19.931H25.7402V16.2069C25.7402 16.0926 25.8565 16 26 16C26.1435 16 26.2598 16.0926 26.2598 16.2069V19.931H27.5Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path fill="#0619C9" d="M13.75 15.75H26.25V16.25H13.75V15.75Z" clip-rule="evenodd" fill-rule="evenodd"></path>
<path stroke-width="0.5" stroke="#C90606" d="M18.6667 11H16L18 13L16 15H18.6667"></path>
<path stroke-width="0.5" stroke="#C90606" d="M25 11L21 15M21 11L25 15"></path>
</svg>

                </CTool>
              </CToolGroup>
            </CToolbar>
            <CButton color="magic" class="">Calculate <CIcon type="bolt" size="sm" /></CButton>
          </div>
        </div>

        

      </div>


      <div class="bg-white space-y-8 p-8 w-1/2">
        <!-- Collapsed -->
        <div class="text-xs">
          <div class="bg-base-50 h-12 w-full justify-between flex items-center border-t border-base-300 px-2">
            <div class="pl-2 font-bold">Activity</div>
            <div class="cursor-pointer text-base-700 hover:text-base-900">
              <ChevronUpIcon class="h-6 w-6 p-0.5" />
            </div>
            <div>
              <div class="flex space-x-2 pr-2">
                <div class="">1</div>
                <div class="">!</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Open -->
        <div class="text-xs">
          <div class="bg-base-50 h-12 w-full justify-between flex items-center border-t border-base-300 px-2">
            <div class="pl-2 font-bold">Activity</div>
            <div class="cursor-pointer text-base-700 hover:text-base-900">
              <ChevronDownIcon class="h-6 w-6 p-0.5"/>
            </div>
            <div>
              <div class="flex space-x-2" v-if="true">
                <div class="cursor-pointer" v-if="true"><ArrowsPointingOutIcon class="h-6 w-6 p-0.5" /></div>
                <div class="cursor-pointer" v-if="true"><FunnelIcon class="h-6 w-6 p-0.5" /></div>
              </div>
              <div class="flex space-x-2 pr-2" v-else>
                <div class="">1</div>
                <div class="">!</div>
              </div>
            </div>
          </div>
          <div class="h-48 flex" v-if="true">
            <div class="border-t border-base-300 w-full p-2 space-y-2 overflow-y-auto">
              <div class="flex justify-between items-center w-full bg-base-50 h-11" v-for="message in messages">
                <div class="flex space-x-2 items-center">
                  <div :class="`bg-${message.type}-500`" class="w-3 h-11"></div>
                  <div class="rounded-full w-6 h-6 p-0.5" :class="`bg-${message.type}-500`">
                    <div></div>
                  </div>
                  <div>{{ message.content }}</div>
                </div>
                <div class="text-right px-2 text-base-700">
                  <div class="">
                    {{  message.date }}
                  </div>
                  <div class="">
                    {{  message.time }}
                  </div>
                </div>
              </div>
              <div class="bg-fuchsia-50 justify-between flex py-0.5">
                <div class="">Displaying # of # messages</div>
                <div class="">Load More</div>
              </div>
            </div>
            <div class="w-10 px-2 py-2 flex flex-col justify-between transition-all ease-in-out duration-150 bg-base-50 border-l border-base-300" v-if="true">
              <div class="h-6 w-6 bg-fuchsia-500"></div>
              <div class="h-6 w-6 bg-fuchsia-500"></div>
              <div class="h-6 w-6 bg-fuchsia-500"></div>
              <div class="h-6 w-6 bg-fuchsia-500"></div>
              <div class="h-6 w-6 bg-fuchsia-500"></div>
            </div>
          </div>
        </div>

        
        <div class="text-xs">
          <div class="bg-base-50 h-12 w-full items-center border-t border-base-300 px-2 grid grid-cols-10">
            <div class="pl-2 font-bold col-span-4">Activity</div>
            <div class="cursor-pointer text-base-600 hover:text-base-800 col-span-2 flex justify-center">
              <ChevronDownIcon class="h-6 w-6"/>
            </div>
            <div class="col-span-4 flex justify-end">
              <div class="flex space-x-2" v-if="false">
                <div class="cursor-pointer hover:text-base-800 text-base-600" v-if="true"><ArrowsPointingOutIcon class="h-6 w-6" /></div>
                <div class="cursor-pointer hover:text-base-800 text-base-600" v-if="true"><FunnelIcon class="h-6 w-6" /></div>
              </div>
              <div class="flex -space-x-1" v-else>
                <div class="" v-for="value, key in { danger: 2, warning: 1, magic: 3, info: 1, unknown: 8, success: 17 }">
                  <div :class="`rounded-full px-2 bg-status-${key} text-white py-1 font-medium min-w-6 text-center`">{{ value }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-48 flex " v-if="true">
            <div class="border-t border-base-300 w-full p-2 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-base-100 [&::-webkit-scrollbar-thumb]:bg-base-400">
              <CStatusMessage v-for="message in messages" :status="message.type" :content="message.content" :timestamp="message.timestamp" />
              <div class="bg-fuchsia-50 justify-between flex py-0.5">
                <div class="">Displaying # of # messages</div>
                <div class="">Load More</div>
              </div>
            </div>
            <div class="w-11 px-2 py-2 flex flex-col justify-between transition-all ease-in-out duration-150 bg-base-50 border-l border-base-300" v-if="true">
              <CCheckbox no-label color="danger" v-model="boolTest1" class="-ml-1.5" colorUnchecked />
              <CCheckbox no-label color="warning" v-model="boolTest1" class="-ml-1.5" colorUnchecked />
              <CCheckbox no-label color="success" v-model="boolTest1" class="-ml-1.5" colorUnchecked />
              <CCheckbox no-label color="magic" v-model="boolTest1" class="-ml-1.5" colorUnchecked />
              <CCheckbox no-label color="info" v-model="boolTest1" class="-ml-1.5" colorUnchecked />
              <CCheckbox no-label v-model="boolTest1" class="-ml-1.5" colorUnchecked />
            </div>
          </div>
        </div>

      </div>


      <div class="bg-white p-8 flex space-x-8">
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="base"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="brand"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="info"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="magic"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="success"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="warning"
          />
        </svg>
        <svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
          <CDraggablePoint
            :point="point"
            @dragging="(pt) => point = pt"
            @drag-end="(pt) => point = pt"
            color="danger"
          />
        </svg>
      </div>


      <div class="bg-white p-8 flex space-x-8">
        <CSelectFileType :types="[{ label:'Test 1', ext: 'json' }, { label:'Test 2', ext: 'pdf' }]" selected="0" />
      </div>

      


    </div>

    

  </div>
</template>

<script setup>
import { ref } from 'vue';
import CAccordion from './components/Accordion/Accordion.vue';
import CHeading from './components/Heading/Heading.vue';
import CStack from './components/Stack/Stack.vue';
import CNest from './components/Nest/Nest.vue';
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
import CSelectFileType from './components/SelectFileType/SelectFileType.vue';
import CSelectFileTypeItem from './components/SelectFileType/SelectFileTypeItem.vue';
import CDraggablePoint from './components/DraggablePoint/DraggablePoint.vue';
import { CTool, CToolGroup } from './components/Toolbar';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/outline';

const fileTypes = ref([
  {ext: '.pdf', label: 'Example1', val: 'item1' },
  {ext: '.pdf', label: 'PDF - Alternate type', val: 'item2' },
  {ext: '.json', label: 'Example2', val: 'item3' },
  {ext: '.dxf', label: 'Example3', val: 'item4' }
]);
const currentFileType = ref(fileTypes[0]);

const textTest1 = ref('test');
const numericTest1 = ref(3);
const boolTest1 = ref(true);
const point = ref({ x: 50, y: 50 })
const form1 =  ref({
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
});

const messages = [
  { type: 'success', timestamp: 1738951249000, content: 'Entity 1011: Successfully generated product' },
  { type: 'magic', timestamp: 1738951231000, content: 'Entity 1011: Calculating product' },
  { type: 'unknown', timestamp: 1738951231000, content: 'Configuration Loaded' },
  { type: 'warning', timestamp: 1738951249000, content: 'Entity 1011: Successfully generated product' },
  { type: 'danger', timestamp: 1738951231000, content: '<b>Entity 1011:</b> Calculating product' },
  { type: 'info', timestamp: 1738951231000, content: 'Configuration Loaded' },
  { timestamp: 1738951231000, content: 'Configuration Loaded' },
  { content: 'Configuration Loaded' },
  { },
]


const value =  ref(null);

const spinnerData = { rotating: true, type: ['sync', 'sync'] };

const checkValue =  ref(false);
const checkValue2 =  ref(true);
const checkValue3 =  ref(false);
const checkValue4 =  ref(true);
const ListboxValue =  ref('Option 1');
const RadioGroupValue =  ref('Option 2');
const ButtonGroupValue =  ref('Option 2');
const RadioGroupIdOptions =  ref('Option 2');
const ButtonGroupIdOptions =  ref('Option 2');
const Options =  ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']);
const OptionsObjects =  ref([
  { label: 'Option 1', value: 'Option 1', disabled: false },
  { label: 'Option 2', value: 'Option 2', disabled: false },
  { label: 'Option 3', value: 'Option 3', disabled: false },
  { label: 'Option 4', value: 'Option 4', disabled: true },
  { label: 'Option 5', value: 'Option 5', disabled: false },
]);
const value2 =  ref('Male');
const leftPaneSize =  ref(null);
const birthMonthOptions =  ref([
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
]);
const errors =  ref({
  emailAddress: 'Not a valid email address',
  serviceLevel: 'You cant afford it',
});

</script>
