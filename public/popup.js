document.addEventListener('DOMContentLoaded', ()=> {

// ******** Set Up Port / Connection from Bg ********

  const port = chrome.extension.connect({
     name: "Unicorns Are Real"
   });

// ******** Find HTMl elements ********

  const womenTotal = document.getElementById('womenTotal')
  const menTotal = document.getElementById('menTotal')
  const homeTotal = document.getElementById('homeTotal')
  const lifeTotal = document.getElementById('lifeTotal')
  const beautyTotal = document.getElementById('beautyTotal')
  const resetBtn = document.getElementById('reset')
  const adjustBtn = document.getElementById('adjust')
  const arrTotal = [womenTotal, menTotal, homeTotal, lifeTotal, beautyTotal]

// ******** Assign Scores  ********

  port.onMessage.addListener((msg) => {
    if(msg.womenPageScore) womenTotal.innerHTML = `${msg.womenPageScore}`
    if(msg.menPageScore) menTotal.innerHTML = `${msg.menPageScore}`
    if(msg.homePageScore) homeTotal.innerHTML = `${msg.homePageScore}`
    if(msg.lifeStylePageScore) lifeTotal.innerHTML = `${msg.lifeStylePageScore}`
    if(msg.beautyPageScore) beautyTotal.innerHTML = `${msg.beautyPageScore}`
  });

// ******** Reset Scores and Layout Sections after Reset Btn is clicked ********

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
    })
  })

// ******** Adjust Layout after Adjust btn is clicked ********

    adjustBtn.addEventListener('click', ()=>{
      chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'adjustClicked', changeLayout)
      })
      function changeLayout(response){
        return response.initLayoutChange
      }
    })

}, false)
