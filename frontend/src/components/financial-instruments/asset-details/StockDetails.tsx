import { useEffect, useState } from "react";
import getSymbolDetails from "../asset-util";
import { DetailsProps } from "./AssetDetails";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DetailsItem from "./DetailsItem";
import PerformanceTable from "./PerformanceTable";
import { Close } from "@mui/icons-material";


const url = "http://localhost:8080/api/v1/stock/";
const performanceUrl = "http://localhost:8080/api/v1/symbols/performance/"

const StockDetails: React.FC<DetailsProps> = ({symbol, open, closeDialogHandler}) => {
    const [stock, setstockDetails] = useState<any|null>(null);
    const [stockPerformance, setstockPerformance] = useState<any|null>(null);

    useEffect(() => {
        const fetch = async () => {
            const details = await getSymbolDetails(url, symbol);
            setstockDetails(details);
            const performance = await getSymbolDetails(performanceUrl, symbol);
            setstockPerformance(performance);
        }
        fetch();
    }, []);

    if (stock === null || stockPerformance === null) {
        return <div></div>
    }
    return (
        <Dialog
            open={open}
            onClose={closeDialogHandler}
            PaperProps={{
                component: 'form',
                style: {backgroundColor: "#222831", color: "white"}
            }}
        >
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} id="stock-details-title-close-container">
                <DialogTitle style={{fontWeight: 700, fontSize: 22, alignItems: 'center'}}>
                    {stock.yahooSymbol}
                </DialogTitle>
                <div className="close-icon-wrapper" onClick={closeDialogHandler}>
                    <Close />
                </div>
            </div>
            <DialogContent>
                <DialogContentText style={{color: "white", fontSize: 15, fontWeight: 500}}>{stock.businessSummary}</DialogContentText>
                <br />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <DetailsItem title="Stock Name" content={stock.stockName}/>
                    <DetailsItem title="Sector Name" content={stock.sectorName}/>
                    <DetailsItem title="Industry Name" content={stock.industryName}/>
                    <DetailsItem title="Asset type" content={stock.instrumentTypeName}/>
                </div>
                <PerformanceTable performance={stockPerformance}/>
            </DialogContent>
        </Dialog>
    )
}

export default StockDetails;