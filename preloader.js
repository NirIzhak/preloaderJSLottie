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
            window.apiCallInProgress = true;
            overlay.style.display = 'flex';
            lottieContainer.style.display = 'block';
        };

        // Function to hide the loader **immediately when API finishes**
        window.hideLoader = function () {
            if (!window.apiCallInProgress) {
                overlay.style.display = 'none';
                lottieContainer.style.display = 'none';
            }
        };

        // Show loader on page load
        window.showLoader();

        // **Ensure Loader Stays Until API Call Completes**
        let checkLoaderInterval = setInterval(() => {
            if (!window.apiCallInProgress) {
                clearInterval(checkLoaderInterval); // **Stop checking once API is done**
                window.hideLoader();
            }
        }, 500); // **Check more frequently (every 0.5 seconds) for faster response**

        // Fallback: Hide loader after **30 seconds max** (in case API hangs)
        setTimeout(() => {
            window.apiCallInProgress = false;
            clearInterval(checkLoaderInterval); // **Stop interval if fallback is triggered**
            window.hideLoader();
        }, 30000); // Adjust timeout if necessary
    });
