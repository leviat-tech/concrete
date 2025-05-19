import type CButton from './components/Button/Button.vue';
import type CListbox from './components/Listbox/Listbox.vue';
import type CCheckbox from './components/Checkbox/Checkbox.vue';
import type CPopupMenu from './components/PopupMenu/PopupMenu.vue';
import type CFromSection from './components/FormSection/FormSection.vue';
import type CNumericInput from './components/NumericInput/NumericInput.vue';
import type CStatusIndicator from './components/Status/StatusIndicator.vue';
import type CConfirmationModal from './components/Modal/ConfirmationModal.vue';
import type CSelectFileType from './components/SelectFileType/SelectFileType.vue';

declare module 'vue' {
  export interface GlobalComponents {
    CButton: typeof CButton;
    CListbox: typeof CListbox;
    CCheckbox: typeof CCheckbox;
    CPopupMenu: typeof CPopupMenu;
    CFormSection: typeof CFromSection;
    CNumericInput: typeof CNumericInput;
    CSelectFileType: typeof CSelectFileType;
    CStatusIndicator: typeof CStatusIndicator;
    CConfirmationModal: typeof CConfirmationModal;
  }
}