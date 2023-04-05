function registerServiceWorker() {
    navigator.serviceWorker.register("background.js");
  }
  
  if (navigator.serviceWorker) {
    registerServiceWorker();
  } else {
    window.addEventListener("load", registerServiceWorker);
  }
  
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var url = details.url;
      if (url.includes("messenger.com")) {
        var today = new Date().toLocaleDateString();
        var lastAccessed = localStorage.getItem(url);
        if (lastAccessed === today) {
          return { cancel: true };
        } else {
          localStorage.setItem(url, today);
          return { cancel: false };
        }
      } else {
        return { cancel: false };
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking"]
  );
  