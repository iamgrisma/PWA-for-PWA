let deferredPrompt;

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

// Function to convert URL to PWA
function addPWA() {
    const name = document.getElementById("nameInput").value;
    const version = document.getElementById("versionInput").value;
    const url = document.getElementById("urlInput").value;

    // Check if all necessary fields are filled
    if (name && version && url && url.trim() !== '') {
        if ('serviceWorker' in navigator && 'register' in navigator.serviceWorker) {
            navigator.serviceWorker.register('service-worker.js')
                .then(function (registration) {
                    return registration.sync.register('addPWA', {
                        name: name,
                        version: version,
                        url: url
                    });
                })
                .then(function () {
                    console.log('URL converted to PWA successfully:', url);
                    alert('URL converted to PWA successfully!');
                })
                .catch(function (err) {
                    console.error('Failed to convert URL to PWA:', err);
                    alert('Failed to convert URL to PWA. Please try again.');
                });
        }
    } else {
        alert('Please fill in all fields.');
    }
}
