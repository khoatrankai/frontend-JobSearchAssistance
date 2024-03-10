import axios from "axios"

const apiAccount = {
    forGotPassword: (email : string) => {
        const URL = `http://localhost:1902/api/v3/forgot-password`
        return axios.post(URL, { email })
    },
    candidateResetPassword: (password : string, token : string, confirmPassword : string) => {
        const URL = `http://localhost:1902/api/v3/users/candidate/reset-password`
        return axios.post(URL, { password, token, confirmPassword })
    },
    candidateSignUp: (email : string, password : string, name:string) => {
        const URL = `http://localhost:1902/api/v3/users/candidate/sign-up`
        return axios.post(URL, { email, password, name })
    }
}

export default apiAccount
