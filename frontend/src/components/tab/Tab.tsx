import "./Tab.css";

interface TabProps {
    tabText: string;
    active?: boolean;
}

const Tab: React.FC<TabProps> = ({tabText, active = true}) => {
    const tabClass = active ? "tab" : "inactive-tab";

    return (
        <div className={tabClass}>
            {tabText}
        </div>
    )
}

export { Tab };
export type { TabProps };
