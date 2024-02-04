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
  let currentLoanBalance = startingLoanBalance;
  let amortization = [];

  for (let i = 0; i < remainingPeriods; i++) {
    let previousLoanBalance = currentLoanBalance;
    console.log(period, updatedValue, updatedColumn, tableState);
    tableState
      ? console.log(tableState[i]['monthlyPayment'], i, monthlyPayment)
      : '';
    // If the period is the current period, use the updated value.
    // Otherwise, use the value from the tableState if it exists.
    let payment =
      period === i
        ? parseFloat(updatedValue)
        : tableState
          ? parseFloat(tableState[i]['monthlyPayment'])
          : monthlyPayment;
    let monthlyInterest = currentLoanBalance * monthlyInterestRate;
    if (payment > previousLoanBalance || monthlyPayment === 0) {
      payment = previousLoanBalance + monthlyInterest;
      remainingPeriods = i + 1;
    }
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

  return amortization;
};

export default amortizationGenerator;
