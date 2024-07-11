import axiosClient from "@/configs/axiosClient"
import axiosClientRecruiter from "@/configs/axiosRecruiter"
import { V3 } from "../linkLocal"

const packageServiceApi = {
  getIdPackage: (id: any) => {
    const URL = `${V3}/api/v3/service-recruitment/${id}`

    return axiosClientRecruiter.get(URL)
  },
  postPayPackage: (id: any) => {
    const URL = `${V3}/api/v3/service-history`

    return axiosClientRecruiter.post(URL,{
        "serviceRecruitmentId": id
      })
  },
  getHistoryService: () => {
    const URL = `${V3}/api/v3/service-history`

    return axiosClientRecruiter.get(URL)
  },
  getHistoryRecharge: async() => {
    const URL = `${V3}/api/v3/user-histories`

    return await axiosClientRecruiter.get(URL)
  },
  getListService: async() => {
    const URL = `${V3}/api/v3/service-recruitment`

    return await axiosClientRecruiter.get(URL)
  },
  postBuyService: async(id:any) => {
    const URL = `${V3}/api/v3/service-history`

    return await axiosClientRecruiter.post(URL,{
      "serviceRecruitmentId": id
    })
  }
}
export default packageServiceApi
