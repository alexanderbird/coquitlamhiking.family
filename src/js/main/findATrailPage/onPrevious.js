import { getPreviousSibling } from './domSearching.js';

export function onPrevious(optionFieldSet) {
  revertState(optionFieldSet);
  const previousOptionFieldSet = getPreviousSibling(optionFieldSet, '.option-field-set');
  deselectPrevious(previousOptionFieldSet);
  markPreviousAsIncomplete(previousOptionFieldSet)
  goBackAgainIfOnlyOneOption(previousOptionFieldSet);
}

function revertState(optionFieldSet) {
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  trailfinderData.selectionPattern = trailfinderData.selectionPattern.replace(/\([^(]+\)$/, '');
}

function deselectPrevious(previousOptionFieldSet) {
  Array.from(previousOptionFieldSet.querySelectorAll('.option-input__checkbox')).forEach(input => {
    input.checked = false;
  });
}

function markPreviousAsIncomplete(previousOptionFieldSet) {
  previousOptionFieldSet.classList.remove('option-field-set--complete');
}

function goBackAgainIfOnlyOneOption(previousOptionFieldSet) {
  const nonWildcardOptions = Array.from(previousOptionFieldSet.querySelectorAll('label:not(.option-input__label--hidden)'))
    .filter(x => x.dataset.code !== '.');
  if (nonWildcardOptions.length < 2) {
    onPrevious(previousOptionFieldSet);
  }
}
