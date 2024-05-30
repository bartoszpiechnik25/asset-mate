import axios from "axios";
import { getToken } from "../../hooks/useUser";

const url = "http://localhost:8080/api/v1/symbols"

const createNewSymbol = async (symbol: string, description: string, instrumentType: string) => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    try {
        const response = await axios.post(
            url,
            {
                yahooSymbol: symbol,
                description: description,
                instrumentType: instrumentType,
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
        }
    }
}

type ValidationResult = {
    status: boolean,
    message: string,
};

const validInput = (symbol: string, type: string, description: string): ValidationResult =>  {
    if (symbol === null || symbol ==='') {
        return {status: false, message: "Invalid symbol: " + symbol};
    }
    if (type === null || type ==='') {
        return {status: false, message: "Invalid type: " + type};
    }
    if (description === null || description ==='') {
        return {status: false, message: "Invalid description: " + description};
    }
    if (description.length > 255) {
        return {status: false, message: "Description is too long"};
    }
    return {status: true, message: ""};
}

export { validInput, createNewSymbol };