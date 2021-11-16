import { onPrevious } from './onPrevious.js';
import { onNext } from './onNext.js';
import { onPageReset } from './onPageReset.js';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.option-field-set__button-previous')).forEach(button => {
    const optionFieldSet = button.closest('.option-field-set');
    button.addEventListener('click', () => onPrevious(optionFieldSet));
  });

  Array.from(document.querySelectorAll('.option-field-set__button-next')).forEach(button => {
    const optionFieldSet = button.closest('.option-field-set');
    button.addEventListener('click', () => onNext(optionFieldSet));
  });

  document.querySelector('.find-page__button-reset').addEventListener('click', onPageReset);
  document.querySelector('.find-page__button-previous').addEventListener('click', () => onPrevious(document.querySelector('.trails')));
});
