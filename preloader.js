// Create overlay and container elements
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
document.body.appendChild(lottieContainer);

// Initialize Lottie animation
const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://NirIzhak.github.io/preloaderJSLottie/JVGIsylS3F-3.json',
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
    }
});

// Create a promise that resolves when the page is loaded
const pageLoadPromise = new Promise(resolve => {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.addEventListener('load', resolve);
    }
});

// Function to track API calls
let pendingApiCalls = 0;
const apiPromises = [];

// Intercept fetch calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
    pendingApiCalls++;
    const promise = originalFetch.apply(this, args)
        .finally(() => {
            pendingApiCalls--;
            if (pendingApiCalls === 0) {
                apiPromises.push(Promise.resolve());
            }
        });
    apiPromises.push(promise);
    return promise;
};

// Intercept XMLHttpRequest
const originalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
    const xhr = new originalXHR();
    const originalOpen = xhr.open;
    
    xhr.open = function(...args) {
        pendingApiCalls++;
        xhr.addEventListener('loadend', () => {
            pendingApiCalls--;
            if (pendingApiCalls === 0) {
                apiPromises.push(Promise.resolve());
            }
        });
        return originalOpen.apply(xhr, args);
    };
    
    return xhr;
};

// Function to hide overlay when everything is ready
function hideOverlay() {
    overlay.style.display = 'none';
    document.body.style.visibility = 'visible';
}

// Hide page content initially
document.body.style.visibility = 'hidden';

// Wait for both page load and API calls to complete
Promise.all([pageLoadPromise, ...apiPromises])
    .then(() => {
        // Add a small delay to ensure all API calls are truly complete
        setTimeout(() => {
            if (pendingApiCalls === 0) {
                hideOverlay();
            }
        }, 100);
    })
    .catch(error => {
        console.error('Error during loading:', error);
        hideOverlay(); // Hide overlay even if there's an error
    });
