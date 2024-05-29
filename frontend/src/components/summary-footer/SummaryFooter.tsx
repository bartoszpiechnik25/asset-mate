import React from "react";
import "./SummaryFooter.css";
import Button from "../button/Button";
import { InvestmentData } from "../summary/investments-util";
import { calculateProfit, calculateInvestmentHistoryProfit} from "./summary-footer-util";
import InvestDialog from "../invest/InvestDialog";
import { InvestmentHistoryData } from "../history/history-util";

interface ISummary {
    investments: InvestmentData[] | null;
    investmentsHistory: InvestmentHistoryData[]|null;
    activeTab: number;
    investHandler: (data: InvestmentData) => void;
}

const getProfitFontColor = (profit: number) => {
    if (profit > 0) {
        return 'green';
    } else if (profit < 0) {
        return 'red';
    } else {
        return 'white';
    }
}

const SummaryFooter: React.FC<ISummary> = ({investments, investmentsHistory, activeTab, investHandler}) => {
    
    if (investments === null || investmentsHistory === null) {
        return (
            <div className="summary-footer">
                <Button
                    onClick={()=>{console.log("Invest")}}
                    text="Invest"
                    rounded={false}
                />
                <div className="summary-text">
                    <p>Profit</p>
                    <p>USD</p>
                </div>
            </div>
        )
    }
    var profit = 0;
    if (activeTab === 0) {
        profit = calculateProfit(investments);
    } else if (activeTab === 1) {
        profit = calculateInvestmentHistoryProfit(investmentsHistory);
    }
    
    return (
        <div className="summary-footer">
            <InvestDialog addRecordToUserInvestments={investHandler}/>
            <div className="summary-text">
                <p>Profit</p>
                <p style={{color: getProfitFontColor(profit)}}>{profit}</p>
                <p>USD</p>
            </div>
        </div>
    )
}

export default SummaryFooter;