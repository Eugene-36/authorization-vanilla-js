import { isValid } from './utils';
import { Question } from './question';
import { createModal } from './utils';
import { getAuthForm } from './auth';
import { authWithEmailAndPassword } from './auth';
import './style.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const modalBtn = document.getElementById('modal-btn');

const submitBtn = form.querySelector('#submit');

// console.log('form', form);
// console.log('input', input);
// console.log('submitBtn', submitBtn);
window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    submitBtn.disabled = true;
    //Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}
function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button');
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
  console.log('email', email);
  console.log('password', password);
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error!', content);
  } else {
    createModal('List of questions', Question.listToHTML(content));
  }
}
