// Add dot to the price number => string
const addDot = (price) => {
  if (price && price.toString().length > 0) {
    const formattedPrice =
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
    return formattedPrice;
  }
  return "";
};

// Remove dot to the price string => number
const removeDot = (price) => {
  const unFormattedPrice = price.replace(",", "").replace("đ", "").trim();
  return parseInt(unFormattedPrice);
};

const vndToUsd = (vnd) => {
  const usd = vnd / 23465;
  return parseFloat(usd.toFixed(2));
};
const UsdToVnd = (usd) => {
  // const vnd = usd * 23465;
  const vnd = Math.floor((usd * 23465) / 1000) * 1000;
  return vnd;
};

export { addDot, removeDot, vndToUsd, UsdToVnd };
