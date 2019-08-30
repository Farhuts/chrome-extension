// Get matches for all products
const divsCollection = Array.prototype.slice.call(document.querySelectorAll('*')).filter(function(element) {
    let match = element.outerHTML.match(/categoryProductTray/gi);
    if (match === null) return false
    if (match === void 0) return false
    return true;
  })

// Get footer info
const footerContainer = document.getElementsByTagName('footer')[0]
const footer2 = document.getElementsByClassName('c-site-footer')[0]
const footer1 = document.getElementsByClassName('dom-sticky-email-signup c-sticky-email-signup  js-sticky-email-signup-container')[0]

// Get product sections
let rowsDiv = divsCollection.slice(-5)
let womenSection = rowsDiv[0]
let menSection = rowsDiv[1]
let homeSection = rowsDiv[2]
let lifeStyleSection = rowsDiv[3]
let beautySection = rowsDiv[4]

// Get product scores and adjust the web page layout.
function initLayoutChange() {
  chrome.storage.sync.get([
    'womenPageScore','menPageScore', 'homePageScore','lifeStylePageScore', 'beautyPageScore'],
    (score)=> {
      let displayArr = []
      let storeInfo = [
        {section: 'women', pageSection: womenSection, sectionScore: score.womenPageScore || 0},
        {section: 'men', pageSection: menSection, sectionScore: score.menPageScore || 0},
        {section: 'home', pageSection: homeSection, sectionScore: score.homePageScore || 0},
        {section: 'lifeStyle', pageSection: lifeStyleSection, sectionScore: score.lifeStylePageScore || 0},
        {section: 'beauty', pageSection: beautySection, sectionScore: score.beautyPageScore || 0},
      ]

      console.log(storeInfo);
      storeInfo.sort((a, b) => { return b.sectionScore - a.sectionScore})

      storeInfo.forEach((elem)=> {
        displayArr.push(elem.pageSection)
      })

      // Get white spaces and disable them
      const space = document.getElementsByClassName('o-row s-20-pixel-margin-shim  ')

      for(let i = 0; i < displayArr.length; ++i) {
        space[i].style.display = 'none'
        const container = document.getElementById('u-skip-anchor')
        container.appendChild(displayArr[i])
        document.body.appendChild(container)
      }
      footerContainer.appendChild(footer1)
      footerContainer.appendChild(footer2)
      document.body.appendChild(footerContainer)

  })
}

// Call this function on page load
initLayoutChange()

// Send this function to popup.js onAdjust layout btn
chrome.runtime.onMessage.addListener((request, send, sendResponse) => {
  sendResponse({initLayoutChange: initLayoutChange()})
})
