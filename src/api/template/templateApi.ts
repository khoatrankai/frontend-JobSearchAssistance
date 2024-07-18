import axiosClient from "@/configs/axiosClient"

const templateApi = {
    getAllTemplates: () => {
        const URL = `https://apr-mentioned-accompanied-katrina.trycloudflare.com/api/v3/cv-template`

        return axiosClient.get(URL)
    }
}

export default templateApi