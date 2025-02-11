    document.addEventListener("DOMContentLoaded", function () {
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

        // Function to show the loader
        window.showLoader = function () {
            overlay.style.display = 'flex';
            lottieContainer.style.display = 'block';
        };

        // Function to hide the loader
        window.hideLoader = function () {
            setTimeout(() => {
                overlay.style.display = 'none';
                lottieContainer.style.display = 'none';
            }, 500); // Delay to ensure smooth transition
        };

        // Automatically show loader on page load
        showLoader();

        // Prevent hiding the loader too soon
        window.addEventListener('load', function () {
            setTimeout(() => {
                // Wait for API response
                if (!window.apiCallInProgress) {
                    hideLoader();
                }
            }, 2000); // Minimum time loader stays visible
        });

        // Fallback timeout in case API takes too long
        setTimeout(hideLoader, 15000); // Auto-hide after 15 seconds max
    });
