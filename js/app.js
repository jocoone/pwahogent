let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  document.getElementById('pwa-install').style = 'display: block;';
  deferredPrompt = e;
});

window.addEventListener('load', (e) => {
  document.getElementById('pwa-install').addEventListener('click', (event) => {
    event.preventDefault();
    deferredPrompt.prompt();
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
