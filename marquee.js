function isMobile() {
    return window.innerWidth <= 768; // Adjust this breakpoint as needed
}

function setupMarquee(elementId, direction) {
    const marquee = document.getElementById(elementId);
    const items = marquee.querySelectorAll('.marquee-item');
    const isMobileDevice = isMobile();
    
    // Calculate total width for mobile
    const totalWidth = isMobileDevice
        ? Array.from(items).reduce((sum, item) => sum + item.offsetWidth, 0)
        : 0;
    
    // Calculate total height for desktop
    const totalHeight = isMobileDevice
        ? 0
        : Array.from(items).reduce((sum, item) => sum + item.offsetHeight, 0);

    // Remove existing clones
    marquee.innerHTML = '';
    
    // Add original items and clones to ensure seamless looping
    items.forEach(item => {
        marquee.appendChild(item.cloneNode(true));
    });
    items.forEach(item => {
        marquee.appendChild(item.cloneNode(true));
    });

    const containerWidth = marquee.parentElement.offsetWidth;
    const containerHeight = marquee.parentElement.offsetHeight;
    
    let currentPosition = isMobileDevice
        ? (direction === 'right' ? -totalWidth + containerWidth : 0)
        : (direction === 'down' ? -totalHeight + containerHeight : 0);
    
    const speed = 1; // Reduced speed for smoother animation
    let lastTimestamp = 0;

    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        if (isMobileDevice) {
            currentPosition += speed * (direction === 'left' ? -1 : 1) * (deltaTime / 16.67);
            
            if (direction === 'left' && currentPosition <= -totalWidth) {
                currentPosition += totalWidth;
            } else if (direction === 'right' && currentPosition >= 0) {
                currentPosition -= totalWidth;
            }

            marquee.style.transform = `translateX(${currentPosition.toFixed(2)}px)`;
        } else {
            currentPosition += speed * (direction === 'up' ? -1 : 1) * (deltaTime / 16.67);
            
            if (direction === 'up' && currentPosition <= -totalHeight) {
                currentPosition += totalHeight;
            } else if (direction === 'down' && currentPosition >= 0) {
                currentPosition -= totalHeight;
            }

            marquee.style.transform = `translateY(${currentPosition.toFixed(2)}px)`;
        }

        requestAnimationFrame(animate);
    }

    // Set initial position
    if (isMobileDevice) {
        marquee.style.transform = `translateX(${currentPosition}px)`;
    } else {
        marquee.style.transform = `translateY(${currentPosition}px)`;
    }

    requestAnimationFrame(animate);
}

function initMarquees() {
    if (isMobile()) {
        setupMarquee('marqueeUp', 'left');
        setupMarquee('marqueeDown', 'right');
    } else {
        setupMarquee('marqueeUp', 'up');
        setupMarquee('marqueeDown', 'down');
    }
}

window.addEventListener('load', initMarquees);
window.addEventListener('resize', initMarquees);