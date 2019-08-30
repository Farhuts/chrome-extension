document.addEventListener('DOMContentLoaded', ()=> {
  const bg = chrome.extension.getBackgroundPage()


  const womenTotal = document.getElementById('womenTotal')
  const menTotal = document.getElementById('menTotal')
  const homeTotal = document.getElementById('homeTotal')
  const lifeTotal = document.getElementById('lifeTotal')
  const beautyTotal = document.getElementById('beautyTotal')
  const resetBtn = document.querySelector('button')
  const arrTotal = [womenTotal, menTotal, homeTotal, lifeTotal, beautyTotal]

// Assign Acores
  if(bg.pages.womenPageScore) womenTotal.innerHTML = `${bg.pages.womenPageScore}`
  if(bg.pages.menPageScore) menTotal.innerHTML = `${bg.pages.menPageScore}`
  if(bg.pages.homePageScore) homeTotal.innerHTML = `${bg.pages.homePageScore}`
  if(bg.pages.lifeStylePageScore) lifeTotal.innerHTML = `${bg.pages.lifeStylePageScore}`
  if(bg.pages.beautyPageScore) beautyTotal.innerHTML = `${bg.pages.beautyPageScore}`

  // chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, `${bg.pages.womenPageScore}`)
  // })

// Reset Scores
  resetBtn.addEventListener('click', ()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'resetClicked')
    })
    arrTotal.map((elemTotal)=>{
      elemTotal.innerHTML = 0
    })
  })

}, false)
