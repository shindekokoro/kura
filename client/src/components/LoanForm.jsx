import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState } from 'react';
import { PaymentInfo } from '../components';
import calculateInterest from '../../utils/calculateInterest';

function LoanForm() {
  const [formState, setFormState] = useState({
    currentLoanBalance: '0',
    interest: 3.99,
    rate: 'APR',
    remainingPeriods: 0,
    termPeriods: 'months',
    periods: 0
  });

  const timePeriods = ['months', 'years'];
  const rate = ['APR', 'APY'];

  function numberWithCommas(x) {
    return x.replace(/,/g, '').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    let input = value;
    if (name === 'currentLoanBalance') {
      input = numberWithCommas(input);
    }
    
    setFormState({
      ...formState,
      ...paymentInfo,
      [name]: input
    });
  };
  let paymentInfo = calculateInterest(formState);
  console.log(paymentInfo);
  let terms = [];
  return (
    <Box sx={{ float: 'left' }}>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '20ch' }}>
        <Input
          id="current-loan-balance"
          name="currentLoanBalance"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          aria-describedby="dollar sign"
          inputProps={{
            'aria-label': 'dollar sign'
          }}
          value={formState.currentLoanBalance}
          onChange={handleChange}
        />
        <FormHelperText id="current-loan-balance-text">
          Starting (current) Loan Balance
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '15ch' }}>
        <Input
          id="interest-rate"
          name="interestRate"
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="percent sign"
          inputProps={{
            'aria-label': 'percent sign'
          }}
          value={formState.interest}
          onChange={handleChange}
        />
        <FormHelperText id="interest-rate-text">
          Interest Rate (APR)
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '10ch' }}>
        <Input
          id="remaining-terms"
          name="remainingPeriods"
          aria-describedby="terms"
          value={formState.remainingPeriods}
          onChange={handleChange}
        />
        <FormHelperText id="remaining-terms-text">
          Remaining Payments
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '10ch' }}>
        <Select
          id="term-period-select"
          name="termPeriods"
          aria-describedby="periods"
          value={formState.termPeriods}
          onChange={handleChange}
        >
          {timePeriods.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="remaining-periods-text">
          Select your term period
        </FormHelperText>
      </FormControl>
      <PaymentInfo
        paymentInfo={paymentInfo}
      />
      {formState.remainingPeriods > 0 ? (
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
    </Box>
  );
}

export default LoanForm;
