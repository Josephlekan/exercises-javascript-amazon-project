export function formatCurrency (priceCents){
      return ((Math.round(priceCents) / 100 ).toLocaleString('en-US'));
}

