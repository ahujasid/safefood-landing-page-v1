window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const left = document.querySelector('.left');

    loader.classList.add('slide-up');

setTimeout(() => {
    // Slide up the loader and show content simultaneously

    left.classList.add('show');
}, 200);
});