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
  if (previousOptionFieldSet.querySelectorAll('.option-input__label:not(.option-input__label--hidden)').length < 2) {
    onPrevious(previousOptionFieldSet);
  }
}
