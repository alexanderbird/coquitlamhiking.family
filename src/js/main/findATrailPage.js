
function onPrevious(optionFieldSet) {
  const previousOptionFieldSet = getPreviousSibling(optionFieldSet, '.option-field-set');
  previousOptionFieldSet.classList.remove('option-field-set--complete');
}

function onNext(optionFieldSet) {
  optionFieldSet.classList.add('option-field-set--complete');
}

function onPageReset() {
  Array.from(document.querySelectorAll('.option-field-set')).forEach(optionFieldSet => {
    optionFieldSet.classList.remove('option-field-set--complete');
  });
}

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
});

function getPreviousSibling(thisElement, selector) {
  let sibling = thisElement.previousElementSibling;

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
}
