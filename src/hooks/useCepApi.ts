import axios from "axios";

const URL = 'https://viacep.com.br/ws'

export const useCepApi = () =>({
    getAddress: async(cep: string) =>{

        const response = await axios.get(`${URL}/${cep}/json`)
        return{
            address: response.data.estado
        }
    }
})