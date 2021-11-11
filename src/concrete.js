import VDragged from 'v-dragged';

import CButton from '@/components/Button';
import CIcon from '@/components/Icon';
import CCheckbox from '@/components/Checkbox';
import CRadio from '@/components/Radio';
import CModal from '@/components/Modal';
import CQuantityInput from '@/components/QuantityInput';
import CSearchSelect from '@/components/SearchSelect';
import CMultiSelect from '@/components/MultiSelect';
import CNativeSelect from '@/components/NativeSelect';
import CSelect from '@/components/Select';
import CTextarea from '@/components/Textarea';
import CTextInput from '@/components/TextInput';
import CMasonry from '@/components/Masonry';
import { CTable, CColumn } from '@/components/Table';
import { CTabSwitcher, CTabLabel, CTab } from '@/components/TabSwitcher';
import { CPanelSlider, CPanel, CPanelLink, CPanelSection } from '@/components/PanelSlider';
import { CToolbar, CToolGroup, CTool } from '@/components/Toolbar';
import CCardList from '@/components/CardList';
import CCard from '@/components/Card';
import CViewport from '@/components/Viewport';
import CViewportContainer from '@/components/ViewportContainer';
import CSvg2dViewport from '@/components/Svg2dViewport';
import CDraggablePoint from '@/components/DraggablePoint';
import CDrawingTools from '@/components/DrawingTools';
import CAlert from '@/components/alert';
import CTooltip, { TooltipOptions } from '@/components/tooltip';
import CStatusBar from '@/components/StatusBar';
import CResizable from '@/components/Resizable';
import CFormSection, { CFormGroup } from '@/components/FormSection';
import CAccordion from '@/components/Accordion';


const components = [
  CButton,
  CIcon,
  CCheckbox,
  CRadio,
  CModal,
  CQuantityInput,
  CSearchSelect,
  CMultiSelect,
  CSelect,
  CNativeSelect,
  CTextarea,
  CTextInput,
  CTable,
  CColumn,
  CTabSwitcher,
  CTabLabel,
  CTab,
  CPanelSlider,
  CPanelLink,
  CPanel,
  CPanelSection,
  CToolbar,
  CToolGroup,
  CTool,
  CCardList,
  CCard,
  CViewport,
  CViewportContainer,
  CSvg2dViewport,
  CDraggablePoint,
  CDrawingTools,
  CMasonry,
  CStatusBar,
  CResizable,
  CFormSection,
  CFormGroup,
  CAccordion,
];

// Allow setting of default size + theme at install time
const install = (Vue, { size = null, theme = null } = {}) => {
  components.forEach((component) => {
    if (component.props
      && ((component.props.size && size) || (component.props.theme && theme))) {
      const props = {
        ...component.props,
        ...(size && { size: { type: String, default: size } }),
        ...(theme && { theme: { type: String, default: theme } }),
      };

      Vue.component(component.name, {
        ...component,
        props,
      });
    } else {
      Vue.component(component.name, component);
    }
  });

  Vue.prototype.$alert = CAlert; // eslint-disable-line

  CTooltip.options = TooltipOptions;
  Vue.directive('concrete-tooltip', CTooltip);
  Vue.use(VDragged);
};

export default {
  install,
  CAlert,
  ...components,
};

export {
  CButton,
  CIcon,
  CCheckbox,
  CRadio,
  CModal,
  CQuantityInput,
  CSearchSelect,
  CMultiSelect,
  CSelect,
  CNativeSelect,
  CTextarea,
  CTextInput,
  CTable,
  CColumn,
  CTabSwitcher,
  CTabLabel,
  CTab,
  CPanelSlider,
  CPanelLink,
  CPanel,
  CPanelSection,
  CToolbar,
  CToolGroup,
  CTool,
  CCardList,
  CCard,
  CMasonry,
  CViewport,
  CViewportContainer,
  CSvg2dViewport,
  CDraggablePoint,
  CAlert,
};
