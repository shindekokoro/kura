let compoundingPeriods = 4;
const aprToApy = (rate) => {
  let apr = rate / 100;
  return Math.pow(1 + apr / compoundingPeriods, compoundingPeriods) - 1;
};
const apyToApr = (rate) => {
  let apy = rate / 100;
  console.log(apy);
  return compoundingPeriods * (Math.pow(1 + apy, 1 / compoundingPeriods) - 1);
};

export default function calculateInterest(formState) {
  console.log(formState);
  let currentLoanBalance = formState.currentLoanBalance.replace(/,/g, '');
  let interest = formState.interest;
  let rate = formState.rate;
  let termPeriods = formState.termPeriods;
  // If user selects years convert remaining terms to months
  let remainingPeriods =
    termPeriods === 'months'
      ? formState.remainingPeriods
      : formState.remainingPeriods * 12;

  // If user selects APY convert interest rate to APR
  const interestRate = rate === 'APY' ? apyToApr(interest) : aprToApy(interest);

  // Calculate the monthly interest rate
  const monthlyInterestRate = interestRate / 12;
  //Calculate the monthly payment
  let monthlyPayment =
    currentLoanBalance *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -remainingPeriods)));

  // Calculate the total interest and total cost
  let totalInterest = monthlyPayment * remainingPeriods - currentLoanBalance;
  let totalCost = monthlyPayment * remainingPeriods;

  // If the user enters an invalid value for the loan balance, interest rate, or remaining terms, set the values to 0
  if (!monthlyPayment || !totalInterest || !totalCost) {
    monthlyPayment = 0.0;
    totalInterest = 0.0;
    totalCost = 0.0;
  }

  return {
    remainingTerms: remainingPeriods,
    monthlyPayment: monthlyPayment,
    monthlyInterestRate: monthlyInterestRate,
    totalInterest: totalInterest,
    totalCost: totalCost
  };
}
