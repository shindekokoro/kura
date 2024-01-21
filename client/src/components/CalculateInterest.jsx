import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

export default function CalculateInterest({
  currentLoanBalance,
  interestRate,
  remainingTerms,
  termPeriods
}) {
  // If user selects years convert remaining terms to months
  const remainingPeriods =
    termPeriods === 'months' ? remainingTerms : remainingTerms * 12;

  // Calculate the monthly interest rate
  const monthlyInterestRate = interestRate / 100 / 12;
  //Calculate the monthly payment
  let monthlyPayment =
    currentLoanBalance *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -remainingPeriods)));
  // Calculate the total interest and total cost
  let totalInterest = monthlyPayment * remainingPeriods - currentLoanBalance;
  let totalCost = monthlyPayment * remainingPeriods;

  // Create an array to store the monthly payment information
  let terms = [];
  for (let i = 0; i < remainingPeriods; i++) {
    let monthlyInterest = currentLoanBalance * monthlyInterestRate;
    let monthlyPrincipal = monthlyPayment - monthlyInterest;
    currentLoanBalance -= monthlyPrincipal;
    terms.push({
      period: i + 1,
      monthlyPayment: monthlyPayment.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      monthlyInterest: monthlyInterest.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      monthlyPrincipal: monthlyPrincipal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      currentLoanBalance: currentLoanBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    });
  }
  // If the user enters an invalid value for the loan balance, interest rate, or remaining terms, set the values to 0
  if (!monthlyPayment || !totalInterest || !totalCost) {
    monthlyPayment = 0.0;
    totalInterest = 0.0;
    totalCost = 0.0;
  }
  return (
    <>
      <p>
        Monthly Payment:{' '}
        {monthlyPayment.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </p>
      <p>
        Total Interest:{' '}
        {totalInterest.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </p>
      <p>
        Total Cost:{' '}
        {totalCost.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </p>
      {remainingPeriods > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 500, maxWidth: 650 }}
        >
          <Table size="small" aria-label="monthly payment table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terms.map((term, index) => (
                <TableRow key={index}>
                  <TableCell>{term.period}</TableCell>
                  <TableCell>{term.monthlyPayment}</TableCell>
                  <TableCell>{term.monthlyInterest}</TableCell>
                  <TableCell>{term.monthlyPrincipal}</TableCell>
                  <TableCell>{term.currentLoanBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}
