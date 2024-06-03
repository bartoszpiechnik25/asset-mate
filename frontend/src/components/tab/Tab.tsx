import "./Tab.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { useState } from "react";
import { InvestmentData } from "../summary/investments-util";
import InvestmentsTable from "../summary/InvestmentsSummary";
import { InvestmentHistoryData } from "../history/history-util";
import InvestmentsHistory from "../history/HistorySummary";


interface TabProps {
    tabText: string;
    active?: boolean;
}

const TabS: React.FC<TabProps> = ({tabText, active = true}) => {
    const tabClass = active ? "tab" : "inactive-tab";
    return (
        <div className={tabClass}>
            {tabText}
        </div>
    )
}

interface InvestmentsHistoryTabsProps {
    userInvestments: InvestmentData[];
    userInvestmentsHistory: InvestmentHistoryData[];
    updateInvestments: (data: InvestmentData[]) => void;
    changeActiveTab: (tab: number) => void;
}

const ExampleTab: React.FC<InvestmentsHistoryTabsProps> = ({userInvestments, userInvestmentsHistory, changeActiveTab, updateInvestments}) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: any, newValue: number) => {
        setValue(newValue);
        changeActiveTab(newValue)
    };
    return (
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your investments" style={{color: "white", backgroundColor: "#222831"}} />
            <Tab label="History" style={{color: "white", backgroundColor: "#393E46"}}/>
          </Tabs>
          <div className="investments-pane">
            <Box>
                {value === 0 && <InvestmentsTable
                                        userInvestments={userInvestments}
                                        updateInvestments={updateInvestments}/>}
                {value === 1 && <InvestmentsHistory userInvestmentsHistory={userInvestmentsHistory}/>}
            </Box>
          </div>
        </Box>
      );
}

export { ExampleTab, TabS };
export type { TabProps };
