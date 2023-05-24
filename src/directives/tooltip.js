export default (el, binding) => {
  // this will be called for both `mounted` and `updated`
  console.log(el);
  console.log(binding)
  el.title = binding.value
}