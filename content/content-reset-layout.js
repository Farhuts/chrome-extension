  // ******** Initialize Reset Layout Function ********

  function resetLayout() {
    chrome.storage.sync.get([
      "womenPageScore","menPageScore", "homePageScore", "lifeStylePageScore", "beautyPageScore"],
      (score)=> {
      const resetSectionArr = [womenSection, menSection, homeSection, lifeStyleSection, beautySection]

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

  // ******** Send resetLayout() to popup.js / notification to bg when reset btn clicked ********

  chrome.runtime.onMessage.addListener((request, send, sendResponse) => {
    console.log("request in connect =>", request);
    if(request === "resetClicked") {
      sendResponse({
        resetLayout: resetLayout()
      })

      chrome.runtime.sendMessage({
        resetBtnClicked: request
      })
    }
  })
