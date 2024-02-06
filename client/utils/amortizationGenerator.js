const amortizationGenerator = (
  startingLoanBalance,
  remainingPeriods,
  monthlyPayment,
  monthlyInterestRate,

  period,
  updatedValue,
  updatedColumn,
  tableState
) => {
  let currentLoanBalance = parseFloat(startingLoanBalance.replace(/,/g, ''));
  let amortization = [];
  let oldAmortization = tableState ? tableState.terms : undefined;
  let updatedTotalInterest = 0;
  let updatedTotalCost = 0;

  for (let i = 0; i < remainingPeriods; i++) {
    let previousLoanBalance = currentLoanBalance;
    // If the period is the current period, use the updated value.
    // Otherwise, use the value from the tableState if it exists.
    let payment =
      period === i
        ? updatedValue
        : oldAmortization
          ? parseFloat(oldAmortization[i]['monthlyPayment'])
          : monthlyPayment;

    let monthlyInterest = currentLoanBalance * monthlyInterestRate;
    updatedTotalInterest += monthlyInterest;

    if (payment > previousLoanBalance || monthlyPayment === 0) {
      payment = previousLoanBalance + monthlyInterest;
      remainingPeriods = i + 1;
    }
    updatedTotalCost += payment;

    let monthlyPrincipal = payment - monthlyInterest;
    currentLoanBalance =
      remainingPeriods === 0 ? 0 : previousLoanBalance - monthlyPrincipal;
    amortization.push({
      period: i + 1,
      monthlyPayment: payment,
      monthlyInterest: monthlyInterest,
      monthlyPrincipal: monthlyPrincipal,
      currentLoanBalance: currentLoanBalance
    });
  }

  return {
    terms: amortization,
    updatedTotalCost,
    updatedTotalInterest,
    updatedPeriods: remainingPeriods
  };
};

export default amortizationGenerator;
