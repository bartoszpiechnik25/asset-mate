import axios from "axios";
import { getToken, setUser } from "../../hooks/useUser";

const url = "http://localhost:8080/api/v1/investments/"

const getUserInvestmentsHistoryData = async () => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    const user = setUser();
    try {
        const response = await axios.get(
            url + user?.username + "/history",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );
        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        return null;
    }
    return null;
}

type InvestmentHistoryData = {
    symbol: string;
    volume: number;
    openPrice: number;
    closePrice: number;
    profit: number;
    profitPercent: number;
  };
  

const createInvestmentsHistoryData = (
    symbol: string,
    volume: number,
    openPrice: number,
    closePrice: number,
): InvestmentHistoryData => {
    const profit = Math.round((volume * (closePrice - openPrice)) * 100) / 100;
    const profitPercent = Math.round(((closePrice - openPrice) / openPrice)* 100 * 100) / 100;
    return {symbol, volume, openPrice, closePrice, profit, profitPercent};
}
  


export {getUserInvestmentsHistoryData, createInvestmentsHistoryData};
export type {InvestmentHistoryData};