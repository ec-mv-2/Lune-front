import axios from "axios";

const URL = 'https://www.sintegraws.com.br/api/v1/execute-api.php'

export const useCPFApi = () =>({
    getCPFInfo: async(cpf: string, birthData: string) =>{
        const response = await axios.get(`${URL}?token=${process.env.CPF_API_TOKEN}&cpf=${cpf}&data-nascimento=${birthData}&plugin=CPF`)
        return{
            cpfInfo: response.data
        }
    }
})