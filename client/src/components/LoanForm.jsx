import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import { useState } from 'react';
import { CalculateInterest } from '../components';

function LoanForm() {
  const [formState, setFormState] = useState({
    currentLoanBalance: '0',
    interestRate: 3.99,
    remainingTerms: 0,
    termPeriods: 'months'
  });

  const timePeriods = ['months', 'years'];

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
      [name]: input
    });
  };

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
          value={formState.interestRate}
          onChange={handleChange}
        />
        <FormHelperText id="interest-rate-text">
          Interest Rate (APR)
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '10ch' }}>
        <Input
          id="remaining-terms"
          name="remainingTerms"
          aria-describedby="terms"
          value={formState.remainingTerms}
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
      <CalculateInterest
        currentLoanBalance={formState.currentLoanBalance.replace(/,/g, '')}
        interestRate={formState.interestRate}
        remainingTerms={formState.remainingTerms}
        termPeriods={formState.termPeriods}
      />
    </Box>
  );
}

export default LoanForm;
