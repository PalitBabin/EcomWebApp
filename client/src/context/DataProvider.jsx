import { createContext ,useState} from "react";
import { PropTypes } from "prop-types";


export const DataContext = createContext(null);

const DataProvider = ({children})=>{

    const [account,setAccount] = useState('');
    const [quantity,setQuantity] = useState(1);

    return (
        <DataContext.Provider value={{
            account,
            setAccount,
            quantity,
            setQuantity
        }}>
            {children}
        </DataContext.Provider>
    )
}

DataProvider.propTypes = {
    children:PropTypes.object
}

export default DataProvider;