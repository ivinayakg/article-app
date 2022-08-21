const parseData = (data) => JSON.parse(data);
const stringifyData = (data) => JSON.stringify(data);

export const clearStorage = () => localStorage.clear();
export const removeFromStorage = (key) => localStorage.removeItem(key);
export const addToStorage = (key, data, stringify) =>
  localStorage.setItem(key, stringify ? stringifyData(data) : data);
export const getFromStorage = (key, parse) =>
  parse ? parseData(localStorage.getItem(key)) : localStorage.getItem(key);
