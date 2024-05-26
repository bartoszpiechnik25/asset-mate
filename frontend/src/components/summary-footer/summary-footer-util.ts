import { InvestmentData } from "../summary/investments-util";

const calculateProfit = (data: InvestmentData[]): number => {
    let profit = 0;
    if (!data) {
        return profit;
    }
    for (var investment of data) {
        profit += investment.grossProfit;
    }
    return profit;
}

export default calculateProfit;