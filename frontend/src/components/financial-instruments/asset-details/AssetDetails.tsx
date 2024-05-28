import EtfDetails from "./EtfDetails"
import StockDetails from "./StockDetails"


interface AssetDetailsProps {
    asset: any
    open: boolean
    closePopUpHandler: () => void
}

interface DetailsProps {
    symbol: string,
    open: boolean,
    closeDialogHandler: () => void
}

const AssetDetails: React.FC<AssetDetailsProps> = ({asset, closePopUpHandler, open}) => {
    if (asset === null || asset.type === null) {
        return <div></div>
    }
    switch (asset.type) {
        case "ETF": {
            return <EtfDetails symbol={asset.symbol} open={open} closeDialogHandler={closePopUpHandler}/>
        }
        case "Stock": {
            return <StockDetails symbol={asset.symbol} open={open} closeDialogHandler={closePopUpHandler}/>
        }
        default: {
            return <div>Error</div>
        }
    }
}

export default AssetDetails;
export type {DetailsProps};