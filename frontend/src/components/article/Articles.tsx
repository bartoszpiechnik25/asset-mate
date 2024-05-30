import { useEffect, useState } from "react";
import {getArticles} from "./article-util";
import { Article } from "./Article";
import SearchBar from "../search-bar/SearchBar";

type ArticlesProps = {
    popUpTrigger: (article: any) => void;
};

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
            <div>
                <SearchBar setArticles={setArticles}/>
                <div className="articles">
                    Loading articles...
                </div>
            </div>
        )
    }
    return (
        <div>
            <SearchBar setArticles={setArticles}/>
            <div className="articles" style={{overflowY: "auto", height: "32vh"}}>
                {articles.map((article: any, index: number) => 
                    <Article 
                        key={index}
                        title={article.title}
                        summary={article.description}
                        url={article.url}
                        onClick={popUpTrigger}
                    />)
                }
            </div>
        </div>
    )
}

export default Articles;