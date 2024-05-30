import axios from "axios";
import { getToken } from "../../hooks/useUser";

const url: string = "http://localhost:8000/api/v1/news/"

const getArticles = async (topic: string = "google"): Promise<any | null> => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    try {
        const response = await axios.get(
            url + topic + "?limit=10",
            {
                headers: {
                    "Authorization": "Bearer " + token
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return null;
    }
    return null;
}

const get_text_url = "http://localhost:8000/api/v1/news?article_url="

const getArticleText = async (article: any): Promise<any | null> => {
    const token = getToken();
    if (token === null) {
        return null;
    }
    if (article === null) {
        return null;
    }
    try {
        const response = await axios.get(
            get_text_url + article.url,
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

export {getArticleText, getArticles};