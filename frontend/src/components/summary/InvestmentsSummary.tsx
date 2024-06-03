import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Close } from '@mui/icons-material';
import "./InvestmentsSummary.css";
import { InvestmentData, closeInvestment } from './investments-util';
import React from 'react';

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
      backgroundColor: '#222831'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      color: 'white',
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


interface InvestmentsTableProps {
    userInvestments: InvestmentData[];
    updateInvestments: (data: InvestmentData[]) => void;
}



const InvestmentsTable: React.FC<InvestmentsTableProps> = ({userInvestments, updateInvestments}) => {

    if (userInvestments === null) {
        return (<div>Something went wrong</div>)
    }

    return (
        <TableContainer style={{ maxHeight: "33vh" }}>
            <Table stickyHeader sx={{ minWidth: 'fit-content'}} aria-label="sticky table" >
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Asset Symbol</StyledTableCell>
                        <StyledTableCell align="right">Volume</StyledTableCell>
                        <StyledTableCell align="right">Open Price</StyledTableCell>
                        <StyledTableCell align="right">Market Price</StyledTableCell>
                        <StyledTableCell align="right">Gross Profit</StyledTableCell>
                        <StyledTableCell align="right">Gross Profit %</StyledTableCell>
                        <StyledTableCell align="right">Close</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody style={{overflowY: "auto"}}>
                {userInvestments.map((row, index) => (
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
                        <StyledTableCell align="right">{row.marketPrice}</StyledTableCell>
                        <StyledTableCell align="right" style={{color: grossProfitColor(row.grossProfit)}}>
                            {row.grossProfit}
                        </StyledTableCell>
                        <StyledTableCell align="right" style={{color: grossProfitColor(row.grossProfit)}}>
                            {row.grossProfitPercent}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <div className='close-investment' onClick={() => {
                                const fetch = async () => {
                                    await closeInvestment(row.id);
                                }
                                fetch();
                                const filteredUserInvestments = userInvestments.filter(item => item.id !== row.id);
                                updateInvestments(filteredUserInvestments);
                            }}>
                                <Close color='error' sx={{cursor: 'pointer'}}/>
                            </div>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InvestmentsTable;
