import React from "react";

interface IPane {
    className: string;
    paneText: string;
    children?: React.ReactNode;
}

const Pane: React.FC<IPane> = ({className, children}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default Pane;
export type { IPane };
