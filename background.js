window.pages = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  if(request.womenScore || (request.cartExtraScore === "womenCartScore")) {
    chrome.storage.sync.get('womenPageScore', (totalScore)=>{
        let newTotal = 1
        if(request.cartExtraScore === "womenCartScore") newTotal += 2
        if(totalScore.womenPageScore) newTotal += parseInt(totalScore.womenPageScore)
        else newTotal = 1

        window.pages["womenPageScore"] = newTotal
        chrome.storage.sync.set({"womenPageScore": newTotal})
    })
  }

  if(request.menScore || (request.cartExtraScore === "menCartScore")){
    chrome.storage.sync.get("menPageScore", (totalScore)=>{
        let newTotal = 1
        if(request.cartExtraScore === "menCartScore") newTotal += 2
        if(totalScore.menPageScore) newTotal += parseInt(totalScore.menPageScore)
        else newTotal = 1

        window.pages["menPageScore"] = newTotal
        chrome.storage.sync.set({"menPageScore": newTotal})
    })
  }

  if(request.homeScore || (request.cartExtraScore === "homeCartScore")){
    chrome.storage.sync.get("homePageScore", (totalScore)=>{
        let newTotal = 1
        if(request.cartExtraScore === "homeCartScore") newTotal += 2
        if(totalScore.homePageScore) newTotal += parseInt(totalScore.homePageScore)
        else newTotal = 1

        window.pages["homePageScore"] = newTotal
        chrome.storage.sync.set({"homePageScore": newTotal})
    })
  }

  if(request.lifeStyleScore || (request.cartExtraScore === "lifeStyleCartScore")){
    chrome.storage.sync.get("lifeStylePageScore", (totalScore)=>{
        let newTotal = 1
        if(request.cartExtraScore === "lifeStyleCartScore") newTotal += 2
        if(totalScore.lifeStylePageScore) newTotal += parseInt(totalScore.lifeStylePageScore)
        else newTotal = 1

        console.log(window.pages, newTotal);
        window.pages["lifeStylePageScore"] = newTotal
        chrome.storage.sync.set({"lifeStylePageScore": newTotal})
    })
  }

  if(request.beautyScore || (request.cartExtraScore === "beautyProductCartScore")){
    chrome.storage.sync.get("beautyPageScore", (totalScore)=>{
        let newTotal = 1
        if(request.cartExtraScore === "beautyProductCartScore") newTotal += 2
        if(totalScore.beautyPageScore) newTotal += parseInt(totalScore.beautyPageScore)
        else newTotal = 1

        window.pages["beautyPageScore"] = newTotal
        chrome.storage.sync.set({"beautyPageScore": newTotal})
    })
  }
})

 // set up a listener
// const port = chrome.extension.connect({
//    name: “nameOfChannel”
// });
//
// // send events
// port.postMessage({
//     key1: 'value1',
//     key2: 'value2'
// });
//
// // listen for events
// port.onMessage.addListener((msg) => {
// });
//
// // Accessing the current active tab
// chrome.tabs.query({ active: true, currentWindow: true },(tabs) => {
//     var currentTab = tabs[0];
// });
