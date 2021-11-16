import { getNextSibling } from './domSearching.js';

export function onNext(optionFieldSet) {
  const trailfinderData = optionFieldSet.closest('.trailfinder').dataset;
  updateState(optionFieldSet, trailfinderData);
  prepareForNextStep(optionFieldSet, trailfinderData);
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

function prepareForNextStep(optionFieldSet, trailfinderData) {
  const nextOption = getNextSibling(optionFieldSet, '.option-field-set');
  if (nextOption) {
    filterOptions(nextOption, trailfinderData.selectionPattern);
    autoProceedIfApplicable(nextOption);
  } else {
    filterTrails(trailfinderData.selectionPattern);
  }
}

function filterOptions(optionFieldSet, currentSelectionPattern) {
  const allTrailGenomes = Array.from(document.querySelectorAll('.hike-tile')).map(tile => tile.dataset.genome);
  Array.from(optionFieldSet.querySelectorAll('input[type="checkbox"]')).forEach(input => {
    input.checked = false;
    const codeForThisInput = input.dataset.code;
    const hypotheticalSelectionPattern = currentSelectionPattern + `(${codeForThisInput})`;
    const hasAtLeastOneTrail = allTrailGenomes.some(g => g.match(hypotheticalSelectionPattern));
    getNextSibling(input, 'label').classList.toggle('label--hidden', !hasAtLeastOneTrail);
  });
}

function autoProceedIfApplicable(optionFieldSet) {
  if (optionFieldSet.querySelectorAll('label:not(.label--hidden)').length < 2) {
    onNext(optionFieldSet);
  }
}

function filterTrails(selectionPattern) {
  Array.from(document.querySelectorAll('.hike-tile')).forEach(hikeTile => {
    const genome = hikeTile.dataset.genome;
    hikeTile.classList.toggle('hike-tile--visible', genome.match(selectionPattern));
  });
}

function markAsComplete(optionFieldSet) {
  optionFieldSet.classList.add('option-field-set--complete');
}
