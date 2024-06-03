import { useEffect, useState } from "react";
import getSymbolDetails from "../asset-util"
import { Close } from "@mui/icons-material";
import "./AssetDetails.css";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DetailsItem from "./DetailsItem";
import PerformanceTable from "./PerformanceTable";
import { DetailsProps } from "./AssetDetails";


const url = "http://localhost:8080/api/v1/etf/";
const performanceUrl = "http://localhost:8080/api/v1/symbols/performance/";


const EtfDetails: React.FC<DetailsProps> = ({symbol, open, closeDialogHandler}) => {
    const [etf, setEtfDetails] = useState<any|null>(null);
    const [etfPerformance, setEtfPerformance] = useState<any|null>(null);

    useEffect(() => {
        const fetch = async () => {
            const details = await getSymbolDetails(url, symbol);
            setEtfDetails(details);
            const performance = await getSymbolDetails(performanceUrl, symbol);
            setEtfPerformance(performance);
        }
        fetch();
    }, []);

    if (etf === null || etfPerformance === null) {
        return <div></div>
    }
    console.log(etfPerformance, etf)
    return (
        <Dialog
            open={open}
            onClose={closeDialogHandler}
            PaperProps={{
                component: 'form',
                style: {backgroundColor: "#222831", color: "white"}
            }}
        >
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} id="etf-details-title-close-container">
                <DialogTitle style={{fontWeight: 700, fontSize: 22, alignItems: 'center'}}>
                    {etf.yahooSymbol}
                </DialogTitle>
                <div className="close-icon-wrapper" onClick={closeDialogHandler}>
                    <Close />
                </div>
            </div>
            <DialogContent>
                <DialogContentText style={{color: "white"}}>{etf.description}</DialogContentText>
                <br />
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <DetailsItem title="ISIN" content={etf.isin}/>
                    <DetailsItem title="Total assets" content={etf.totalAssets}/>
                    <DetailsItem title="Asset type" content={etf.instrumentTypeName}/>
                </div>
                <PerformanceTable performance={etfPerformance}/>
                
            </DialogContent>
        </Dialog>
    );
}

export default EtfDetails;
