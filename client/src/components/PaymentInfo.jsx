import { Box, Typography } from '@mui/material';

export default function Payment({ formState }) {
  if (
    !formState.monthlyPayment ||
    !formState.totalInterest ||
    !formState.totalCost
  )
    return null;

  let updated =
    formState.updatedTotalInterest.toFixed(2) !==
    formState.totalInterest.toFixed(2);
  return (
    <Box>
      <Box sx={{ float: 'left', pr: 8 }}>
        <Typography>
          Monthly Payment:{' '}
          {formState.monthlyPayment.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Typography>
        <Typography>
          Total Interest:{' '}
          {formState.totalInterest.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Typography>
        <Typography>
          Total Cost:{' '}
          {formState.totalCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Typography>
      </Box>
      {updated ? (
        <Box sx={{ float: 'left' }}>
          <Typography>Updated Terms: {formState.updatedPeriods}</Typography>
          <Typography>
            Updated Total Interest:{' '}
            {formState.updatedTotalInterest.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Typography>
          <Typography>
            Updated Total Cost:{' '}
            {formState.updatedTotalCost.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
