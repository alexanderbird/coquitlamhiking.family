function share() {
  const title = document.head.querySelector('title').textContent;
  const url = window.location.href;
  navigator.share({ url, text });
}

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.share) {
    Array.from(document.querySelectorAll('.share-action')).forEach(button => {
      button.addEventListener('click', share);
      button.classList.remove('share-action--not-supported');
    });
  }
});
