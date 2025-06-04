export type AvailableSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type AvailableColors = 'default' | 'indigo' | 'sky' | 'steel' | 'success' | 'warning' | 'danger'

export default interface FormElementProps {
    id?: string,
    disabled?: boolean,
    noLabel?: boolean,
    noWrap?: boolean,
    stacked?: boolean,
    label?: string,
    labelFormatter?: (val: string) => string,
    message?: string,
    color?: AvailableColors,
    size?: AvailableSizes,
    prefix?: string,
    suffix?: string,
    tooltip?: string,
}