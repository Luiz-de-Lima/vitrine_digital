import axios from "axios";
const API_URL = "https://fakestoreapi.com";

export const getProduct = async (limit=productID) => {
    try {
        const response = await axios.get(`${API_URL}/products?limit=${limit}`)
        return response.data
    } catch (error) {
        console.error('Erro ao buscar o produto', error)
        throw error
    }
}