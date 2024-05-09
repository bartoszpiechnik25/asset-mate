import PaneWithTab from "../../components/PaneWithTab";
import SearchBar from "../../components/search-bar/SearchBar";
import InstrumentTypeMenu from "../../components/financial-instruments/InstrumentTypeMenu";
import "./Home.css";
import Asset, { AssetColumns } from "../../components/financial-instruments/Asset";
import SummaryFooter from "../../components/summary-footer/SummaryFooter";
import MenuButtons from "../../components/menu-bar/MenuBar";
import { useNavigate } from "react-router-dom";
import { isValid, setUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { Articles, getArticles, ArticleProps } from "../../components/article/Article";
import ArticleDetails from "../../components/article/ArticleDetails"


const Home = () => {
    document.body.style.backgroundColor = "black";
    const navigate = useNavigate();

    let user = setUser();

    if (user === null || !isValid(user)) {
        navigate('/login');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        user = null;
        navigate('/login');
    }

    const [showPopup, setShowPopup] = useState(false);
    const [articleDetails, setArticleDetails] = useState(null);

    const handleArticleClick = (article: any) => {
        setArticleDetails(article);
        setShowPopup(true);
    };

    const closePopup = () => {
        console.log("close clicked");
        setShowPopup(false);
    };

    return (
        <div className="home-page">
            <MenuButtons
                logoutHandler={handleLogout}
                menuHandler={() => {console.log(user)}}
                />
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
                    <AssetColumns/>
                    <div className="instruments-content">
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
                        
                        <Asset
                            symbol="XDWT.DE"
                            type="ETF"
                            description="MSCI World Information Technology"
                            idx={2}
                            />
                        <Asset
                            symbol="NVDA"
                            type="Stock"
                            description="Nvidia is a leading company in the GPU market. Trending thanks to AI."
                            idx={3}
                        />
                        <Asset
                            symbol="NVDA"
                            type="Stock"
                            description="Nvidia is a leading company in the GPU market. Trending thanks to AI."
                            idx={4}
                        />
                        <Asset
                            symbol="NVDA"
                            type="Stock"
                            description="Nvidia is a leading company in the GPU market. Trending thanks to AI."
                            idx={5}
                        />
                    </div>
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
                    <Articles popUpTrigger={handleArticleClick}/>
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
                <SummaryFooter
                    profit={123}
                />
            {showPopup && <ArticleDetails article={articleDetails} handler={closePopup}/>}
        </div>
    )
}

export default Home;
