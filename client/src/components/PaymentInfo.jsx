import { Box, Typography } from '@mui/material';

export default function Payment({ paymentInfo }) {
  return (
    <Box>
      <Typography>
        Monthly Payment:{' '}
        {paymentInfo.monthlyPayment.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </Typography>
      <Typography>
        Total Interest:{' '}
        {paymentInfo.totalInterest.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </Typography>
      <Typography>
        Total Cost:{' '}
        {paymentInfo.totalCost.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </Typography>
    </Box>
  );
}
