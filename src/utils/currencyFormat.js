// Add dot to the price number => string
const addDot = (price) => {
  const formattedPrice =
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
  return formattedPrice;
};

// Remove dot to the price string => number
const removeDot = (price) => {
  const unFormattedPrice = price.replace(",", "").replace("đ", "").trim();
  return parseInt(unFormattedPrice);
};

const vndToUsd = (vnd) => {
  const usd = vnd / 23465;
  return usd.toFixed(2);
};

export { addDot, removeDot, vndToUsd };
