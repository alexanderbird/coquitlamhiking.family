export function onPageReset() {
  document.querySelector('.trailfinder').dataset.selectionPattern = '';

  Array.from(document.querySelectorAll('.option-field-set')).forEach(optionFieldSet => {
    optionFieldSet.classList.remove('option-field-set--complete');
  });
}
