import "./InstrumentTypeMenu.css";

interface InstrumentType {
    name: string;
}

const InstrumentTypeElement: React.FC<InstrumentType> = ({name}) => {
    return (
        <div className="instrument-type">
            {name}
        </div>
    )
}

const InvestmentTypeMenu: React.FC = () => {
    return (
        <div className="instrument-type-menu">
            <InstrumentTypeElement name="ETF"/>
            <InstrumentTypeElement name="Stock"/>
            <InstrumentTypeElement name="Crypto"/>
            <InstrumentTypeElement name="CFD"/>
        </div>
    )
}

export default InvestmentTypeMenu;
