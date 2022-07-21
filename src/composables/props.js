export const colorProp = {
  type: String,
  default: 'default',
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