import { useEffect, useState } from "react";
import {getArticles} from "./article-util";
import { Article } from "./Article";

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
                    url={article.url}
                    onClick={popUpTrigger}
                />)
            }
        </div>
    )
}

export default Articles;