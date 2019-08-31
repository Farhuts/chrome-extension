const url = window.location.href
const mainPage = (url.indexOf('https://www.urbanoutfitters.com/new-arrivals') > -1)

function traverseDom(searchStr) {
  let result = Array.prototype.slice.call(document.querySelectorAll('*')).filter((element) => {
      let match = element.outerHTML.match(searchStr)
      if (match === null) return false
      if (match === "undefined" || match === 0) return false;
      return true;
    })
    return result;
}

// Find product category
let category;
const categoryList = new RegExp('c-breadcrumb__ol u-clearfix', 'gi')
const result = traverseDom(categoryList)
const categoryElems = result.slice(-1)
if(categoryElems.length > 0) {
  const categlemsChildren = categoryElems[0].childNodes
  category = categlemsChildren[3].innerText
}

// Get the category of the product page that the user is viewing
const womenProduct = (category === "Women's ")
const menProduct = (category === "Men's ")
const homeProduct = (category === "Home ")
const lifeStyleProduct = (category === "Lifestyle ")
const beautyProduct = (category === "Beauty ")

// Send the category of the product page that the user is viewing to bg
chrome.runtime.sendMessage({
  womenScore: womenProduct,
  menScore: menProduct,
  homeScore: homeProduct,
  lifeStyleScore: lifeStyleProduct,
  beautyScore: beautyProduct
})

// If the user has added the item to the cart and send msg to bg
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
