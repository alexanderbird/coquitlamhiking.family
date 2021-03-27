function share() {
  const title = document.head.querySelector('title').textContent;
  const url = window.location.href;
  navigator.share({ url, text });
}

if (navigator.share) {
  document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.querySelectorAll('.share-action')).forEach(button => {
      button.addEventListener('click', share);
      button.classList.remove('share-action--not-supported');
    });
  });
}
