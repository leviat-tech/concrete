import { kebabCase } from 'lodash-es'


export default function formatCode(codeBlock, ctx) {
  const { args, argTypes } = ctx;


  if (codeBlock.startsWith('{')) return;

  const componentArgs = {};

  for (const [k, t] of Object.entries(argTypes)) {
    const val = args[k]
    if (typeof val !== 'undefined' && t.table && t.table.category === 'props' && val !== t.defaultValue) {
      componentArgs[k] = val
    }
  }

  const propToSource = (key, val) => {
    if (key === 'model-value') return '';

    const type = typeof val
    switch (type) {
      case 'boolean':
        return val ? key : ''
      case 'string':
        return `${key}="${val}"`
      default:
        return `:${key}="${val}"`
    }
  }

  const replacing = /v-bind="[^"]+"/;

  return codeBlock
    .replace(replacing, Object.keys(componentArgs)
      .map((key) => ' ' + propToSource(kebabCase(key), args[key]))
      .join(''),
  ).replace(/{{\s?args.content\s?}}/, args.content);

}
