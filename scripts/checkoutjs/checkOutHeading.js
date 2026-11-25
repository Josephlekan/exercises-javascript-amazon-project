export function renderCheckOutHeading(){
    const checkOutHead = `
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-cartQty"
            href="index.html"></a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
    `
    document.querySelector('.js-head-content').innerHTML = checkOutHead;
}