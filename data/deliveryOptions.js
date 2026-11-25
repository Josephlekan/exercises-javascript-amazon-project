export const deliveryOption = [{
    id: '1',
    deliveryDays: 7,
    priceCent: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCent: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCent: 999
}];

export function getDeliveryId(deliveryOptionId){
        let deliveryOptions;
        deliveryOption.forEach((delivery) =>{
            if(delivery.id === deliveryOptionId){
            deliveryOptions = delivery;
            }
        });
           return deliveryOptions || deliveryOption[0];
    }