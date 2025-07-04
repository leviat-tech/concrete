import type CIcon from './components/Icon/Icon.vue';
import type CButton from './components/Button/Button.vue';
import type CListbox from './components/Listbox/Listbox.vue';
import type CCheckbox from './components/Checkbox/Checkbox.vue';
import type CPopupMenu from './components/PopupMenu/PopupMenu.vue';
import type CRadioGroup from './components/RadioGroup/RadioGroup.vue';
import type CFromSection from './components/FormSection/FormSection.vue';
import type CNumericInput from './components/NumericInput/NumericInput.vue';
import type CStatusIndicator from './components/Status/StatusIndicator.vue';
import type CConfirmationModal from './components/Modal/ConfirmationModal.vue';
import type CSelectFileType from './components/SelectFileType/SelectFileType.vue';
import type CAccordionWrapper from './components/AccordionWrapper/AccordionWrapper.vue';

declare module 'vue' {
  export interface GlobalComponents {
    CIcon: typeof CIcon;
    CButton: typeof CButton;
    CListbox: typeof CListbox;
    CCheckbox: typeof CCheckbox;
    CPopupMenu: typeof CPopupMenu;
    CRadioGroup: typeof CRadioGroup;
    CFormSection: typeof CFromSection;
    CNumericInput: typeof CNumericInput;
    CSelectFileType: typeof CSelectFileType;
    CStatusIndicator: typeof CStatusIndicator;
    CAccordionWrapper: typeof CAccordionWrapper;
    CConfirmationModal: typeof CConfirmationModal;
  }
}