import {
  FormControl,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { amortizationGenerator, numberWithCommas } from '../../utils';

export default function AmortizationTable({ formState, setFormState }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    let period = name.split('-')[1];
    let column = name.split('-')[0];
    let input = value;
    console.log(period, input);

    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        terms: prevFormState.terms.map((term, index) => {
          return index === parseInt(period)
            ? {
              ...term,
              ['monthlyPayment']: input
            }
            : term;
        })
      };

      return {
        ...updatedFormState,
        ...amortizationGenerator(
          updatedFormState.currentLoanBalance,
          updatedFormState.terms.length,
          updatedFormState.monthlyPayment,
          updatedFormState.monthlyInterestRate,
          period,
          input,
          column,
          updatedFormState
        )
      };
    });
  };

  console.log('formState ', formState);
  if (!formState.terms || formState.terms.length < 1) return <> </>;

  const CellInput = ({ id, name, value, width, disabled = false }) => {
    return (
      <TableCell>
        <FormControl variant="standard" sx={{ width }}>
          <Input
            id={id}
            name={name}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            aria-describedby="dollar sign"
            inputProps={{
              'aria-label': 'dollar sign',
              style: { textAlign: 'right' }
            }}
            value={value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            onChange={handleChange}
            disabled={disabled}
          />
        </FormControl>
      </TableCell>
    );
  };

  const Cell = ({ id, name, value, width, disabled = false }) => {
    return <TableCell align="right">{value}</TableCell>;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 550, minWidth: 650, maxWidth: 650, gap: 3 }}
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
          {formState.terms.map((term, index) => (
            <TableRow key={index}>
              {/* <TableCell>
                <FormControl variant="standard" sx={{ width: '5ch' }}> */}
              <Cell
                id={`period-${index}`}
                name={`period-${index}`}
                value={term.period}
                inputProps={{
                  style: { textAlign: 'right' }
                }}
                onChange={handleChange}
                disabled
              />
              {/* </FormControl>
              </TableCell> */}
              <CellInput
                id={`monthly-payment-${index}`}
                name={`monthlyPayment-${index}`}
                value={numberWithCommas(term.monthlyPayment)}
                width={'15ch'}
              />
              <Cell
                id={`monthly-interest-${index}`}
                name={`monthlyInterest-${index}`}
                value={term.monthlyInterest.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency'
                })}
                width={'8ch'}
                disabled={true}
              />
              <Cell
                id={`monthly-principal-${index}`}
                name={`monthlyPrincipal-${index}`}
                value={term.monthlyPrincipal.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency'
                })}
                width={'15ch'}
                disabled={true}
              />
              <Cell
                id={`current-loan-balance-${index}`}
                name={`currentLoanBalance-${index}`}
                value={term.currentLoanBalance.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency'
                })}
                width={'15ch'}
                disabled={true}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
