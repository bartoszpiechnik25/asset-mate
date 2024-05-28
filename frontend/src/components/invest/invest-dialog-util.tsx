import axios from "axios";
import { getToken, setUser } from "../../hooks/useUser";

const validateInput = (symbol: string, currency: string, volume: number, openPrice: number, availableSymbols: string[], availableCurrencies: string[]) => {
    if (symbol === '' || !availableSymbols.includes(symbol)) {
        return false;
    }

    if (currency === '' || !availableCurrencies.includes(currency)) {
        return false;
    }

    if (volume <= 0 || openPrice <= 0) {
        return false;
    }
    return true;
}

const url = "http://localhost:8080/api/v1/investments"

const createInvestment = async (symbol: string, currency: string, volume: number, openPrice: number) => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    const user = setUser();
    if (user === null) {
        return null;
    }

    try {
        const response = await axios.post(
            url,
            {
                symbol: symbol,
                currency: currency,
                volume: volume,
                openPrice: openPrice,
                userId: user.id
            },
            {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            return null;
        } else {
            throw error;
        }
    }
}

export default validateInput;
export {createInvestment};