function share() {
  /*
   * https://w3c.github.io/web-share/
   * Note that a url of '' refers to the current page URL, just as it would in a link.
   */
  const title = document.head.querySelector('title').textContent;
  const url = window.location.href;
  navigator.share({ title, url });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof navigator.share === 'function') {
    document.body.classList.add('has-navigator-share');
    Array.from(document.querySelectorAll('.share-action')).forEach(button => {
      button.addEventListener('click', share);
    });
  }
});
