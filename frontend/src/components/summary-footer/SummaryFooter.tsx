import React from "react";
import "./SummaryFooter.css";
import Button from "../button/Button";

interface ISummary {
    profit: number;
}

const SummaryFooter: React.FC<ISummary> = ({profit}) => {
    let fontColor
    if (profit > 0) {
        fontColor = "#00A01A"
    } else {
        fontColor = "#B22121"
    }
    return (
        <div className="summary-footer">
            <Button
                onClick={()=>{console.log("Invest")}}
                text="Invest"
                rounded={false}
            />
            <div className="summary-text">
                <p>Profit</p>
                <p style={{color: fontColor}}>{profit}</p>
                <p>USD</p>
            </div>
        </div>
    )
}

export default SummaryFooter;