function setupMarquee(elementId, direction) {
    const marquee = document.getElementById(elementId);
    const items = marquee.querySelectorAll('.marquee-item');
    const totalHeight = Array.from(items).reduce((sum, item) => sum + item.offsetHeight, 0);

    // Remove existing clones
    marquee.innerHTML = '';
    
    // Add original items and clones to ensure seamless looping
    items.forEach(item => {
        marquee.appendChild(item.cloneNode(true));
    });
    items.forEach(item => {
        marquee.appendChild(item.cloneNode(true));
    });

    const containerHeight = marquee.parentElement.offsetHeight;
    let currentPosition = direction === 'down' ? -totalHeight + containerHeight : 0;
    const speed = 2; // Adjust this value to change the scrolling speed

    function animate() {
        currentPosition += speed * (direction === 'up' ? -1 : 1);
        
        if (direction === 'up' && currentPosition <= -totalHeight) {
            currentPosition += totalHeight;
        } else if (direction === 'down' && currentPosition >= 0) {
            currentPosition -= totalHeight;
        }

        marquee.style.transform = `translateY(${currentPosition}px)`;
        requestAnimationFrame(animate);
    }

    // Set initial position
    marquee.style.transform = `translateY(${currentPosition}px)`;

    animate();
}

function initMarquees() {
    setupMarquee('marqueeUp', 'up');
    setupMarquee('marqueeDown', 'down');
}

window.addEventListener('load', initMarquees);
window.addEventListener('resize', initMarquees);