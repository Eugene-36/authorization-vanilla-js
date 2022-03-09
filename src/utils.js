export function isValid(value) {
  return value.length >= 10;
}

export function createModal(title, content) {
  const modalEl = document.createElement('div');

  modalEl.classList.add('modal');

  const html = `
<h1>${title}</h1>
<div class="modal-content">${content}</div>
`;
  modalEl.innerHTML = html;
  // show modal
  mui.overlay('on', modalEl);
}
