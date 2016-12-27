
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request === 'showPageAction') {
            chrome.pageAction.show(sender.tab.id);
        }
        if (request === 'pageLoad') {
            alert('pageLoad');
        }
        else {
            return true; // prevents the callback from being called too early on return
        }
    });

