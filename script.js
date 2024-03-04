// Prompt to install as PWA when visiting the web app
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            const installButton = document.createElement('button');
            installButton.textContent = 'Install PWA for PWA';
            installButton.addEventListener('click', () => {
                event.prompt();
                event.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the PWA installation');
                    } else {
                        console.log('User dismissed the PWA installation');
                    }
                });
            });
            document.body.appendChild(installButton);
        });
    }
});

function addPWA() {
    var name = document.getElementById("nameInput").value;
    var version = document.getElementById("versionInput").value;
    var url = document.getElementById("urlInput").value;

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
