import axiosClient from "../../configs/axiosClient";

const jobApi = {
    getTotalJob: (lang: string) => {
        const URL = `http://localhost:1902/api/v3/site/jobs?lang=${lang}`
        return axiosClient.get(URL)
    },  
}

export default jobApi