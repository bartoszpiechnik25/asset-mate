import React, { useEffect, useState } from "react";
import "./SummaryFooter.css";
import Button from "../button/Button";
import { InvestmentData, createData } from "../summary/investments-util";
import calculateProfit from "./summary-footer-util";

interface ISummary {
    investments: InvestmentData[] | null;
    investHandler: (data: any) => void;
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

const SummaryFooter: React.FC<ISummary> = ({investments, investHandler}) => {
    
    if (investments === null) {
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

    const profit = calculateProfit(investments);
    
    return (
        <div className="summary-footer">
            <Button
                onClick={()=>{
                    investHandler(createData("IWDA.UK", 20, 81.90, 97.80));
                }}
                text="Invest"
                rounded={false}
            />
            <div className="summary-text">
                <p>Profit</p>
                <p style={{color: getProfitFontColor(profit)}}>{profit}</p>
                <p>USD</p>
            </div>
        </div>
    )
}

export default SummaryFooter;