import InstrumentPane from "../components/InstrumentsPane";
import InvestmentPane from "../components/InvestmentsPane";
import NewsPane from "../components/NewsPane";
import "./Home.css";


function Home() {
    document.body.style.backgroundColor = "black";    
    return (
        <div className="home-page">
            <div className="vertical-panes">
                <InstrumentPane/>
                <NewsPane/>
            </div>
            <InvestmentPane/>
        </div>
    )
}

export default Home;