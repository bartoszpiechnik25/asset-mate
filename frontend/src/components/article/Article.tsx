import axios from "axios";
import "./Article.css";
import { getToken } from "../../hooks/useUser";
import React, { useEffect, useState } from "react";

interface ArticleProps {
    title: string;
    summary: string;
    text: string;
    onClick: (article: any) => void;
};

type ArticlesProps = {
    popUpTrigger: (article: any) => void;
};

const url: string = "http://localhost:8000/news/"

const getArticles = async (topic: string = "finance"): Promise<any | null> => {
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

const Article: React.FC<ArticleProps> = ({title, summary, text, onClick}) => {
    const articleData = {
        title: title,
        text: text
    }
    return (
        <div className="article" onClick={() => { onClick(articleData) }}>
            <p className="article-title">{title}</p>
            <p className="article-summary">{summary}</p>
        </div>
    )
}

const Articles: React.FC<ArticlesProps> = ({popUpTrigger} ) => {
    const [articles, setArticles] = useState<null|any>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        };

        fetchArticles();
    }, []);

    if (articles === null) {
        return (
            <div className="articles">
                Loading articles...
            </div>
        )
    }
    return (
        <div className="articles">
            {articles.map((article: any, index: number) => 
                <Article 
                    key={index}
                    title={article.title}
                    summary={article.description}
                    text={article.full_article}
                    onClick={popUpTrigger}
                />)
            }
        </div>
    )
}

export {Article, Articles, getArticles};
export type {ArticleProps};