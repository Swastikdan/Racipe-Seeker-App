// function isOnline() {
//   return navigator.onLine;
// }
// function redirectToOfflinePage() {
//   window.location.href = '/offline.html';
// }
// if (!isOnline()) {
//   redirectToOfflinePage();
// }

// window.addEventListener('online', () => {
//   window.location.href = '/';
// });

function isOnline() {
  return navigator.onLine;
}

function redirectToOfflinePage() {
  window.location.href = '/offline.html';
}

function checkOnlineStatus() {
  if (!isOnline()) {
    redirectToOfflinePage();
  }
}

checkOnlineStatus();

window.addEventListener('online', () => {
  window.location.href = '/';
});
setInterval(checkOnlineStatus, 5000);
