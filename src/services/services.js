import axios from "axios";
const API_URL = "https://fakeapi.com"

export const getProduct = async (productID) => {
    try {
        const responde = await axios.get(`${API_URL}/products/${productID}`)
    } catch (error) {
        console.error('Erro ao buscar o produto', error)
        throw error
    }
}