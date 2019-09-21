  const url = window.location.href

  // ******** Traverse DOM Function********

  function traverseDom(searchStr) {
    let result = Array.prototype.slice.call(document.querySelectorAll('*')).filter((element) => {
        let match = element.outerHTML.match(searchStr)
        if (match === null || match === "undefined" || match === 0) return false
        return true;
      })
      return result;
  }

  // ******** Find Section / Product Category ********

  let category;
  const categoryList = new RegExp('c-breadcrumb__ol u-clearfix', 'gi')
  const result = traverseDom(categoryList)
  const categoryElems = result.slice(-1)
  if(categoryElems.length > 0) {
    const categlemsChildren = categoryElems[0].childNodes
    category = categlemsChildren[3].innerText
  }

  // ******** Get the Category of the Product Page that the User is Viewing ********

  const womenProduct = (category === "Women's ")
  const menProduct = (category === "Men's ")
  const homeProduct = (category === "Home ")
  const lifeStyleProduct = (category === "Lifestyle ")
  const beautyProduct = (category === "Beauty ")


  // ******** Send that Category to the bg ********

  chrome.runtime.sendMessage({
    womenScore: womenProduct,
    menScore: menProduct,
    homeScore: homeProduct,
    lifeStyleScore: lifeStyleProduct,
    beautyScore: beautyProduct
  })

  // ******** If the User has added the item to the Cart send msg to bg ********

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
