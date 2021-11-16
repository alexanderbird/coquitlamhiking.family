
function onPrevious(optionFieldSet) {
  // revert state
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  trailfinderData.selectionPattern = trailfinderData.selectionPattern.replace(/\([^(]+\)$/, '');

  // mark previous as incomplete
  const previousOptionFieldSet = getPreviousSibling(optionFieldSet, '.option-field-set');
  previousOptionFieldSet.classList.remove('option-field-set--complete');
}

function onNext(optionFieldSet) {
  // update state
  const selectedCodes = Array.from(optionFieldSet.querySelectorAll('input[type="checkbox"]:checked')).map(input => {
    return input.dataset.code;
  });
  const optionPattern = selectedCodes.length ? `(${selectedCodes.join('|')})` : '(.)';
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  if (!trailfinderData.selectionPattern) trailfinderData.selectionPattern = '^';
  trailfinderData.selectionPattern = trailfinderData.selectionPattern + optionPattern;

  // filter hikes if needed
  const nextOption = getNextSibling(optionFieldSet, '.option-field-set');
  if (!nextOption) {
    const selectionPattern = trailfinderData.selectionPattern;
    Array.from(document.querySelectorAll('.hike-tile')).forEach(hikeTile => {
      const genome = hikeTile.dataset.genome;
      hikeTile.classList.toggle('hike-tile--visible', genome.match(selectionPattern));
    });
  }

  // mark as complete
  optionFieldSet.classList.add('option-field-set--complete');
}

function onPageReset() {
  document.querySelector('.trailfinder').dataset.selectionPattern = '';
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

function getNextSibling(thisElement, selector) {
  let sibling = thisElement.nextElementSibling;

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
}
