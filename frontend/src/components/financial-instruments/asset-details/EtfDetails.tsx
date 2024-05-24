import { useEffect, useState } from "react";
import getSymbolDetails from "../asset-util"
import { Close } from "@mui/icons-material";
import "./AssetDetails.css";

const url = "http://localhost:8080/api/v1/etf/"

const EtfDetails = ({symbol, closePopUpHandler}: {symbol: string, closePopUpHandler: () => void}) => {
    const [etf, setEtfDetails] = useState<any|null>(null);

    useEffect(() => {
        const fetch = async () => {
            const details = await getSymbolDetails(url, symbol);
            setEtfDetails(details);
        }
        fetch();
    }, []);

    if (etf === null) {
        return <div onClick={closePopUpHandler}>Siemano kapitanie</div>
    }
    console.log(etf);
    return (
        <div className="asset-details">
            <div className="close-icon-wrapper" onClick={closePopUpHandler}>
                <Close />
            </div>
            <div className="asset-details-title">
                {etf.yahooSymbol}
            </div>
            <p className="asset-details-description">{etf.description}</p>
            <p>isin: {etf.isin}</p>
            <p>Total assets: {etf.totalAssets}</p>
            <p>Instrument Type: {etf.instrumentTypeName}</p>

        </div>
    )
}

export default EtfDetails;
