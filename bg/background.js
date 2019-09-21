  // ******** Set Local Storage Class********

  class Section {
    constructor(sectionScore, extraScore) {
      this.sectionScore = sectionScore,
      this.extraScore = extraScore || null
    }
    listen(msg) {
      chrome.extension.onConnect.addListener((port) =>{
          port.postMessage(msg);
      })
    }
    setStorage(pageScore) {
      chrome.storage.sync.get(pageScore, (totalScore) => {
        let newTotal = 1

        if(this.extraScore) newTotal += 2
        if(totalScore[`${pageScore}`]) newTotal += parseInt(totalScore[`${pageScore}`])
        else newTotal = 1

        let expr = `${pageScore}`
        switch (expr) {
          case "menPageScore":
            chrome.storage.sync.set({"menPageScore": newTotal})
            this.listen({"menPageScore": newTotal})
            break;
          case "homePageScore":
            chrome.storage.sync.set({"homePageScore": newTotal})
            this.listen({"homePageScore": newTotal})
            break;
          case "lifeStylePageScore":
            chrome.storage.sync.set({"lifeStylePageScore": newTotal})
            this.listen({"lifeStylePageScore": newTotal})
            break;
          case "beautyPageScore":
            chrome.storage.sync.set({"beautyPageScore": newTotal})
            this.listen({"beautyPageScore": newTotal})
            break;
          default:
            chrome.storage.sync.set({"womenPageScore": newTotal})
            this.listen({"womenPageScore": newTotal})
        }
      })
    }
  }

  // ******** Listen for the events from content file and initiate setStorage ********

  chrome.runtime.onMessage.addListener((request)=>{
    let cartName;
    console.log(request);
    if(request.cartExtraScore === "womenCartScore") cartName = 'womenCartScore'
    if(request.cartExtraScore === "menCartScore") cartName = 'menCartScore'
    if(request.cartExtraScore === "homeCartScore") cartName = 'homeCartScore'
    if(request.cartExtraScore === "lifeStyleCartScore") cartName = 'lifeStyleCartScore'
    if(request.cartExtraScore === "beautyProductCartScore") cartName = 'beautyProductCartScore'

    if(request.womenScore || cartName === "womenCartScore") {
      const womenScore = new Section(request.womenScore, cartName)
      womenScore.setStorage("womenPageScore")
    }

    if(request.menScore || cartName === "menCartScore") {
      const menScore = new Section(request.menScore, cartName)
      menScore.setStorage("menPageScore")
    }

    if(request.homeScore || cartName === "homeCartScore") {
      const homeScore = new Section(request.homeScore, cartName)
      homeScore.setStorage("homePageScore")
    }

    if(request.lifeStyleScore || cartName === "lifeStyleCartScore") {
      const lifeStyleScore = new Section(request.lifeStyleScore, cartName)
      lifeStyleScore.setStorage("lifeStylePageScore")
    }

    if(request.beautyPageScore || cartName === "beautyProductCartScore") {
      const beautyPageScore = new Section(request.beautyPageScore, cartName)
      beautyPageScore.setStorage("beautyPageScore")
    }
  })


  // ******** Reset Scores ********

  chrome.runtime.onMessage.addListener((request) =>{
    function sendResetScore(msg) {
      chrome.extension.onConnect.addListener((port) =>{
          port.postMessage(msg);
      })
    }
    if(request.resetBtnClicked === "resetClicked") {
      chrome.storage.sync.clear(()=>{
        sendResetScore(
          {
            reset: {
              "womenPageScore": 0,
              "menPageScore": 0,
              "homePageScore": 0,
              "lifeStylePageScore": 0,
              "beautyPageScore": 0
            }
          })
      })
    }
  })
