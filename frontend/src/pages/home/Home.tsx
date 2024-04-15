import Article from "../../components/article/Article";
import PaneWithTab from "../../components/PaneWithTab";
import SearchBar from "../../components/search-bar/SearchBar";
import InstrumentTypeMenu from "../../components/financial-instruments/InstrumentTypeMenu";
import "./Home.css";
import Asset from "../../components/financial-instruments/Asset";

function Home() {
    document.body.style.backgroundColor = "black";
    return (
        <div className="home-page">
            <div className="vertical-panes">
                <PaneWithTab
                    tabs= {
                        [
                            { tabText: 'Instruments', active: true }
                        ]
                    }
                    paneText="Instruments"
                    className="instrument-pane">
                    <InstrumentTypeMenu />
                    <SearchBar placeholder="Search eg. Nvidia" />
                    <Asset
                        symbol="NVDA"
                        type="Stock"
                        description="Nvidia is a leading company in the GPU market. Trending thanks to AI."
                        idx={0}
                    />
                    <Asset
                        symbol="XDWT.DE"
                        type="ETF"
                        description="MSCI World Information Technology"
                        idx={1}
                        />
                </PaneWithTab>

                <PaneWithTab
                    tabs={[
                        { tabText: 'News', active: true },
                        { tabText: 'History', active: false },
                    ]}
                    paneText="News"
                    className="news-pane"
                >
                    <SearchBar placeholder="Find articles eg. s&p performance" />
                    <Article
                        title="Inflation CPI is raising"
                        summary="Fed published the latest inflation"
                        hyperlink=""
                    />
                    <Article
                        title="Bitcoin may start to loose its reputation as a volatile asset"
                        summary="Here is why"
                        hyperlink=""
                    />
                    <Article
                        title="New investment opportunities in the market"
                        summary="Check out the latest IPOs"
                        hyperlink=""
                    />
                </PaneWithTab>
            </div>
                <PaneWithTab
                    tabs={[
                        { tabText: 'Your investments', active: true },
                        { tabText: 'History', active: false },
                    ]}
                    paneText="Portfolio"
                    className="investments-pane"
                />
        </div>
    )
}

export default Home;
