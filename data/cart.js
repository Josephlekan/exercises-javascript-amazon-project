export const cart = [{
 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
 productQtyValue: 2
   
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  productQtyValue: 2
}];

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