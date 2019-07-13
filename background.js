chrome.browserAction.onClicked.addListener(notifyUuidExtractor);

function notifyUuidExtractor(tab) {
    msg = { txtt: "execute" };
    chrome.tabs.sendMessage(tab.id, msg);
}





