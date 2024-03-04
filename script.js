// Prompt to install as PWA after 2 seconds
setTimeout(() => {
    if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            window.deferredPrompt = event;
            setTimeout(() => {
                showInstallPrompt();
            }, 2000);
        });
    }
}, 2000);

function showInstallPrompt() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            window.deferredPrompt = null;
        });
    }
}

function addPWA() {
    var url = document.getElementById("urlInput").value;

    // Check if the browser supports the beforeinstallprompt event
    if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            window.deferredPrompt = event;
            setTimeout(() => {
                showInstallPrompt();
            }, 2000);
        });
    }

    // Register the user-entered URL as a PWA
    if (url && url.trim() !== '') {
        if ('serviceWorker' in navigator && 'register' in navigator.serviceWorker) {
            navigator.serviceWorker.register('service-worker.js')
                .then(function (registration) {
                    return registration.sync.register('addPWA', {
                        url: url
                    });
                })
                .catch(function (err) {
                    console.error('Service Worker registration failed:', err);
                });
        }
    }
}
