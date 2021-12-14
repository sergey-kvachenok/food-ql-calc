export const sanitize = values => {
  const valuesCopy = { ...values };
  const keys = Object.keys(valuesCopy);

  keys.forEach(key => {
    if (typeof valuesCopy[key] === 'string') {
      valuesCopy[key] = valuesCopy[key].trim();
    }
  });

  return valuesCopy;
};
