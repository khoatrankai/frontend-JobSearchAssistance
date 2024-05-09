import axiosClient from "@/configs/axiosClient"
import { V1,V3 } from "../linkLocal"
const analyticsApi = {
    totalPosts: () => {
        const URL = `http://localhost:1902/api/v3/posts/total-post`

        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    },
    totalApplications: (type?: string) => {
        const URL = `/v1/application/total${type ? `?type=${type}` : ''}`

        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    },
    totalApplicationsTop: async() => {
        const URL = `${V3}/api/v3/parent/analytics?type=application&year=2023`

        return axiosClient.get(URL)
    },
    totalSalaryTop: async()=>{
        const URL = `${V3}/api/v3/parent/analytics?type=salary&year=2023`

        return axiosClient.get(URL)
    }
}

export default analyticsApi