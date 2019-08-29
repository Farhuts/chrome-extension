document.addEventListener('DOMContentLoaded', ()=> {
  const bg = chrome.extension.getBackgroundPage()

  const womenTotal = document.getElementById('womenTotal')
  const menTotal = document.getElementById('menTotal')
  const homeTotal = document.getElementById('homeTotal')
  const lifeTotal = document.getElementById('lifeTotal')
  const beautyTotal = document.getElementById('beautyTotal')

  if(bg.pages.womenPageScore) womenTotal.innerHTML = `${bg.pages.womenPageScore}`
  if(bg.pages.menPageScore) menTotal.innerHTML = `${bg.pages.menPageScore}`
  if(bg.pages.homePageScore) homeTotal.innerHTML = `${bg.pages.homePageScore}`
  if(bg.pages.lifeStylePageScore) lifeTotal.innerHTML = `${bg.pages.lifeStylePageScore}`
  if(bg.pages.beautyPageScore) beautyTotal.innerHTML = `${bg.pages.beautyPageScore}`

}, false)
