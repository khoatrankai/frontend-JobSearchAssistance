import axiosClient from "@/configs/axiosClient"

// site api
const jobTypeApi = {
  getJobType: async(lang: string) => {
    const URL = `/v1/job-types?lang=${lang}`
    return await axiosClient.get(URL)
  },
}

export default jobTypeApi
