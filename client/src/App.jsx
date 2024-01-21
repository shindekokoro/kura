import { useState } from 'react';
import { LoanForm } from './components';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function App() {
  const [loanCount, setLoanCount] = useState(1);
  console.log(loanCount);
  let forms = [];
  for (let i = 0; i < loanCount; i++) {
    forms.push(<LoanForm key={i} />);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Loan and Interest Calculators
            </Typography>
            <Button color="inherit" onClick={() => setLoanCount(loanCount + 1)}>
              Add Loan
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {forms}
    </>
  );
}

export default App;
