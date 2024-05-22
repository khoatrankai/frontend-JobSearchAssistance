import axiosClient from "@/configs/axiosClient"
import axios from "axios"
const themeApi = {
    getThemesEnable: (lang: string) => {
        const URL = `http://localhost:8888/api/v1/themes/enabled?lang=${lang}`
        return axios.get(URL)
    },
}

export default themeApi