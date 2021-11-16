export function onPageReset() {
  document.querySelector('.trailfinder').dataset.selectionPattern = '';

  Array.from(document.querySelectorAll('.option-field-set')).forEach(optionFieldSet => {
    optionFieldSet.classList.remove('option-field-set--complete');
    Array.from(optionFieldSet.querySelectorAll('.option-input__checkbox')).forEach(input => {
      input.checked = false;
    });
  });
}
