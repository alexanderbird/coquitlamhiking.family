import { getNextSibling } from './domSearching.js';

export function onNext(optionFieldSet) {
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  updateState(optionFieldSet, trailfinderData);
  filterTrailsIfNeeded(optionFieldSet, trailfinderData.selectionPattern);
  markAsComplete(optionFieldSet);
}

function updateState(optionFieldSet, trailfinderData) {
  const selectedCodes = Array.from(optionFieldSet.querySelectorAll('input[type="checkbox"]:checked')).map(input => {
    return input.dataset.code;
  });
  const optionPattern = selectedCodes.length ? `(${selectedCodes.join('|')})` : '(.)';
  if (!trailfinderData.selectionPattern) trailfinderData.selectionPattern = '^';
  trailfinderData.selectionPattern = trailfinderData.selectionPattern + optionPattern;
}

function filterTrailsIfNeeded(optionFieldSet, selectionPattern) {
  const nextOption = getNextSibling(optionFieldSet, '.option-field-set');
  if (!nextOption) {
    Array.from(document.querySelectorAll('.hike-tile')).forEach(hikeTile => {
      const genome = hikeTile.dataset.genome;
      hikeTile.classList.toggle('hike-tile--visible', genome.match(selectionPattern));
    });
  }
}

function markAsComplete(optionFieldSet) {
  optionFieldSet.classList.add('option-field-set--complete');
}
