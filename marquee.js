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
    const speed = 1; // Reduced speed for smoother animation
    let lastTimestamp = 0;

    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        currentPosition += speed * (direction === 'up' ? -1 : 1) * (deltaTime / 16.67); // 60 FPS normalization
        
        if (direction === 'up' && currentPosition <= -totalHeight) {
            currentPosition += totalHeight;
        } else if (direction === 'down' && currentPosition >= 0) {
            currentPosition -= totalHeight;
        }

        marquee.style.transform = `translateY(${currentPosition.toFixed(2)}px)`;
        requestAnimationFrame(animate);
    }

    // Set initial position
    marquee.style.transform = `translateY(${currentPosition}px)`;

    requestAnimationFrame(animate);
}

function initMarquees() {
    setupMarquee('marqueeUp', 'up');
    setupMarquee('marqueeDown', 'down');
}

window.addEventListener('load', initMarquees);
window.addEventListener('resize', initMarquees);