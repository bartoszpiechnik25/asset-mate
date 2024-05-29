import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InvestmentHistoryData } from './history-util';

const grossProfitColor = (value: number) => {
    if (value > 0) {
        return 'green';
    } else if (value < 0) {
        return 'red';
    } else {
        return 'white';
    }
}

const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: '#979797',
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      color: 'white',
      borderColor: '#979797'
    },
  }));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.white,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        borderColor: "#979797"
    },
  }));

const InvestmentsHistory = ({userInvestmentsHistory}: {userInvestmentsHistory: InvestmentHistoryData[]|null}) => {

    if (userInvestmentsHistory === null) {
        return (<div></div>)
    }

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 'fit-content', backgroundColor:  '#222831', color: 'green'}} aria-label="simple table" >
            <TableHead>
            <StyledTableRow>
                <StyledTableCell>Asset Symbol</StyledTableCell>
                <StyledTableCell align="right">Volume</StyledTableCell>
                <StyledTableCell align="right">Open Price</StyledTableCell>
                <StyledTableCell align="right">Market Price</StyledTableCell>
                <StyledTableCell align="right">Profit</StyledTableCell>
                <StyledTableCell align="right">Profit %</StyledTableCell>

            </StyledTableRow>
            </TableHead>
            <TableBody>
            {userInvestmentsHistory.map((row, index) => (
                <StyledTableRow
                    key={row.symbol + index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{outline: 'none'}}
                >
                    <StyledTableCell component="th" scope="row" sx={{fontWeight: 600}}>
                        {row.symbol}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.volume}</StyledTableCell>
                    <StyledTableCell align="right">{row.openPrice}</StyledTableCell>
                    <StyledTableCell align="right">{row.closePrice}</StyledTableCell>
                    <StyledTableCell align="right" style={{color: grossProfitColor(row.profit)}}>
                        {row.profit}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{color: grossProfitColor(row.profit)}}>
                        {row.profitPercent}
                    </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default InvestmentsHistory;
