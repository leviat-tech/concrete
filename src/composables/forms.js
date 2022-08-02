import { useConcrete } from './concrete.js';

export const useFormLabel = (props) => {
  const concrete = useConcrete();

  const formatter = props.labelFormatter || concrete.labelFormatter;

  return (!!props.label) ? formatter(props.label, props.id) : null;
}
