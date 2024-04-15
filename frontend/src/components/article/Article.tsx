import "./Article.css";

interface ArticleProps {
    title: string;
    summary: string;
    hyperlink?: string;
}

const Article: React.FC<ArticleProps> = ({title, summary}) => {
    return (
        <div className="article">
            <p className="article-title">{title}</p>
            <p className="article-summary">{summary}</p>
        </div>
    )
}

export default Article;
