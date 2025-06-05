import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getProductosPublicos = async ()=>{
    try{
        const response = await axios.get(`${API_URL}api/public`)
        return response.data
    }catch(error){
        console.error(error)
        throw error;
    }
}