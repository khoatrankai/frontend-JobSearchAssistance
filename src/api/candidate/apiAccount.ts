import axios from "axios"

const apiAccount = {
    forGotPassword: (email : string) => {
        const URL = `http://localhost:1902/api/v3/forgot-password`
        return axios.post(URL, { email })
    },
}

export default apiAccount
