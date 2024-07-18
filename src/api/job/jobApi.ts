import axiosClient from "../../configs/axiosClient";

const jobApi = {
    getTotalJob: (lang: string) => {
        const URL = `https://apr-mentioned-accompanied-katrina.trycloudflare.com/api/v3/site/jobs?lang=${lang}`
        return axiosClient.get(URL)
    },  
}

export default jobApi