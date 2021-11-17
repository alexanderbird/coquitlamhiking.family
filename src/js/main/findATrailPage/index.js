import { onPrevious } from './onPrevious.js';
import { onNext } from './onNext.js';
import { onPageReset } from './onPageReset.js';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.option-field-set__button-previous')).forEach(button => {
    const optionFieldSet = button.closest('.option-field-set');
    button.addEventListener('click', () => onPrevious(optionFieldSet));
  });

  Array.from(document.querySelectorAll('.option-input__checkbox')).forEach(button => {
    const optionFieldSet = button.closest('.option-field-set');
    button.addEventListener('click', () => onNext(optionFieldSet));
  });

  tryQuerySelector('.find-page__button-reset', e => e.addEventListener('click', onPageReset));
  tryQuerySelector('.find-page__button-previous', e => e.addEventListener('click', () => onPrevious(document.querySelector('.trails'))));
});

function tryQuerySelector(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  }
}
