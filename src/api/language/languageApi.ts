import axiosClient from '../../configs/axiosClient'

const languageApi = {
    getLanguage: (lang: string) => {
        const URL = `http://localhost:1902.api/v3/site/languages?lang=${lang}`
        return axiosClient.get(URL)
    },
}

export default languageApi
