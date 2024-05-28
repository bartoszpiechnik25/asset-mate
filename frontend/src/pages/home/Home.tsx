import PaneWithTab from "../../components/PaneWithTab";
import SearchBar from "../../components/search-bar/SearchBar";
import InstrumentTypeMenu from "../../components/financial-instruments/InstrumentTypeMenu";
import "./Home.css";
import { AssetColumns } from "../../components/financial-instruments/Asset";
import SummaryFooter from "../../components/summary-footer/SummaryFooter";
import MenuButtons from "../../components/menu-bar/MenuBar";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../hooks/useUser";
import {  useEffect, useState } from "react";
import Articles from "../../components/article/Articles";
import ArticleDetails from "../../components/article/ArticleDetails"
import AssetDetails from "../../components/financial-instruments/asset-details/AssetDetails";
import Assets from "../../components/financial-instruments/Assets";
import InvestmentsTable from "../../components/summary/InvestmentsSummary";
import { InvestmentData, createData, getUserInvestmentsData } from "../../components/summary/investments-util";


const Home = () => {
    document.body.style.backgroundColor = "black";
    const navigate = useNavigate();
    const [showlArticlePopup, setshowlArticlePopup] = useState(false);
    const [showAssetPopup, setshowAssetPopup] = useState(false);
    const [assetDetails, setAssetDetails] = useState<null|any>(null);
    const [articleDetails, setArticleDetails] = useState(null);
    const [userInvestments, setUserInvestments] = useState<InvestmentData[]|null>(null);

    useEffect(() => {
        const fetch = async () => {
            const response = await getUserInvestmentsData();
            const result: InvestmentData[] = response.map((data: any) => createData(data.yahooSymbol, data.volume, data.openPrice, data.marketPrice));
            setUserInvestments(result);
        }
        fetch();
    }, []);

    const investHandler = (newInvestment: InvestmentData) => {
        const prevInvestments = userInvestments;
        if (prevInvestments === null) {
            return
        }
        setUserInvestments([...prevInvestments, newInvestment]);
    }


    let user = setUser();

    const handleLogout = () => {
        localStorage.removeItem('token');
        user = null;
        navigate('/login');
    }

    const handleArticleClick = (article: any) => {
        setArticleDetails(article);
        setshowlArticlePopup(true);
    };

    const handleAssetInfoClick = (asset: any) => {
        setAssetDetails(asset);
        console.log(asset)
        setshowAssetPopup(true);
    }

    const closePopup = () => {
        setshowlArticlePopup(false);
    };

    const closeAssetDetailsPopup = () => {
        setshowAssetPopup(false);
    }

    return (
        <div className="home-page">
            <MenuButtons
                logoutHandler={handleLogout}
                menuHandler={() => {console.log(user)}}
                />
            <div className="vertical-panes">
                <PaneWithTab
                    tabs= {[{ tabText: 'Instruments', active: true }]}
                    paneText="Instruments"
                    className="instrument-pane">
                        <InstrumentTypeMenu />
                        <SearchBar placeholder="Search eg. Nvidia" />
                        <AssetColumns/>
                        <Assets clickHandler={handleAssetInfoClick}/>
                </PaneWithTab>
                <PaneWithTab
                    tabs={[
                        { tabText: 'News', active: true },
                        // { tabText: 'History', active: false },
                    ]}
                    paneText="News"
                    className="news-pane">
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
                    className="investments-pane">
                        <InvestmentsTable userInvestments={userInvestments}/>
                </PaneWithTab>

                <SummaryFooter investments={userInvestments} investHandler={investHandler}/>
            {showlArticlePopup && <ArticleDetails article={articleDetails} closePopUpHandler={closePopup}/>}
            <AssetDetails asset={assetDetails} closePopUpHandler={closeAssetDetailsPopup} open={showAssetPopup}/>
        </div>
    )
}

export default Home;
