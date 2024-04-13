interface ButtonProps {
    onClick: () => void;
    text: string;
    rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, text, rounded = true}) => {
    return (
        <button className="blueish-button"
            onClick={onClick}
            style={{borderRadius: rounded? '10px': '0'}}
        >   {text}
        </button>
    )
}

export default Button;
