import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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


const PerformanceTable = ({performance}: {performance: any}) => {
    if (performance === null) {
        return <div></div>
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 'fit-content', backgroundColor:  '#222831' }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>1M</StyledTableCell>
                        <StyledTableCell>3M</StyledTableCell>
                        <StyledTableCell>6M</StyledTableCell>
                        <StyledTableCell>1Y</StyledTableCell>
                        <StyledTableCell>YTD</StyledTableCell>
                        <StyledTableCell>3Y</StyledTableCell>
                        <StyledTableCell>Max</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyledTableCell style={{fontSize: 10}}>Change in (%)</StyledTableCell>
                        <StyledTableCell>{performance.oneMonth}</StyledTableCell>
                        <StyledTableCell>{performance.threeMonths}</StyledTableCell>
                        <StyledTableCell>{performance.sixMonths}</StyledTableCell>
                        <StyledTableCell>{performance.oneYear}</StyledTableCell>
                        <StyledTableCell>{performance.ytd}</StyledTableCell>
                        <StyledTableCell>{performance.threeYears}</StyledTableCell>
                        <StyledTableCell>{performance.max}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PerformanceTable;