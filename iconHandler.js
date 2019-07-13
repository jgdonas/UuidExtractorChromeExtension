chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    setIcon(tab)
});

chrome.tabs.onCreated.addListener(function (tab) {
    setIcon(tab)
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, setIcon)
});

var allowedHosts = ["lavanguardia.com", "mundodeportivo.com", "rac1.cat"];

function setIcon(tab) {
    var currentUrl = tab.url;
    if (allowedHosts.filter(h => currentUrl.search(h) != -1).length > 0) {
        console.log("active icon set")
        chrome.browserAction.setIcon({ path: "icon.png" });

    } else {
        console.log("inactive icon set")
        chrome.browserAction.setIcon({ path: "icon-inactive.png" });

    }
}
