import { useEffect, useState } from "react"
import getSymbolDetails from "./asset-util";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Info } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({}) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#979797',
        border: "none",
        fontSize: 16,
        backgroundColor: '#222831'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        border: 'none',
        color: 'white',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#393E46",
        border: "none",
        color: theme.palette.common.white,
    },
}));

type Asset = {
    yahooSymbol: string,
    instrumentTypeName: string,
    description: string,
}

interface AssetsProps {
    assets: Asset[];
    clickHandler: (asset: any) => void;
    setAssets: (assets: Asset[]) => void;
}

const Assets: React.FC<AssetsProps> = ({clickHandler, assets, setAssets}) => {
    const [loading, setLoadingStatus] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const url = "http://localhost:8080/api/v1/symbols";
            const result = await getSymbolDetails(url, "");
            setAssets(result);
            setLoadingStatus(false);
        }
        fetch();
    }, []);

    if (assets === null && loading === true) {
        return <div>Loading...</div>
    }
    if (assets === null && loading === false) {
        return <div>Something went wrong :((</div>
    }

    return (
        <TableContainer style={{ maxHeight: "35vh" }}>
            <Table stickyHeader sx={{ minWidth: 'fit-content', backgroundColor:  '#222831'}}>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Symbol</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Info</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody style={{overflowY: "auto"}}>
                    {assets.map((asset: any, index: number) => (
                        <StyledTableRow
                            key={asset.yahooSymbol + index}>
                            <StyledTableCell style={{fontWeight: 700, fontSize: 15}}>{asset.yahooSymbol}</StyledTableCell>
                            <StyledTableCell>{asset.description}</StyledTableCell>
                            <StyledTableCell style={{fontSize: 15}}>{asset.instrumentTypeName}</StyledTableCell>
                            <StyledTableCell>
                                <div onClick={() => {
                                    const assetDetails = {
                                        symbol: asset.yahooSymbol,
                                        type: asset.instrumentTypeName
                                    }
                                    clickHandler(assetDetails);
                                }}>
                                    <Info sx={{cursor: 'pointer'}}/>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Assets;
export type {Asset};