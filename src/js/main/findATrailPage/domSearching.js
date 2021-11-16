export function getPreviousSibling(thisElement, selector) {
  let sibling = thisElement.previousElementSibling;

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
}

export function getNextSibling(thisElement, selector) {
  let sibling = thisElement.nextElementSibling;

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
}
