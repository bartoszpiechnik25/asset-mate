import { InvestmentHistoryData } from "../history/history-util";
import { InvestmentData } from "../summary/investments-util";

const calculateProfit = (data: InvestmentData[]): number => {
    let profit = 0;
    if (!data) {
        return profit;
    }
    for (var investment of data) {
        profit += investment.grossProfit;
    }
    return Math.round(profit*100)/100;
}

const calculateInvestmentHistoryProfit = (data: InvestmentHistoryData[]|null): number => {
    let profit = 0;
    if (!data) {
        return profit;
    }
    for (var investment of data) {
        profit += investment.profit;
    }
    return Math.round(profit*100)/100;
}

export { calculateProfit, calculateInvestmentHistoryProfit };