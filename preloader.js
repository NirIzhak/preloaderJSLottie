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

// Track API Call Completion
let api1Completed = false;
let api2Completed = false;

function checkIfBothApisCompleted() {
    if (api1Completed && api2Completed) {
        hideOverlay();
    }
}

// Mock API Call Function
async function fetchData(apiUrl, apiNumber) {
    try {
        await fetch(apiUrl); // Simulating API call
        if (apiNumber === 1) api1Completed = true;
        if (apiNumber === 2) api2Completed = true;
        checkIfBothApisCompleted();
    } catch (error) {
        console.error(`API ${apiNumber} failed:`, error);
    }
}

// Hide overlay when both APIs are done
function hideOverlay() {
    overlay.style.display = 'none';
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

// Call your APIs here and wait for completion
window.addEventListener('load', () => {
    fetchData('https://api.example.com/data1', 1);
    fetchData('https://api.example.com/data2', 2);
});
