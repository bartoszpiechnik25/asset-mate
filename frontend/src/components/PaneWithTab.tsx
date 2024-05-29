import React from "react";
import { TabProps, TabS } from "./tab/Tab";
import Pane, { IPane } from "./panes/PaneInterface";


interface PaneWithTabProps extends IPane {
    tabs: TabProps[];
    children?: React.ReactNode;
    icons?: React.ReactNode;
}

const PaneWithTab: React.FC<PaneWithTabProps> = ({tabs, paneText, className, children, icons}) => {
    return (
        <div className="pane-tab">
            <div className="tab-container">
                {tabs.map((tabProps, index) => <TabS key={index} tabText={tabProps.tabText} active={tabProps.active} />)}
            </div>
            <Pane className={className} paneText={paneText}>
                {children}
            </Pane>
        </div>
    )
}

export default PaneWithTab;
