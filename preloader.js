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
    background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
    z-index: 9999;
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

overlay.appendChild(lottieContainer);
document.body.appendChild(overlay);

// Track API Call Completion
let api1Completed = false;
let api2Completed = false;

// Define the API endpoints to track
const API_1_URL = "https://zlkzoemaqpyaumsknadt.supabase.co/rest/v1/rpc/get_user_calls_all"; // Replace with your actual endpoint
const API_2_URL = "https://zlkzoemaqpyaumsknadt.supabase.co/rest/v1/rpc/get_user_structure"; // Replace with your actual endpoint

function checkIfBothApisCompleted() {
    if (api1Completed && api2Completed) {
        hideOverlay();
    }
}

// Hook into fetch API to monitor when APIs are called
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    const response = await originalFetch(...args);
    const url = args[0];

    // Check if the response URL matches one of the APIs
    if (url.includes(API_1_URL)) {
        api1Completed = true;
    }
    if (url.includes(API_2_URL)) {
        api2Completed = true;
    }

    checkIfBothApisCompleted();
    return response;
};

// Hide overlay when both APIs are done
function hideOverlay() {
    overlay.style.opacity = "0"; // Fade out
    setTimeout(() => {
        overlay.remove(); // Remove from DOM
    }, 500); // Delay for fade-out effect

    lottieContainer.style.display = 'block';
    
    lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://NirIzhak.github.io/preloaderJSLottie/JVGIsylS3F-3.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
        }
    });
}
