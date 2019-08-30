window.pages = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  chrome.storage.sync.get(['womenPageScore', "menPageScore", "homePageScore", "lifeStylePageScore", "beautyPageScore"], (totalScore)=>{
      let newTotal = 1
      console.log(newTotal);

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

chrome.runtime.onMessage.addListener((request)=>{
  console.log(request);
  if(request.resetBtnClicked === "resetClicked") {
    chrome.storage.sync.clear(()=>{
        console.log('from clear');
    })
  }
})
