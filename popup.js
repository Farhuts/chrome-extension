document.addEventListener('DOMContentLoaded', ()=> {
  const bg = chrome.extension.getBackgroundPage()

  const womenTotal = document.getElementById('womenTotal')
  const menTotal = document.getElementById('menTotal')
  const homeTotal = document.getElementById('homeTotal')
  const lifeTotal = document.getElementById('lifeTotal')
  const beautyTotal = document.getElementById('beautyTotal')
  const resetBtn = document.getElementById('reset')
  const adjustBtn = document.getElementById('adjust')
  const arrTotal = [womenTotal, menTotal, homeTotal, lifeTotal, beautyTotal]

// Assign Scores
  if(bg.pages.womenPageScore) womenTotal.innerHTML = `${bg.pages.womenPageScore}`
  if(bg.pages.menPageScore) menTotal.innerHTML = `${bg.pages.menPageScore}`
  if(bg.pages.homePageScore) homeTotal.innerHTML = `${bg.pages.homePageScore}`
  if(bg.pages.lifeStylePageScore) lifeTotal.innerHTML = `${bg.pages.lifeStylePageScore}`
  if(bg.pages.beautyPageScore) beautyTotal.innerHTML = `${bg.pages.beautyPageScore}`

// Reset Scores and Layout Sections
  resetBtn.addEventListener('click', ()=>{
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'resetClicked')
    })

    function resetSections(response) {
      console.log(response);
      return response.resetLayout
    }
    arrTotal.map((elemTotal)=>{
      elemTotal.innerHTML = 0
      console.log(elemTotal);
    })
  })

  // Adjust Layout
    adjustBtn.addEventListener('click', ()=>{
      chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'adjustClicked', changeLayout)
      })
      function changeLayout(response){
        console.log(response);
        return response.initLayoutChange
      }
    })

}, false)
