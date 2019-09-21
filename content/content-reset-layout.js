  // ******** Initialize Reset Layout Function ********

  function resetLayout() {
    chrome.storage.sync.get([
      "womenPageScore","menPageScore", "homePageScore", "lifeStylePageScore", "beautyPageScore"],
      (score)=> {

        let resetSectionArr = [womenSection, menSection, homeSection, lifeStyleSection, beautySection]

        for(let i = 0; i < resetSectionArr.length; ++i) {
          space[i].style.display = 'none'

          const container = document.getElementById('u-skip-anchor')
          container.appendChild(resetSectionArr[i])

          document.body.appendChild(container)
        }
        footerContainer.appendChild(footer1)
        footerContainer.appendChild(footer2)

        document.body.appendChild(footerContainer)
      })
  }

  // ******** Send this function to popup.js and bg when Reset btn clicked ********

  chrome.runtime.onMessage.addListener((request, send, sendResponse) => {
    if(request === "resetClicked") {
      sendResponse({
        resetLayout: resetLayout()
      })
    }
  })

  chrome.runtime.onMessage.addListener((request) => {
    if(request === "resetClicked") {
      chrome.runtime.sendMessage({
        resetBtnClicked: request
      })
    }
  })
