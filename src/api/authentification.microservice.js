import axios from 'axios'

export const currentUser =(id, token) => axios.get(`${process.env.API_AUTHENTIFICATION}/user/${id}`, {
headers : { Authorization : token}
    })