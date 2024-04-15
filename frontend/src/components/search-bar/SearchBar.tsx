import "./SearchBar.css";

interface ISearchBarProps {
    placeholder: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({placeholder}) => {
    return (
        <div className="search-bar">
            <input className="search-input" type="text" placeholder={placeholder} />
        </div>
    )
}

export default SearchBar;
