import axios from 'axios'

export const currentUser = (id, token) => axios.get(`${process.env.API_AUTHENTIFICATION}/user/${id}`, {
    headers: { Authorization: token },
}).catch(err => {
    if (err.response.status === 403) {
        const { status, ...rest } = err.response
        return {
            status,
            ...rest
        }
    }

    return err
})