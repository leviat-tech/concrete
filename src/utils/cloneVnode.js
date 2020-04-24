function clone(h, vnode, options) {
  const classArr = [
    ...(vnode.data.class || []),
  ];
  if (Array.isArray(options.class)) {
    classArr.concat(options.class);
  } else if (typeof options.class === 'object' || typeof options.class === 'string') {
    classArr.concat([options.class]);
  }

  return h(vnode.componentOptions.Ctor, {
    ...vnode.data,
    on: {
      ...(vnode.componentOptions.listeners || {}),
      ...(options.on || {}),
    },
    class: classArr,
    props: {
      ...(vnode.data.props || {}),
      ...(vnode.componentOptions.propsData || {}),
      ...(options.props || {}),
    },
  },
  vnode.children || vnode.componentOptions.children);
}

export default clone;
