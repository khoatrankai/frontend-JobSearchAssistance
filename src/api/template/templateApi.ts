import axiosClient from "@/configs/axiosClient"

const templateApi = {
    getAllTemplates: () => {
        const URL = `http://localhost:1902/api/v3/cv-template`

        return axiosClient.get(URL)
    }
}

export default templateApi