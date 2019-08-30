const url = window.location.href
const womenProduct = (url.indexOf('category=women') > -1)
const menProduct = (url.indexOf('category=mens') > -1)
const homeProduct = (url.indexOf('category=home') > -1)
const lifeStyleProduct = (url.indexOf('category=lifestyle') > -1)
const beautyProduct = (url.indexOf('category=beauty-products') > -1)

chrome.runtime.sendMessage({
  womenScore: womenProduct,
  menScore: menProduct,
  homeScore: homeProduct,
  lifeStyleScore: lifeStyleProduct,
  beautyScore: beautyProduct
})

const cartBtn = document.querySelector('.c-product-add-to-cart__text')
if(cartBtn) cartBtn.addEventListener('click', ()=>{
  let cartScore
  if(womenProduct) cartScore = "womenCartScore"
  if(menProduct) cartScore = "menCartScore"
  if(homeProduct) cartScore = "homeCartScore"
  if(lifeStyleProduct) cartScore = "lifeStyleCartScore"
  if(beautyProduct) cartScore = "beautyProductCartScore"

  chrome.runtime.sendMessage({
    cartExtraScore: cartScore
  })
})
