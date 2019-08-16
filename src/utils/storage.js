function getItem() {
  return JSON.parse(localStorage.getItem('user'))
}
function setItem(user) {
  localStorage.setItem('user',JSON.stringify(user));
}
function removeItem() {
  localStorage.removeItem('user');
}
export {
  getItem,
  setItem,
  removeItem
}