interface TabProps {
    text: string;
}

const Tab: React.FC<TabProps> = ({text}) => {
    return (
        <div className="pane-tab">
            {text}
        </div>
    )
}

export default Tab;