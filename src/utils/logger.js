const log = (msg, data, level = 'log') => {
  console[level](`[CONCRETE]: ${msg}`, data);
}

export default {
  log,
  info: (msg, data) => log(msg, data, 'info'),
  warn: (msg, data) => log(msg, data, 'warn'),
  error: (msg, data) => log(msg, data, 'error')
}