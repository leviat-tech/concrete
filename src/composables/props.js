export const colorProp = {
  type: String,
  validator: (prop) => ['default', 'indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
}

export const useSizeProp = (maxSize = 'lg') => {
  const allSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const sliceAtIndex = allSizes.indexOf(maxSize) + 1;
  const validPropSizes = (sliceAtIndex === 0) ? allSizes : allSizes.slice(0, sliceAtIndex);

  return {
    type: String,
    validator(value) {
      return validPropSizes.includes(value)
    }
  }
}

export const formElementProps = {
  id: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  noLabel: { type: Boolean, default: false },
  noWrap: { type: Boolean },
  stacked: { type: Boolean },
  label: String,
  labelFormatter: Function,
  message: [String, Object],
  color: colorProp,
  size: useSizeProp(),
  prefix: String,
  suffix: String,
  info: String,
}