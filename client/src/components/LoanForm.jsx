import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  MenuItem,
  Select
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { PaymentInfo, AmortizationTable } from '../components';
import { calculateInterest } from '../../utils';

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

    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        [name]: input
      };

      const updatedPaymentInfo = calculateInterest(updatedFormState);

      return {
        ...updatedFormState,
        ...updatedPaymentInfo
      };
    });
  };

  return (
    <Box sx={{ float: 'left', pr:1 }}>
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
          onInput={handleChange}
        />
        <FormHelperText id="current-loan-balance-text">
          Starting (current) Loan Balance
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '8ch' }}>
        <Input
          id="interest"
          name="interest"
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="percent sign"
          inputProps={{
            'aria-label': 'percent sign'
          }}
          value={formState.interest}
          onInput={handleChange}
        />
        <FormHelperText id="interest-rate-text">
          Interest
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '10ch' }}>
        <Select
          id="rate-select"
          name="rate"
          aria-describedby="rate"
          value={formState.rate}
          onChange={handleChange}
        >
          {rate.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id="remaining-periods-text">
          Select your Rate
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '10ch' }}>
        <Input
          id="remaining-terms"
          name="remainingPeriods"
          aria-describedby="terms"
          value={formState.remainingPeriods}
          onInput={handleChange}
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
      <PaymentInfo formState={formState} />
      <AmortizationTable formState={formState} setFormState={setFormState} />
    </Box>
  );
}

export default LoanForm;
