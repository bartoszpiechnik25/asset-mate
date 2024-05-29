import axios from "axios";
import "./InstrumentTypeMenu.css";
import { useEffect, useState } from "react";

interface InstrumentType {
    name: string;
}

const InstrumentTypeElement: React.FC<InstrumentType> = ({name}) => {
    return (
        <div className="instrument-type">
            {name}
        </div>
    )
}

const url = "http://localhost:8080/api/v1/assets/types";

const getInstrumentTypes: () => any = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
        return null;
    }
    const response = await axios.get(
        url,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

const InvestmentTypeMenu: React.FC = () => {
    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            const fetchedTypes = await getInstrumentTypes();
            setTypes(fetchedTypes);
        };

        fetchTypes();
    }, []);

    if (types === null) {
        return <div className="instrument-type-menu"/>
    }

    return (
        <div className="instrument-type-menu">
           {(types as any[]).map((type: any) => <InstrumentTypeElement name={type.name} key={type.name}/>)}
        </div>
    )
}

export default InvestmentTypeMenu;
