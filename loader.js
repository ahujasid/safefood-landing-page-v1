window.addEventListener('load', function() {
    const loaderBlur = document.querySelector('.loader');
    const spinner = document.querySelector('.spinner');
    const content = document.querySelector('.main-container');
    
    // Make sure content is visible behind the blur
    content.style.opacity = '1';
    
    // Hide the spinner immediately
    spinner.style.display = 'none';
    
    // Start fading out the blur after a short delay
    setTimeout(() => {
        loaderBlur.style.opacity = '0';
    }, 100); // Small delay to ensure smooth transition
    
    // Remove the loader-blur from the DOM after transition
    loaderBlur.addEventListener('transitionend', function() {
        loaderBlur.style.display = 'none';
    });
});
