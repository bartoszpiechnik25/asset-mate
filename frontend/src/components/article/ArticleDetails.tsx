import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getArticleText } from "./article-util";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from '@mui/material/Alert';

interface DetailsProps {
    open: boolean,
    handleClose: () => void,
    showHyperlink: boolean,
    article: ArticleDetailsData,
}

type ArticleDetailsData = {
    title: string,
    url: string,
    text: string
}

interface ArticleDerailsProps {
    article: ArticleDetailsData|null;
    open: boolean;
    handleClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ article, handleClose, showHyperlink, open }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                style: {backgroundColor: "#222831", color: "white"}
            }}>
                <div className="close-icon-wrapper" onClick={handleClose}>
                    <Close />
                </div>
                <DialogTitle style={{fontWeight: 700}}>{article.title}</DialogTitle>
                {showHyperlink && 
                    <Alert 
                        severity="error"
                        style={{
                            backgroundColor: '#222831',
                            color: 'red'
                        }}>{article.text}</Alert>
                    && <Link to={article.url}>Full article</Link>
                }
                <br/>
                <DialogContent style={{overflowY: 'auto', color: 'white'}}>
                {article.text.split('\n').map((line: any, index: any) => (
                    <DialogContentText style={{color: 'white', marginBottom: '2vh'}} key={index}>{line}</DialogContentText>
                ))}
                </DialogContent>
        </Dialog>
    )
}

const ArticleDetails: React.FC<ArticleDerailsProps> = ({ article, handleClose, open }) => {

    const [text, setText] = useState('');
    const [fetched, setFetched] = useState(false);

    useEffect(()=>{
        const fetch = async () => {
            const article_text = await getArticleText(article);
            if (article_text === null) {
                return;
            }
            setText(article_text.text);
            setFetched(true);
        }
        fetch();
    });

    if (article === null) {
        return (<div></div>);
    }

    if (text === '' && fetched === false) {
        article.text = "Fetching article content...";
        return <Details
                    open={open}
                    article={article}
                    handleClose={handleClose}
                    showHyperlink={false}
                    />
    }
    if (text === '' && fetched === true) {
        article.text = "Could not fetch article";
        return <Details
                    open={open}
                    article={article}
                    handleClose={handleClose}
                    showHyperlink={false}
                    />
    }
    article.text = text;
    return <Details
                open={open}
                article={article}
                handleClose={handleClose}
                showHyperlink={false}
                />
};

export default ArticleDetails;
export type { ArticleDetailsData };