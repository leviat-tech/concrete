import CIcon from '../../src/components/Icon.vue';

export default {
  title: 'Icon',
  component: CIcon,
};

export const Size = () => ({
  components: { CIcon },
  template: `
    <div>
      <div style="margin-bottom:0.25rem;">
        <c-icon size="xs" type="chevron-up" />
        <c-icon size="xs" type="chevron-up" />
        <c-icon size="xs" type="chevron-down" />
        <c-icon size="xs" type="chevron-down" />
        <c-icon size="xs" type="chevron-left" />
        <c-icon size="xs" type="chevron-left" />
        <c-icon size="xs" type="chevron-right" />
        <c-icon size="xs" type="chevron-right" />
        <c-icon size="xs" type="times" />
        <c-icon size="xs" type="minus-circle" />
      </div>
      <div style="margin-bottom:0.25rem;">
        <c-icon size="sm" type="chevron-up" />
        <c-icon size="sm" type="chevron-up" />
        <c-icon size="sm" type="chevron-down" />
        <c-icon size="sm" type="chevron-down" />
        <c-icon size="sm" type="chevron-left" />
        <c-icon size="sm" type="chevron-left" />
        <c-icon size="sm" type="chevron-right" />
        <c-icon size="sm" type="chevron-right" />
        <c-icon size="sm" type="times" />
        <c-icon size="sm" type="minus-circle" />
      </div>
      <div style="margin-bottom:0.25rem;">
        <c-icon size="md" type="chevron-up" />
        <c-icon size="md" type="chevron-up" />
        <c-icon size="md" type="chevron-down" />
        <c-icon size="md" type="chevron-down" />
        <c-icon size="md" type="chevron-left" />
        <c-icon size="md" type="chevron-left" />
        <c-icon size="md" type="chevron-right" />
        <c-icon size="md" type="chevron-right" />
        <c-icon size="md" type="times" />
        <c-icon size="md" type="minus-circle" />
      </div>
      <div style="margin-bottom:0.25rem;">
        <c-icon size="lg" type="chevron-up" />
        <c-icon size="lg" type="chevron-up" />
        <c-icon size="lg" type="chevron-down" />
        <c-icon size="lg" type="chevron-down" />
        <c-icon size="lg" type="chevron-left" />
        <c-icon size="lg" type="chevron-left" />
        <c-icon size="lg" type="chevron-right" />
        <c-icon size="lg" type="chevron-right" />
        <c-icon size="lg" type="times" />
        <c-icon size="lg" type="minus-circle" />
      </div>
      <div style="margin-bottom:0.25rem;">
        <c-icon size="xl" type="chevron-up" />
        <c-icon size="xl" type="chevron-up" />
        <c-icon size="xl" type="chevron-down" />
        <c-icon size="xl" type="chevron-down" />
        <c-icon size="xl" type="chevron-left" />
        <c-icon size="xl" type="chevron-left" />
        <c-icon size="xl" type="chevron-right" />
        <c-icon size="xl" type="chevron-right" />
        <c-icon size="xl" type="times" />
        <c-icon size="xl" type="minus-circle" />
      </div>
    </div>
  `,
});
