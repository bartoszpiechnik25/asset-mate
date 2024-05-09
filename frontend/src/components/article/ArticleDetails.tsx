import { Close } from "@mui/icons-material";
import { Article, ArticleProps } from "./Article";


const ArticleDetails = ({ article, handler }: { article: any | null, handler: () => void }) => {
    if (article === null) {
        return <div className="article-details" />;
    }
    return (
        <div className="article-details">
            <div className="close-icon-wrapper" onClick={handler}>
                <Close />
            </div>
            <div className="article-details-title">
                {article.title}
            </div>
            <div className="article-content">
                {article.text}
            </div>
        </div>
    );
};

export default ArticleDetails;