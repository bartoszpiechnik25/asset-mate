import "./Article.css";
import React from "react";

interface ArticleProps {
    title: string;
    summary: string;
    url: string;
    onClick: (article: any) => void;
};

const Article: React.FC<ArticleProps> = ({title, summary, url, onClick}) => {
    const articleData = {
        title: title,
        url: url
    }
    return (
        <div className="article" onClick={() => { onClick(articleData) }}>
            <p className="article-title">{title}</p>
            <p className="article-summary">{summary}</p>
        </div>
    )
}

export {Article};
export type {ArticleProps};