import "./SearchBar.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from "@mui/icons-material";
import Button from '@mui/material/Button';
import { useState } from "react";
import { getArticles } from "../article/article-util";

interface ISearchBarProps {
    placeholder: string;
}

const comboBoxSx = () => {
    return {
        // width: 250,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#979797',
          },
          '&:hover fieldset': {
            borderColor: '#979797',
          },
          '& .Mui-focused fieldset': {
            borderColor: '#979797',
          },
        },
        '& .MuiFormLabel-root': {
          color: 'white',
        },
        '& .MuiInputBase-input': {
            color: 'white',
        }
    }
}

const getRequestedArticles = (topic: string, setArticles: (data: any) => void) => {
    getArticles(topic)
        .then((result) => {
            if (result === null) {
                setArticles([]);
            } else {
                setArticles(result);
            }
        })
        .catch((error: any) => {
            console.log(error);
        })
}

interface SearchBarProps {
    setArticles: (data: any) => void
}

const SearchBar: React.FC<SearchBarProps> = ({setArticles}) => {
    const [searchContent, setSearchContent] = useState('');

    const enterPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") {
            setArticles(null);
            getRequestedArticles(searchContent, setArticles);
        }
    }
    const buttonPressed = () => {
        setArticles(null);
        getRequestedArticles(searchContent, setArticles);
    }
    return (
        <div style={{display: "flex", alignItems: "center", marginTop: "1vh"}}>
            <TextField
                sx={comboBoxSx()}
                onKeyUp={enterPressed}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchContent(event.target.value)
                }}
                style={{backgroundColor: "#393E46", marginLeft: "3vh"}}
                label="Search"
                variant="standard"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Search style={{color: 'white'}}/>
                    </InputAdornment>
                    ),
                }}
            />
            <Button
                variant="outlined"
                style={{color: 'white', marginLeft: "3vh"}}
                onClick={buttonPressed}>Search</Button>
        </div>
    )
}

export default SearchBar;
