import { createContext, useReducer } from "react";
import axios from "axios";

export const ItemConText = createContext()

const ItemConTextProvider = ({children}) => {


    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/GetAllItems')
            if (response.data.success) {
                return response.data.Items
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'server error!'}

        }
    }

    const ItemConTextData = {getItems}

    return(
        <ItemConText.Provider value={ItemConTextData}>
            {children}
        </ItemConText.Provider>
    )
}

export default ItemConTextProvider