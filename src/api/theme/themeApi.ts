import axiosClient from "@/configs/axiosClient"
import axios from "axios"
import { V3 } from "../linkLocal"
const themeApi = {
    getThemesEnable: (lang: string) => {
        const URL = `https://backend-hcmute-nodejs.onrender.com/api/v1/themes/enabled?lang=${lang}`
        return axios.get(URL)
    },
    getThemeHome:() => {
        const URL = `${V3}/api/v3/theme-companies`
        return axiosClient.get(URL)
    },
}

export default themeApi