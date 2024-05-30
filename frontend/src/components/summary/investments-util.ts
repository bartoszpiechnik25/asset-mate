import axios from "axios";
import { getToken, setUser } from "../../hooks/useUser";

const url = "http://localhost:8080/api/v1/investments/"

const getUserInvestmentsData = async () => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    const user = setUser();
    try {
        const response = await axios.get(
            url + user?.username,
            {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }
        );
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }

    } catch (error) {
        return null;
    }
    return null;
}

const closeInvestment = async (id: string) => {
    const closeUrl = url + id + "/close";
    console.log(closeUrl)
    const token = getToken();
    if (token === null) {
        return null;
    }
    try {
        const response = await axios.post(
            closeUrl,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }

    } catch (error) {
        return null;
    }
    return null;
}

type InvestmentData = {
    id: string;
    symbol: string;
    volume: number;
    openPrice: number;
    marketPrice: number;
    grossProfit: number;
    grossProfitPercent: number;
};
  

const createData = (
    id: string,
    symbol: string,
    volume: number,
    openPrice: number,
    marketPrice: number,
): InvestmentData => {
    const grossProfit = Math.round(((marketPrice * volume) - (openPrice * volume)) * 100) / 100;
    const grossProfitPercent = Math.round(((marketPrice - openPrice) / openPrice)*100*100) / 100
    return {id, symbol, volume, openPrice, marketPrice,  grossProfit, grossProfitPercent};
}


export {getUserInvestmentsData, createData, closeInvestment};
export type {InvestmentData};