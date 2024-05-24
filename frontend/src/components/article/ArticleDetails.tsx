import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getArticleText } from "./article-util";
import { Link } from "react-router-dom";

const Details = ({ article, closePopUpHandler, showHyperlink }: { article: any, closePopUpHandler: () => void, showHyperlink: boolean }) => {
    return (
        <div className="article-details">
            <div className="close-icon-wrapper" onClick={closePopUpHandler}>
                <Close />
            </div>
            <div className="article-details-title">
                {article.title}
            </div>
            {showHyperlink && <Link to={article.url}>Full article</Link>}
            <div className="article-content">
            {article.text.split('\n').map((line: any, index: any) => (
                <p key={index}>{line}</p>
            ))}
            </div>
        </div>
    )
}

const ArticleDetails = ({ article, closePopUpHandler }: { article: any | null, closePopUpHandler: () => void }) => {

    const [text, setText] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(()=>{
        const fetch = async () => {
            const article_text = await getArticleText(article);
            setText(article_text.text);
            setFetched(true);
        }
        fetch();
        console.log(text);
    });

    if (article === null) {
        return <div className="article-details" />;
    }

    if (text === null && fetched === false) {
        article.text = "Fetching article content...";
        return <Details
                    article={article}
                    closePopUpHandler={closePopUpHandler}
                    showHyperlink={false}
                    />
    }
    if (text === null && fetched === true) {
        article.text = "Could not fetch article";
        return <Details
                    article={article}
                    closePopUpHandler={closePopUpHandler}
                    showHyperlink={true}
                    />
    }
    article.text = text;
    return <Details
                article={article}
                closePopUpHandler={closePopUpHandler}
                showHyperlink={false}
                    />
};

export default ArticleDetails;