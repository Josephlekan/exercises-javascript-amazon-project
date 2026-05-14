export const cart = [];

export function addToCart(productId){
      const productQty = document.querySelector(`.productQty-${productId}`).value;

            const productQtyValue = Number(productQty);

            let matchingItem;

            cart.forEach((item) => {
              if (productId === item.productId){
                matchingItem = item;
              }
            });

            if (matchingItem){
              matchingItem.productQtyValue += productQtyValue;
            } else {
              cart.push({
              productId,
            productQtyValue
            });
            
          }
  }