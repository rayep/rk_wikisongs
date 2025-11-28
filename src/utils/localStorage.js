export function initLSContainer(container, data) {
  !getItemLS(container)?.length && addItemLS(container, data);
}

export function updateLSContainer(container, data) {
  let existingItems = getItemLS(container);
  !existingItems.includes(data) &&
    existingItems.push(data) &&
    addItemLS(container, [...existingItems]);
}

export function addItemLS(container, data) {
  return localStorage.setItem(container, JSON.stringify(data));
}

export function deleteItemLS(container) {
  localStorage.removeItem(container);
}

export function getItemLS(container) {
  return JSON.parse(localStorage.getItem(container));
}
