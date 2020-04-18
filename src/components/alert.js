import Vue from 'vue';
import CAlertbox from './Alertbox.vue';

// Largely cribbed from:
// https://github.com/ElemeFE/element/blob/dev/packages/message/src/main.js

let instance;
const instances = [];
let seed = 1;

const Alert = function alert(message) { // eslint-disable-line
  if (Vue.prototype.$isServer) return null;

  const AlertConstructor = Vue.extend(CAlertbox);

  const options = typeof message === 'string'
    ? { message }
    : (message || {});

  const userOnClose = options.onClose;
  const id = `alert_${seed += 1}`;

  options.onClose = function onClose() {
    Alert.close(id, userOnClose);
  };

  instance = new AlertConstructor({
    data: options,
  });

  instance.id = id;

  instance.$mount();
  document.body.appendChild(instance.$el);

  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = 60;
  instances.push(instance);

  return instance;
};

Alert.close = function close(id, userOnClose) {
  const len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i += 1) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i += 1) {
    const dom = instances[i].$el;
    dom.style.top = `${parseInt(dom.style.top, 10) - removedHeight - 16}px`;
  }
};

Alert.closeAll = function closeAll() {
  for (let i = instances.length - 1; i >= 0; i -= 1) {
    instances[i].close();
  }
};

export default Alert;
