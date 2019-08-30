window.pages = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  chrome.storage.sync.get(["womenPageScore", "menPageScore", "homePageScore", "lifeStylePageScore", "beautyPageScore"], (totalScore)=>{
      let newTotal = 1
      console.log(request);
    // set total for viewed women products **************************************
    if(request.womenScore || (request.cartExtraScore === "womenCartScore")){
      if(request.cartExtraScore === "womenCartScore") newTotal += 2
      if(totalScore.womenPageScore) newTotal += parseInt(totalScore.womenPageScore)
      else newTotal = 1

      window.pages["womenPageScore"] = newTotal
      chrome.storage.sync.set({"womenPageScore": newTotal})
    }

    // set total for viewed men products **************************************
    if(request.menScore || (request.cartExtraScore === "menCartScore")){
      if(request.cartExtraScore === "menCartScore") newTotal += 2
      if(totalScore.menPageScore) newTotal += parseInt(totalScore.menPageScore)
      else newTotal = 1

      window.pages["menPageScore"] = newTotal
      chrome.storage.sync.set({"menPageScore": newTotal})
    }

    // set total for viewed home products **************************************
    if(request.homeScore || (request.cartExtraScore === "homeCartScore")){
      if(request.cartExtraScore === "homeCartScore") newTotal += 2
      if(totalScore.homePageScore) newTotal += parseInt(totalScore.homePageScore)
      else newTotal = 1

      window.pages["homePageScore"] = newTotal
      chrome.storage.sync.set({"homePageScore": newTotal})
    }

    // set total for viewed lifeStyle products **************************************
    if(request.lifeStyleScore || (request.cartExtraScore === "lifeStyleCartScore")){
      if(request.cartExtraScore === "lifeStyleCartScore") newTotal += 2
      if(totalScore.lifeStylePageScore) newTotal += parseInt(totalScore.lifeStylePageScore)
      else newTotal = 1

      window.pages["lifeStylePageScore"] = newTotal
      chrome.storage.sync.set({"lifeStylePageScore": newTotal})
    }

    // set total for viewed beauty products **************************************
    if(request.beautyScore || (request.cartExtraScore === "beautyProductCartScore")){
      if(request.cartExtraScore === "beautyProductCartScore") newTotal += 2
      if(totalScore.beautyPageScore) newTotal += parseInt(totalScore.beautyPageScore)
      else newTotal = 1

      window.pages["beautyPageScore"] = newTotal
      chrome.storage.sync.set({"beautyPageScore": newTotal})
    }
  })
})

chrome.storage.onChanged.addListener((changes, namespace)=>{
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

console.log(chrome.storage.sync);
chrome.runtime.onMessage.addListener((request, send, sendResponse)=>{
  console.log(request);
  if(request.resetBtnClicked === "resetClicked") {
    chrome.storage.sync.clear(()=>{
      window.pages = {
        "womenPageScore": 0,
        "menPageScore": 0,
        "homePageScore": 0,
        "lifeStyleCartScore": 0,
        "beautyPageScore": 0
      }
        console.log('from clear');
    })
  }
})
