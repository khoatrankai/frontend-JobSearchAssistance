import axiosClient from "@/configs/axiosClient"

const templateApi = {
    getAllTemplates: () => {
        const URL = `https://backend-hcmute-nestjs.onrender.com/api/v3/cv-template`

        return axiosClient.get(URL)
    }
}

export default templateApi