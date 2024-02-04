// Convert number string to number with commas.
const numberWithCommas = (x) => {
  // Ensure x is a string.
  let number = x.toString();
  return number.replace(/,/g, '').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export default numberWithCommas;
