import "./Asset.css";

interface AssetProps {
    symbol: string;
    type: string;
    description: string;
    idx: number;
}

const Asset: React.FC<AssetProps> = ({symbol, type, description, idx}) => {
    let className = "asset";
    if (idx % 2 !== 0) {
        className = "asset-even"
    }
    return (
        <div className={className}>
            <p className="asset-name">{symbol}</p>
            <p className="asset-description">{description}</p>
            <p className="asset-type">{type}</p>
            <div className="info-icon">info</div>
        </div>
    )
}

export default Asset;
