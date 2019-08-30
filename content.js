const url = window.location.href

// get the category of the product page that the user is viewing
const womenProduct = (url.indexOf('category=women') > -1)
const menProduct = (url.indexOf('category=mens') > -1 || url.indexOf('category=latest-mens') > -1)
const homeProduct = (url.indexOf('category=home') > -1)
const lifeStyleProduct = (url.indexOf('category=lifestyle') > -1)
const beautyProduct = (url.indexOf('category=beauty-products') > -1)

// Send the category of the product page that the user is viewing to bg
chrome.runtime.sendMessage({
  womenScore: womenProduct,
  menScore: menProduct,
  homeScore: homeProduct,
  lifeStyleScore: lifeStyleProduct,
  beautyScore: beautyProduct
})

// if the user has added the item to the cart and send msg to bg
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
