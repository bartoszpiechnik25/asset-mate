import { useEffect, useState } from "react"
import getSymbolDetails from "./asset-util";
import Asset from "./Asset";


const Assets = ({clickHandler}: {clickHandler: (asset: any) => void}) => {
    const [assets, setAssets] = useState<null|any>(null);
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
        <div className="instruments-content">
            {assets.map((asset: any, index: number) => 
                <Asset
                    key={index}
                    symbol={asset.yahooSymbol}
                    description={asset.description}
                    type={asset.instrumentTypeName}
                    idx={index}
                    clickHandler={clickHandler}
                />
            )}
        </div>
    )
}

export default Assets;