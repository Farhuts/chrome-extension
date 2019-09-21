  // ******** Get matches for all the Sections/Products ********

  const layoutList = new RegExp('categoryProductTray', 'gi')
  const divsCollection = traverseDom(layoutList)

  // ******** Get Footer ********

  const footerContainer = document.getElementsByTagName('footer')[0]
  const footer2 = document.getElementsByClassName('c-site-footer')[0]
  const footer1 = document.getElementsByClassName('dom-sticky-email-signup c-sticky-email-signup  js-sticky-email-signup-container')[0]

  // ******** Get White Spaces and Disable them ********

  const space = document.getElementsByClassName('o-row s-20-pixel-margin-shim  ')

  // ******** Get Sections / Product Category ********

  const rowsDiv = divsCollection.slice(-5)
  const womenSection = rowsDiv[0]
  const menSection = rowsDiv[1]
  const homeSection = rowsDiv[2]
  const lifeStyleSection = rowsDiv[3]
  const beautySection = rowsDiv[4]

  // ******** Get Section / Product Category Scores and Adjust the Web Page Layout Accordingly ********

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

          storeInfo.sort((a, b) => { return b.sectionScore - a.sectionScore})
          storeInfo.forEach((elem)=> {
            displayArr.push(elem.pageSection)
          })

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

  // ******** Call this function on page load ********
  initLayoutChange()

  // ******** Send this function to popup.js when adjust layout btn is clicked ********
  
  chrome.runtime.onMessage.addListener((request, send, sendResponse) => {
    if(mainPage && request === 'adjustClicked') {
      sendResponse({
        initLayoutChange: initLayoutChange()
      })
    }
  })
