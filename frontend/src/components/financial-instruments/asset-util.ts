import axios from "axios";
import { getToken } from "../../hooks/useUser";

const getSymbolDetails = async (url: string, symbol: string) => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    try {
        const response = await axios.get(
            url + symbol,
            {
                headers: {
                    Authorization: "Bearer " + token
                },
            },
        );
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return null;
    }
    return null;
}


export default getSymbolDetails;