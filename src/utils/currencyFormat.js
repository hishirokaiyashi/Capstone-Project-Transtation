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

export { addDot, removeDot };
