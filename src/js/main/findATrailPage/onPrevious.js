import { getPreviousSibling } from './domSearching.js';

export function onPrevious(optionFieldSet) {
  revertState(optionFieldSet);
  const previousOptionFieldSet = getPreviousSibling(optionFieldSet, '.option-field-set');
  markPreviousAsIncomplete(previousOptionFieldSet)
  goBackAgainIfOnlyOneOption(previousOptionFieldSet);
}

function revertState(optionFieldSet) {
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  trailfinderData.selectionPattern = trailfinderData.selectionPattern.replace(/\([^(]+\)$/, '');
}

function markPreviousAsIncomplete(previousOptionFieldSet) {
  previousOptionFieldSet.classList.remove('option-field-set--complete');
}

function goBackAgainIfOnlyOneOption(previousOptionFieldSet) {
  if (previousOptionFieldSet.querySelectorAll('label:not(.label--hidden)').length < 2) {
    onPrevious(previousOptionFieldSet);
  }
}
