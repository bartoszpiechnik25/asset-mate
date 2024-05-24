import EtfDetails from "./EtfDetails"


interface AssetDetailsProps {
    asset: any
    closePopUpHandler: () => void
}

const AssetDetails: React.FC<AssetDetailsProps> = ({asset, closePopUpHandler}) => {
    switch (asset.type) {
        case "ETF": {
            return <EtfDetails symbol={asset.symbol} closePopUpHandler={closePopUpHandler}/>
        }
        default: {
            return <div>Error</div>
        }
    }
}

export default AssetDetails;