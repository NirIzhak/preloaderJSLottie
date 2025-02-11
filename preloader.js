    document.addEventListener("DOMContentLoaded", function () {
        const API_URL_TO_WAIT_FOR = "https://zlkzoemaqpyaumsknadt.supabase.co/rest/v1/rpc/get_user_calls_all"; // Change to your API endpoint

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

        // Function to show loader
        window.showLoader = function () {
            overlay.style.display = 'flex';
            lottieContainer.style.display = 'block';
        };

        // Function to hide loader
        window.hideLoader = function () {
            setTimeout(() => {
                overlay.style.display = 'none';
                lottieContainer.style.display = 'none';
            }, 500); // Delay for smooth transition
        };

        // Track API call status
        window.apiCallInProgress = false;

        // Intercept fetch requests to detect when API call starts
        (function () {
            const originalFetch = window.fetch;
            window.fetch = async function (...args) {
                const requestUrl = args[0];

                // If this is the API call we are waiting for, show the loader
                if (requestUrl.includes(API_URL_TO_WAIT_FOR)) {
                    window.apiCallInProgress = true;
                    window.showLoader();
                }

                try {
                    const response = await originalFetch(...args);

                    // When the API call completes successfully, hide the loader
                    if (requestUrl.includes(API_URL_TO_WAIT_FOR)) {
                        window.apiCallInProgress = false;
                        window.hideLoader();
                    }

                    return response;
                } catch (error) {
                    if (requestUrl.includes(API_URL_TO_WAIT_FOR)) {
                        window.apiCallInProgress = false;
                        window.hideLoader(); // Hide loader even if API fails
                    }
                    throw error;
                }
            };
        })();

        // Auto-show loader on page load
        window.showLoader();

        // Prevent hiding too soon
        window.addEventListener('load', function () {
            setTimeout(() => {
                if (!window.apiCallInProgress) {
                    window.hideLoader();
                }
            }, 2000); // Minimum loader display time
        });

        // Fallback timeout to hide loader after 15 seconds max
        setTimeout(window.hideLoader, 15000);
    });
