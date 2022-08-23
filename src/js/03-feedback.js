import trottle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', getFormInputData);
form.addEventListener('input', trottle(dataInput, 500));

populateTextInput();

function getFormInputData(event) {
  event.preventDefault();
  const values = {};
  const elements = event.target.elements;
  for (let i = 0; i < elements.length; i += 1) {
    const { name } = elements[i];

    if (name) {
      const { value } = elements[i];

      values[name] = value;
    }
    if (values.email === '' || values.message === '') {
      return;
    }
  }
  console.log(values);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function dataInput() {
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  console.log(values);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function populateTextInput() {
  const saveValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveValue) {
    form.email.value = saveValue.email;
    form.message.value = saveValue.message;
  }
}
