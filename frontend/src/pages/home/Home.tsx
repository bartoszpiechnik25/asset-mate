import PaneWithTab from "../../components/PaneWithTab";
import InstrumentTypeMenu, { getInstrumentTypes } from "../../components/financial-instruments/InstrumentTypeMenu";
import "./Home.css";
import SummaryFooter from "../../components/summary-footer/SummaryFooter";
import MenuButtons from "../../components/menu-bar/MenuBar";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../hooks/useUser";
import {  useEffect, useState } from "react";
import Articles from "../../components/article/Articles";
import ArticleDetails from "../../components/article/ArticleDetails"
import AssetDetails from "../../components/financial-instruments/asset-details/AssetDetails";
import Assets, { Asset } from "../../components/financial-instruments/Assets";
import { InvestmentData, createData, getUserInvestmentsData } from "../../components/summary/investments-util";
import { ExampleTab } from "../../components/tab/Tab";
import { InvestmentHistoryData, createInvestmentsHistoryData, getUserInvestmentsHistoryData } from "../../components/history/history-util";
import AddInstrument from "../../components/admin/AddInstrument";


const Home = () => {
    document.body.style.backgroundColor = "black";
    const navigate = useNavigate();
    const [showlArticlePopup, setshowlArticlePopup] = useState<boolean>(false);
    const [showAssetPopup, setshowAssetPopup] = useState(false);
    const [assetDetails, setAssetDetails] = useState<any>(null);
    const [addInstrument, setAddInstrument] = useState<boolean>(false);
    const [articleDetails, setArticleDetails] = useState(null);
    const [userInvestments, setUserInvestments] = useState<InvestmentData[]>([]);
    const [userInvestmentsHistory, setUserInvestmentsHistory] = useState<InvestmentHistoryData[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [instrumentTypes, setInstrumentTypes] = useState([]);
    const [assets, setAssets] = useState<Asset[]>([]);


    useEffect(() => {
        const fetch = async () => {
            const response = await getUserInvestmentsData();
            const result: InvestmentData[] = response.map((data: any) => createData(
                data.id, data.yahooSymbol, data.volume, data.openPrice, data.marketPrice
            ));
            setUserInvestments(result);
            const investmentsHistoryResponse = await getUserInvestmentsHistoryData();
            const history = investmentsHistoryResponse.map(
                (data: any) => createInvestmentsHistoryData(data.yahooSymbol, data.volume, data.openPrice, data.closePrice)
            );
            setUserInvestmentsHistory(history);

            const instrumentTypesResponse = await getInstrumentTypes();
            setInstrumentTypes(instrumentTypesResponse);
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

    const updateInvestments = (data: InvestmentData[]) => {
        setUserInvestments(data);
    }

    const appendAssets = (asset: Asset) => {
        const prevAssets = assets;
        if (prevAssets === null) {
            return;
        }
        setAssets([...prevAssets, asset]);
    }

    let user = setUser();
    if (user === null) {
        navigate('/login');
        return;
    }

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

    const handleTabChange = (tab: number) => {
        setActiveTab(tab);
    }

    const closePopup = () => {
        setshowlArticlePopup(false);
    };

    const closeAssetDetailsPopup = () => {
        setAssetDetails('');
        setshowAssetPopup(false);
    }

    return (
        <div className="home-page">
            <MenuButtons
                logoutHandler={handleLogout}
                menuHandler={() => {console.log(user)}}
                adminButton={()=>{setAddInstrument(true)}}
                user={user}
                />
            <div className="vertical-panes">
                <PaneWithTab
                    tabs= {[{ tabText: 'Instruments', active: true }]}
                    paneText="Instruments"
                    className="instrument-pane">
                        <InstrumentTypeMenu />
                        <Assets
                            clickHandler={handleAssetInfoClick}
                            assets={assets}
                            setAssets={setAssets}/>
                </PaneWithTab>
                <PaneWithTab
                    tabs={[{ tabText: 'News', active: true }]}
                    paneText="News"
                    className="news-pane">
                        <Articles popUpTrigger={handleArticleClick}/>
                </PaneWithTab>
            </div>
                <ExampleTab 
                    userInvestments={userInvestments}
                    userInvestmentsHistory={userInvestmentsHistory}
                    updateInvestments={updateInvestments}
                    changeActiveTab={handleTabChange}/>
                <SummaryFooter
                    investments={userInvestments}
                    investmentsHistory={userInvestmentsHistory}
                    investHandler={investHandler}
                    activeTab={activeTab}/>
            <ArticleDetails open={showlArticlePopup} handleClose={closePopup} article={articleDetails}/>
            <AssetDetails asset={assetDetails} closePopUpHandler={closeAssetDetailsPopup} open={showAssetPopup}/>
            <AddInstrument
                open={addInstrument}
                handleClose={()=>{setAddInstrument(false)}}
                instrumentTypes={instrumentTypes}
                appendAssets={appendAssets}/>
        </div>
    )
}

export default Home;
