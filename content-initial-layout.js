// Initialize reset layout func
function resetLayout() {
  chrome.storage.sync.get([
    'womenPageScore','menPageScore', 'homePageScore','homePageScore', 'beautyPageScore'],
    (score)=> {
      chrome.storage.sync.set({"womenPageScore": 0})
      chrome.storage.sync.set({"menPageScore": 0})
      chrome.storage.sync.set({"homePageScore": 0})
      chrome.storage.sync.set({"homePageScore": 0})
      chrome.storage.sync.set({"beautyPageScore": 0})
    })
}

// Send this function to popup.js onReset btn and to bg page
chrome.runtime.onMessage.addListener((request, send, sendResponse) => {
    chrome.runtime.sendMessage({
      resetBtnClicked: request
    })
    sendResponse({
      resetLayout: resetLayout()
    })
})
