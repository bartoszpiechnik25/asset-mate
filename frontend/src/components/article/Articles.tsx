import React, { useEffect, useState, useCallback } from "react";
import { getArticles } from "./article-util";
import { Article } from "./Article";
import SearchBar from "../search-bar/SearchBar";
import { Virtuoso } from 'react-virtuoso';

type ArticlesProps = {
    popUpTrigger: (article: any) => void;
};

const Articles: React.FC<ArticlesProps> = ({ popUpTrigger }) => {
    const [articles, setArticles] = useState<null | any>(null);

    const memoizedPopUpTrigger = useCallback((article: any) => {
        popUpTrigger(article);
    }, [popUpTrigger]);

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        };

        fetchArticles();
    }, []);

    if (articles === null) {
        return (
            <div>
                <SearchBar setArticles={setArticles} />
                <div className="articles">
                    Loading articles...
                </div>
            </div>
        );
    }

    return (
        <div>
            <SearchBar setArticles={setArticles} />
            <div className="articles" style={{ overflowY: "auto", height: "32vh" }}>
                <Virtuoso
                    data={articles}
                    itemContent={(index, article) => (
                            <Article
                                key={index}
                                title={article.title}
                                summary={article.description}
                                url={article.url}
                                onClick={memoizedPopUpTrigger}
                            />
                    )}
                />
            </div>
        </div>
    );
};

export default Articles;