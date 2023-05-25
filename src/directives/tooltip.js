export default (el, binding) => {
  // this will be called for both `mounted` and `updated`
  el.title = binding.value
}