export const size = {
  options: ['lg', 'md', 'sm', 'xs'],

  control: {
    type: 'select',
  },
};

export const color = {
  options: [
    'default',
    'info',
    'magic',
    'success',
    'warning',
    'danger',
  ],
  control: {
    type: 'select',
  },
};

export const formElementProps = {
  size,
  color,
  disabled: { control: 'boolean' },
  readOnly: { control: 'boolean' },
  placeholder: { control: 'text' },
  prefix: {
    control: 'text',
    table: {
      type: {
        summary: 'slot/prop',
      },
    },
  },
  suffix: {
    control: 'text',
    table: {
      type: {
        summary: 'slot/prop',
      },
    },
  },
}
