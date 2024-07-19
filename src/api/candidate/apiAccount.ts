import axios from "axios"

const apiAccount = {
    forGotPassword: (email : string) => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/forgot-password?type=0`
        return axios.post(URL, { email })
    },
    candidateResetPassword: (password : string, token : string, confirmPassword : string) => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/candidate/reset-password`
        return axios.post(URL, { password, token, confirmPassword })
    },
    candidateSignUp: (email : string, password : string, name:string) => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/candidate/sign-up`
        return axios.post(URL, { email, password, name })
    },
    verifyEmail: (email:string, name:string) => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/verify-email`
        return axios.post(URL, { email, name })
    },
    recruiterSignUp: (data: any) => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/users/recruit/sign-up`
        return axios.post(URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default apiAccount
