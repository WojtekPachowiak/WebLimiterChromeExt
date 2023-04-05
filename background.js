chrome.scripting.registerServiceWorker({
    url: "background.js",
    interceptRequest: true
  });
  
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
  