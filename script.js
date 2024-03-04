// Prompt to install as PWA when visiting the web app
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    }
}

function addPWA() {
    var name = document.getElementById("nameInput").value;
    var version = document.getElementById("versionInput").value;
    var url = document.getElementById("urlInput").value;

    // Register the user-entered URL as a PWA
    if (url && url.trim() !== '') {
        if ('serviceWorker' in navigator && 'register' in navigator.serviceWorker) {
            navigator.serviceWorker.register('service-worker.js')
                .then(function (registration) {
                    return registration.sync.register('addPWA', {
                        name: name,
                        version: version,
                        url: url
                    });
                })
                .catch(function (err) {
                    console.error('Service Worker registration failed:', err);
                });
        }
    }
}
