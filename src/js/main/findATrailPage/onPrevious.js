import { getPreviousSibling } from './domSearching.js';

export function onPrevious(optionFieldSet) {
  revertState(optionFieldSet);
  markPreviousAsIncomplete(optionFieldSet)
}

function revertState(optionFieldSet) {
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  trailfinderData.selectionPattern = trailfinderData.selectionPattern.replace(/\([^(]+\)$/, '');
}

function markPreviousAsIncomplete(optionFieldSet) {
  const previousOptionFieldSet = getPreviousSibling(optionFieldSet, '.option-field-set');
  previousOptionFieldSet.classList.remove('option-field-set--complete');
}
