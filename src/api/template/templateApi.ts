import axiosClient from "@/configs/axiosClient"

const templateApi = {
    getAllTemplates: () => {
        const URL = `https://lending-advantage-pale-xp.trycloudflare.com/api/v3/cv-template`

        return axiosClient.get(URL)
    }
}

export default templateApi