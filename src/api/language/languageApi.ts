import axiosClient from '../../configs/axiosClient'

const languageApi = {
    getLanguage: (lang: string) => {
        const URL = `https://apr-mentioned-accompanied-katrina.trycloudflare.com/api/v3/site/languages?lang=${lang}`
        return axiosClient.get(URL)
    },
}

export default languageApi
