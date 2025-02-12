const overlay = document.createElement('div');
overlay.id = 'loader';
overlay.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999;
`;

const lottieContainer = document.createElement('div');
lottieContainer.id = 'lottieContainer';
lottieContainer.style.cssText = `
    width: 64px;
    height: 64px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

document.body.appendChild(overlay);
overlay.appendChild(lottieContainer); // Append lottie inside the overlay

// Load the Lottie animation
lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg', // 'canvas' if you prefer
    loop: true,
    autoplay: true,
    path: 'https://NirIzhak.github.io/preloaderJSLottie/JVGIsylS3F-3.json',
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet' // Keeps animation correctly sized
    }
});

// Function to hide the loader after 8 seconds
function hideOverlay() {
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 8000); // 8000ms = 8 seconds
}

window.addEventListener('load', hideOverlay);
